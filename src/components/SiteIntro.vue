<template>
  <div class="greetings">
    <img
      v-if="!smAndDown"
      alt="Vitalik"
      class="logo"
      src="/vitalik-avatar.jpg"
    />

    <h1 class="title">{{ name }}</h1>
    <h3 :class="smAndDown ? 'description-mobile' : 'description'">{{ $t('ask.now') }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

defineProps<{
  name: string
}>()

const { smAndDown } = useDisplay();
</script>

<style scoped>
.title {
  color: black;
  font-weight: 800;
}

.description {
  font-weight: 500;
  color: black;
}

.description-mobile {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 12px;
  color: black;
}

.logo {
  margin: 0 2rem 0 0;
  border-radius: 50%;
  width: 125px;
  height: 125px;
}
</style>
