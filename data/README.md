# Create indexes for Vitalik's blog

## Convert files

To build and run the program, follow these steps:

1. Save the code in a file named main.go.
2. Build the program:

```bash
cd convert
go build -o convert main.go
```

Run the program, providing the folder path as an argument:

```bash
./convert ../posts
```

The program will convert the files in the folder and save them in the `output` folder.

## Create indexes file

Use [botastic-cli](https://github.com/pandodao/botastic-cli) to create the indexes file:

```bash
botastic-cli scan --dir ./output --type md --mode line
```

Submit the indexes file to the [Botastic](https://github.com/pandodao/botastic).

```bash
botastic-cli index --act create --file ./indexes.json
```

