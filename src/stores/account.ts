import { sha256 } from 'js-sha256'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePassport } from '@foxone/mixin-passport/lib/helper'
import { useToast } from '@foxone/uikit/plugins/toast'
import { createConversation } from '@/services/index'
import { getProfile } from '@/services/mixin'

export const useAccountStore = defineStore(
  'account',
  () => {
    const passport = usePassport()
    const toast = useToast()

    const logging = ref(false)
    const logged = computed(() => !!(userIdentity.value && conversationId.value))
    const lang = ref('en')

    const userIdentity = ref('')
    const conversationId = ref('')
    const userName = ref('')

    const token = ref('')
    const channel = ref('')

    async function genConversation(id: string) {
      const resp = await createConversation({
        bot_id: 1,
        user_identity: id,
        lang: 'en'
      })
      conversationId.value = resp.id
    }

    async function loggin() {
      logging.value = true

      try {
        const data = await passport.auth({
          origin: 'Ask Vitalik',
          authMethods: ['metamask', 'walletconnect', 'mixin'],
          clientId: 'fbd26bc6-3d04-4964-a7fe-a540432b16e2',
          pkce: true,
          scope: 'PROFILE:READ',
          mvmAuthType: 'SignedMessage',
          hooks: {
            beforeSignMessage: async () => {
              return {
                statement: "You'll login to [ Ask Vitalik ] by the signature",
                expirationTime: new Date(new Date().getTime() + 1000 * 60 * 3).toISOString()
              }
            },
            afterSignMessage: async ({ message, signature }) => {
              const pubKey = message.split('\n')[1]
              const hashId = sha256(`ask-vitalik-${pubKey}`)
              userIdentity.value = hashId
              userName.value = pubKey
              channel.value = 'eth'

              await genConversation(hashId)

              logging.value = false

              return signature
            }
          }
        })

        if (data.channel === 'mixin') {
          console.log('mixin')
          token.value = data.token
          channel.value = 'mixin'

          try {
            const resp = await getProfile(data.token)
            const hashId = sha256(`ask-vitalik-${resp.user_id}`)
            userIdentity.value = hashId
            userName.value = resp.full_name

            await genConversation(hashId)
          } catch (error) {
            toast.error({ message: 'Request Mixin data failed' })
          }
        }
      } catch (error: any) {
        toast.error({ message: error?.message ?? '' })
      }

      logging.value = false
    }

    function clearAuth() {
      userIdentity.value = ''
      conversationId.value = ''
      userName.value = ''
      channel.value = ''
    }

    return {
      logging,
      logged,
      lang,
      userIdentity,
      conversationId,
      token,
      userName,
      channel,

      loggin,
      genConversation,
      clearAuth
    }
  },
  {
    persist: [
      {
        paths: ['lang', 'userIdentity', 'token', 'userName', 'channel'],
        storage: localStorage
      },
      {
        paths: ['conversationId'],
        storage: sessionStorage
      }
    ]
  }
)
