<template>
  <header :class="smAndDown ? 'header-mobile' : 'header'">
    <div class="wrapper">
      <SiteIntro name="Ask Vitalik" />

      <nav :class="smAndDown ? 'nav-mobile' : 'nav'">
        <RouterLink to="/">{{ $t('home') }}</RouterLink>
        <RouterLink to="/about">{{ $t('about') }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import { RouterLink, RouterView } from 'vue-router'
import SiteIntro from './components/SiteIntro.vue'
import { useAccountStore } from './stores/account'

const { locale } = useI18n()
const { smAndDown } = useDisplay()
const accountStore = useAccountStore()

const setLang = () => {
  locale.value = useAccountStore().lang
}

onMounted(() => {
  setLang()
})

watch(
  () => accountStore.lang,
  () => setLang()
)
</script>

<style scoped>
.header-mobile {
  line-height: 1.5;
  max-height: 100vh;
}

.nav-mobile {
  width: 100%;
  font-size: 12px;
  padding: 0;
  margin: 8px 0;
}

.nav-mobile a {
  display: inline-block;
  padding-right: 12px;
  font-weight: 700;
}

.header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

.header-mobile .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.nav {
  text-align: left;
  padding: 1rem 0;
  margin-top: 1rem;
}

.nav a {
  padding-right: 12px;
  font-weight: 800;
}
</style>
