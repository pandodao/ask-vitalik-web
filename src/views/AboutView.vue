<template>
  <div :class="smAndDown ? 'about-mobile' : 'about'">
    <h1 v-if="!smAndDown">{{ $t('about') }}</h1>
    <p>
      based on Pando <a href="https://developers.pando.im/references/botastic/api.html">Botastic API</a>, developed by <a href="https://pando.im">Pando Proto</a>.
    </p>
    <p>
      <a href="https://github.com/pandodao/ask-vitalik-web/">Source code</a>
    </p>
  </div>
</template>

<script setup lang='ts'>
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
</script>

<style scoped>
.about {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.about-mobile {
  margin-top: 32px;
}

a {
  text-decoration: underline;
}
</style>
