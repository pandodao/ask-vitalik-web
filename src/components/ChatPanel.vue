<template>
  <div class="chat-wrapper">
    <div :class="['chat-box', { 'chat-box-mobile': smAndDown }]" ref="chatBox">
      <div v-for="item in history" :key="item.id">
        <MessageBubble :msg="item.request" right />
        <MessageBubble :msg="item.response" :error="item.status === 3" />
      </div>
    </div>

    <FInput
      v-model="input"
      :placeholder="$t('ask.anything')"
      :disabled="postLoading"
      @click:appendInner="handlePost"
      @keyup.enter="handlePost"
    >
      <template #append-inner>
        <VProgressCircular
          v-if="logged ? postLoading : logging"
          :indeterminate="true"
          size="21"
          width="2"
        />
        <VIcon v-else class="send-icon" @click="handlePost">$arrow_right</VIcon>
      </template>
    </FInput>
  </div>

  <ExampleModal
    :post="handlePost"
    :loading="postLoading"
    @update="handleUpdate"
    ref="exampleModal"
  />

  <div class="btns">
    <LoginAction>
      <FModal v-model="userModal" :title="$t('details')">
        <template #activator="{ props }">
          <FButton variant="tonal" v-bind="props">
            {{ displayName }}
          </FButton>
        </template>

        <div class="pb-8">
          <div class="text-center">
            <p class="py-4">{{ userName }}</p>
            <FButton color="error" @click="handleDisconnect">{{ $t('disconnect') }}</FButton>
          </div>
        </div>
      </FModal>
    </LoginAction>

    <ShareModal :history="history" />

    <FModal v-model="newChatModal" :title="$t('clear')">
      <template #activator="{ props }">
        <FButton v-if="logged" v-bind="props" variant="text" color="warning">
          {{ $t('clear') }}
        </FButton>
      </template>

      <div class="text-center text-warning pa-4">
        <p class="mb-4 warning">Create new conversation will delete current chat history.</p>
        <FButton color="error" :loading="newLoading" @click="handleClear">OK</FButton>
      </div>
    </FModal>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ref, nextTick, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { VIcon, VProgressCircular } from 'vuetify/components'
import { FInput, FButton, FModal } from '@foxone/uikit/components'
import { useToast } from '@foxone/uikit/plugins/toast'

import MessageBubble from './MessageBubble.vue'
import LoginAction from './LoginAction.vue'
import ShareModal from './ShareModal.vue'
import ExampleModal from './ExampleModal.vue'

import { useAccountStore } from '../stores/account'
import { postToConversation, readConversation } from '../services/index'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { smAndDown } = useDisplay()
const toast = useToast()

const input = ref('')
const userModal = ref(false)
const newChatModal = ref(false)

const chatBox = ref()
const postLoading = ref(false)
const newLoading = ref(false)
const timer = ref()
const history = ref<any[]>([])
const exampleModal = ref()

const accountStore = useAccountStore()
const { loggin, genConversation, clearAuth } = useAccountStore()

const userName = computed(() => accountStore.userName)
const channel = computed(() => accountStore.channel)
const userIdentity = computed(() => accountStore.userIdentity)
const logged = computed(() => accountStore.logged)
const logging = computed(() => accountStore.logging)
const conversationId = computed(() => accountStore.conversationId)

const displayName = computed(() => {
  if (channel.value === 'mixin') {
    return userName.value
  } else {
    return userName.value.slice(0, 2) + '...' + userName.value.slice(-4)
  }
})

const handleClear = async () => {
  newLoading.value = true
  await genConversation(userIdentity.value)
  toast.success({ message: t('new.conversation.success') })
  newChatModal.value = false
  newLoading.value = false
  history.value = []
}

const handleUpdate = (val: string) => {
  input.value = val
  handlePost(val)
}

const scrollUp = () => {
  chatBox.value.scroll({
    top: 1000000,
    behavior: 'smooth'
  })
}

const postNewMessage = (val: string) => {
  return postToConversation(conversationId.value, {
    content: val
  })
}

const loopReadConversation = () => {
  timer.value = setInterval(async () => {
    getCurrentConversation()
  }, 2000)
}

const getCurrentConversation = async () => {
  console.log('conv id', conversationId.value)
  try {
    const resp = await readConversation(conversationId.value)
    history.value = resp.history

    postLoading.value = false
    input.value = ''

    // 2 is finishied, 3 is failed
    let lastStatus
    if (resp.history.length > 0) {
      lastStatus = resp.history.slice(-1)[0].status
    }
    if (resp.history.length > 0 && (lastStatus === 2 || lastStatus === 3)) {
      clearInterval(timer.value)
    }

    await nextTick(() => scrollUp())
  } catch (error: any) {
    if (error.code === 404) {
      await genConversation(userIdentity.value)
    }
  }
}

const handlePost = async (val?: string) => {
  if (!logged.value) {
    loggin()
    return
  }

  if (!input.value && !val) {
    toast.error({ message: t('please.input') })
    return
  }

  postLoading.value = true

  try {
    if (typeof val === 'string') {
      await postNewMessage(val)
    } else {
      await postNewMessage(input.value)
    }
  } catch (error) {
    console.log('post err', error)
  }

  loopReadConversation()
}

const handleDisconnect = () => {
  console.log('disconnect')
  clearAuth()
  history.value = []
  userModal.value = false
}

const getQuery = () => {
  if (route.query?.q) {
    input.value = route.query?.q as string
    router.replace({ query: {} })
  }
}

onMounted(async () => {
  if (userIdentity.value && !conversationId.value) {
    console.log('gen conv...')
    await genConversation(userIdentity.value)
  }

  if (logged.value) {
    await getCurrentConversation()
  }

  getQuery()
})
</script>

<style scoped>
.chat-box {
  background-color: #f5f5f5;
  border-radius: 8px 8px 4px 4px;
  border-bottom: none;
  height: 520px;
  padding: 8px 16px;
  overflow-y: scroll;
  margin-bottom: 8px;
}

.chat-box-mobile {
  height: calc(100vh - 320px);
}

.send-icon {
  background-color: #0b93f6;
  border-radius: 12px;
  color: #fff;
  opacity: 1;
}

.btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
