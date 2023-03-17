import { Http } from '@foxone/utils'
// import { useAccountStore } from '@/stores/account'

import type { AxiosResponse } from 'axios'

export function createResponseIntercept() {
  return [
    (resp: AxiosResponse) => {
      if (resp.status === 401 || resp?.data?.error?.code === 401) {
        // logout()

        return Promise.reject({ code: 401, message: 'Authorize Error' })
      }

      return resp.data.data
    }
  ]
}

export const http = new Http(
  {
    baseURL: import.meta.env.VITE_MIXIN_API_BASE
  },
  [],
  [createResponseIntercept()]
)
