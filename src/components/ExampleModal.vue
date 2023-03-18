<template>
  <FModal v-model="exampleModal" :title="$t('examples')" width="540">
    <template #activator="{ props }">
      <FButton
        variant="tonal"
        color="success"
        size="small"
        class="example-btn"
        v-bind="props"
        block
      >
        <span>{{ $t('examples') }}</span>
        <span>{{ list[0] + '...' + list[1] }}</span>
      </FButton>
    </template>

    <div class="text-list">
      <div
        v-for="(text, index) in list"
        :key="index"
        class="list-item"
        @mouseover="iconIdx = index"
        @click="handleClick(text)"
      >
        <span>{{ text }}</span>
        <VIcon v-show="iconIdx === index" class="send-icon"> $arrow_right </VIcon>
      </div>
    </div>
  </FModal>
</template>

<script lang="ts">
export default {
  name: 'ExampleModal'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { VIcon } from 'vuetify/components'
import { FModal, FButton } from '@foxone/uikit/components'

const emits = defineEmits({
  update: (v) => v
})

const exampleModal = ref(false)
const iconIdx = ref(NaN)

const list = [
  'How do you think of DAO?',
  'Does the ETH network have resistance to censorship?',
  'How do you think of RAI?',
  "What's Rollups?",
  'Who firstly describe the vision for network states?',
  'What does cryptocurrency have to do with network states?',
  'When did you go to Argentina?',
  'What were you doing at Argentina?',
  'How do you think of Money?',
  'Which do you want? Javascript or Python?'
]

const handleClick = async (val: string) => {
  emits('update', val)
  exampleModal.value = false
  iconIdx.value = NaN
}
</script>

<style scoped>
.example-btn {
  text-transform: none;
  overflow-x: hidden;
  justify-content: start;
  margin-bottom: 12px;
}

.text-list {
  padding: 0 16px 16px 16px;
}

.list-item {
  margin-bottom: 12px;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.send-icon {
  background-color: #0b93f6;
  border-radius: 10px;
  color: #fff;
}

.text-list > p:hover {
  background-color: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
}
</style>
