<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProgressStore } from '~/stores/progress'

const progressStore = useProgressStore()

onMounted(() => {
  progressStore.loadFromLocalStorage()
})
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
