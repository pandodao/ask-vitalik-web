package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"gopkg.in/yaml.v2"
)

const outputDir = "output"

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Please provide a folder path as an argument")
	}

	folderPath := os.Args[1]

	if _, err := os.Stat(outputDir); os.IsNotExist(err) {
		err := os.Mkdir(outputDir, 0755)
		if err != nil {
			log.Fatalf("Error creating output folder: %v", err)
			return
		}
	}

	err := filepath.Walk(folderPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(strings.ToLower(info.Name()), ".md") {
			err := processMarkdownFile(path)
			if err != nil {
				log.Printf("Error processing file %s: %v", path, err)
			}
		}
		return nil
	})

	if err != nil {
		log.Fatalf("Error walking through folder: %v", err)
	}
}

func processMarkdownFile(filePath string) error {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("error reading file: %v", err)
	}

	filename := filepath.Base(filePath)
	ext := filepath.Ext(filename)
	nameWithoutExt := filename[:len(filename)-len(ext)]

	updatedContent := convertPandocHeadersToYAMLFrontMatter(nameWithoutExt, content)

	outputFilePath := filepath.Join(outputDir, filename)
	err = os.WriteFile(outputFilePath, updatedContent, 0644)
	if err != nil {
		return fmt.Errorf("error writing file: %v", err)
	}

	return nil
}

func convertPandocHeadersToYAMLFrontMatter(filename string, content []byte) []byte {
	headerPattern := regexp.MustCompile(`\[(.+?)]:\s*<>\s*\((.+?)\)\s*`)
	headers := headerPattern.FindAllStringSubmatch(string(content), -1)

	if len(headers) == 0 {
		return nil
	}

	yamlMap := make(map[string]interface{})

	for _, header := range headers {
		key := strings.TrimSpace(header[1])
		value := strings.TrimSpace(header[2])

		if key == "category" {
			value = strings.ReplaceAll(value, " ", "")
			yamlMap[key] = strings.Split(value, ",")
		} else if key != "pandoc" {
			yamlMap[key] = value
		}
	}

	date, ok := yamlMap["date"].(string)
	if ok {
		yamlMap["url"] = fmt.Sprintf("https://vitalik.ca/general/%s/%s.html", date, filename)
	}

	yamlData, err := yaml.Marshal(yamlMap)
	if err != nil {
		return nil
	}

	var yamlFrontMatter strings.Builder
	yamlFrontMatter.WriteString("---\n")

	yamlFrontMatter.WriteString(string(yamlData))

	yamlFrontMatter.WriteString("---\n\n")

	remainingContent := headerPattern.ReplaceAll(content, nil)

	return append([]byte(yamlFrontMatter.String()), remainingContent...)
}
