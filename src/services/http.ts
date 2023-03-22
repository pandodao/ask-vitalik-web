import { Http } from '@foxone/utils'
import type { AxiosResponse, AxiosError } from 'axios'

function createResponseInterceptors() {
  return [
    (resp: AxiosResponse) => {
      return resp.data.data
    },
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject({ code: -1, message: 'No Network Response' })
      }

      const { code, msg } = error.response.data as any

      return Promise.reject({ code, message: msg })
    }
  ]
}

export const http = new Http(
  {
    headers: {
      'X-BOTASTIC-APPID': import.meta.env.VITE_APP_ID,
    },
    baseURL: import.meta.env.VITE_BOT_API_BASE
  },
  [],
  [createResponseInterceptors()]
)
