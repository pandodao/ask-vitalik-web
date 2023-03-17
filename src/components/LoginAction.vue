<template>
  <slot v-if="!useAccountStore().logged || logging" name="login-action">
    <FButton :loading="logging" color="primary" v-bind="$attrs" @click="loggin"> {{ $t("connect.wallet.to.chat") }} </FButton>
  </slot>

  <slot v-else></slot>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';

const { loggin, logging } = useAccountStore();
</script>
