<template>
  <div class="msg-bubble">
    <VSpacer v-if="right" class="spacer" />
    <span :class="['text', { 'text-right': right, 'text-error': error, 'text-empty': empty }]">
      {{ parseMsg(msg) }}
      <a v-if="respRef" href="">{{ respRef }}</a>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MessageBubble'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { VSpacer } from 'vuetify/components'

defineProps({
  msg: { type: String },
  right: { type: Boolean, default: false },
  error: { type: Boolean, default: false }
})

const respRef = ref(null)
const empty = ref(false)

const parseMsg = (val?: string) => {
  if (!val) {
    empty.value = true
    return
  }

  // const splitArr = val.split('[{')
  // const mainStr = splitArr.slice(0, -1)[0]
  // console.log('... mainStr', mainStr)
  // const lastStr = splitArr.slice(-1)[0]
  // console.log('lastStr', lastStr)

  // if (lastStr.slice(-2) === '}]') {
  //   const concatStr = `[{${lastStr}`

  //   let remark
  //   try {
  //     console.log('>> concatStr', concatStr)
  //     const parsedJsonArr = JSON.parse(concatStr)
  //     console.log('-- parsedJsonArr', parsedJsonArr)
  //     remark = parsedJsonArr[0].prefix
  //     console.log('-- remark', remark)
  //     respRef.value = remark
  //   } catch (error) {
  //     console.log('parse err', error)
  //   }

  //   return mainStr
  // } else {
  //   return val
  // }
  empty.value = false
  return val
}
</script>

<style scoped>
.msg-bubble {
  display: flex;
  margin: 16px 0;
}

.spacer {
  flex: 1;
}

.text {
  font-size: 14px;
  font-weight: 500;
  color: black;
  background-color: white;
  padding: 8px 12px;
  max-width: 70%;
  border-radius: 8px 8px 8px 0;
  text-align: left !important;
  word-break: break-all;
}

.text-empty {
  min-width: 32px;
  min-height: 32px;
}

.text a {
  color: #0b93f6;
}

.text-right {
  background-color: #0b93f6;
  color: white;
  border-radius: 8px 8px 0 8px;
}

.text-error {
  color: lightcoral !important;
}
</style>
