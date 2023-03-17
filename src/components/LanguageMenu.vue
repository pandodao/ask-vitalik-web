<template>
  <VMenu v-model="langMenu">
    <template #activator="{ props }">
      <FButton variant="text" v-bind="props">{{ langText }}</FButton>
    </template>

    <VList :selected="[accountStore.lang]">
      <VListItem
        v-for="item in langList"
        :key="item.value"
        :title="item.text"
        :value="item.value"
        @click="handleChange(item.value)"
      />
    </VList>
  </VMenu>
</template>

<script lang="ts">
export default {
  name: 'LanguageMenu'
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VMenu, VList, VListItem } from 'vuetify/components'
import { useAccountStore } from '../stores/account'

const langMenu = ref(false)
const accountStore = useAccountStore()

const langList = [
  { text: '🇺🇸 English', value: 'en' },
  { text: '🇨🇳 中文', value: 'zh-Hant' }
]

const langText = computed(() => {
  const current = langList.find((item) => item.value === accountStore.lang)
  return current?.text
})

const handleChange = (val: string) => {
  accountStore.lang = val
}
</script>

<style scoped></style>
