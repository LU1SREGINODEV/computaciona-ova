/**
 * Declaraciones de tipos globales para Nuxt 3 + Vuetify 3
 */

// Auto-imports de Nuxt
declare global {
  const navigateTo: typeof import('#app').navigateTo
  const useRouter: typeof import('#app').useRouter
  const useRoute: typeof import('#app').useRoute
  const definePageMeta: typeof import('#app').definePageMeta
  const useHead: typeof import('#app').useHead
  const useState: typeof import('#app').useState
  const useAsyncData: typeof import('#app').useAsyncData
  const useFetch: typeof import('#app').useFetch
  const useNuxtData: typeof import('#app').useNuxtData
  const useNuxtApp: typeof import('#app').useNuxtApp
  const defineNuxtConfig: typeof import('#app').defineNuxtConfig
  const defineNuxtPlugin: typeof import('#app').defineNuxtPlugin
}

export {}
