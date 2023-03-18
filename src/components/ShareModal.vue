<template>
  <FModal v-model="shareModal" :title="$t('share.as.pic')">
    <template #activator="{ props }">
      <FButton variant="text" v-bind="props" @click="handleShare"> ↗️ {{ $t('share') }} </FButton>
    </template>

    <div v-if="pcShare" class="share-wrapper">
      <div class="scroll-parent">
        <div class="chat-box--share" ref="shareBox">
          <div class="share-bar">
            <img src="/vitalik-avatar.jpg" />
            <div>
              <p class="share-title">Ask Vtalik</p>
              <p class="share-link">https://ask-vitalik.xingchi.dev</p>
            </div>
          </div>

          <div class="history-wrapper">
            <div v-for="item in history" :key="item.id">
              <MessageBubble :msg="item.request" right />
              <MessageBubble :msg="item.response" :error="item.status === 3" />
            </div>
          </div>
        </div>
      </div>

      <div class="share-btn">
        <FButton variant="tonal" block @click="toImg"> ⚡ {{ $t('share') }} </FButton>
      </div>
    </div>

    <div v-else class="share-img-wrapper">
      <img :src="imgSrc" alt="Ask-Vitalik" />
      <div class="share-img-btn">
        <FButton variant="text" color="success" block> ✨ {{ $t('long.press') }} </FButton>
      </div>
    </div>
  </FModal>
</template>

<script lang="ts">
export default {
  name: 'ShareModal'
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toPng } from 'html-to-image'
import { useToast } from '@foxone/uikit/plugins/toast'
import MessageBubble from './MessageBubble.vue'
import { isDesktop } from '@foxone/utils/helper'

const props = defineProps({
  history: { type: Array as any, default: () => [] }
})

const { t } = useI18n()
const toast = useToast()
const shareBox = ref()
const shareModal = ref(false)
const pcShare = ref(true)
const imgSrc = ref('')

const handleShare = () => {
  if (!props.history.length) {
    toast.warning({ message: t('chat.and.share') })
    shareModal.value = false
  }
}

const toImg = () => {
  toPng(shareBox.value, {
    cacheBust: true,
    width: shareBox.value.scrollWidth,
    height: shareBox.value.scrollHeight
  })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `Ask-Vitalik-${dataUrl.slice(-4)}.jpeg`
      link.href = dataUrl

      if (!isDesktop()) {
        pcShare.value = false
        imgSrc.value = dataUrl
      } else {
        link.click()
      }
    })
    .catch(() => {
      toast.error({ message: 'generate img failed' })
    })
}

watch(
  () => shareModal.value,
  () => {
    pcShare.value = true
    imgSrc.value = ''
  }
)
</script>

<style scoped>
.share-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 46px;
  padding: 0 16px;
}

.scroll-parent {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.chat-box--share {
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  width: 100%;
  max-width: 460px;
  overflow-y: scroll;
  height: 100%;
  overflow-y: scroll;
  padding-right: 0; /* Increase/decrease this value for cross-browser compatibility */
  box-sizing: content-box; /* So the width will be 100% + padding-right */
}

.history-wrapper {
  background-color: #f5f5f5;
  padding: 8px 12px 18px 12px;
}

.share-bar {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  background-color: #fff;
}

.share-bar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.share-title {
  font-size: 16px;
  font-weight: 800;
}

.share-link {
  font-size: 12px;
  color: #0b93f6;
  font-weight: 600;
  font-style: italic;
}

.share-btn {
  width: 100%;
  max-width: 492px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  padding: 12px 16px 24px 16px;
}

.share-img-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.share-img-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: 6px 0;
}

.share-img-wrapper > img {
  max-height: 60vh;
  margin: 24px 0;
  margin-bottom: 70px;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.2);
}
</style>
