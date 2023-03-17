import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createVuetify } from 'vuetify'
import UIKit from '@foxone/uikit'
import { createI18n } from 'vue-i18n'
import Passport from '@foxone/mixin-passport'
import { mdi } from 'vuetify/iconsets/mdi'
import { usePresets } from '@foxone/uikit/presets'
import i18noptions from './i18n/options'

import App from './App.vue'

import router from './router'

import './assets/main.css'
import 'vuetify/styles'

const app = createApp(App)

const options = usePresets({
  icons: {
    defaultSet: 'mdi',
    sets: { mdi }
  }
})

const i18n = createI18n(i18noptions)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(createVuetify(options))
app.use(Passport, {})
app.use(i18n)
app.use(UIKit)

app.mount('#app')
