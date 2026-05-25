<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    temporary
    class="glass-drawer pt-4"
    width="280"
  >
    <!-- Header -->
    <div class="px-4 pb-4 border-bottom d-flex align-center">
      <v-icon color="primary" size="28" class="mr-2">
        mdi-xml
      </v-icon>
      <span class="font-weight-black">MENÚ OVA</span>
    </div>
    
    <!-- Navigation Items -->
    <v-list density="comfortable" nav class="mt-4">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="isActive(item.to)"
        color="primary"
        rounded="xl"
        class="mb-2"
      />
    </v-list>

    <!-- Progress Stats -->
    <div class="sidebar-footer-stats pa-4 mt-8">
      <div class="glass-panel pa-3 text-center">
        <div class="text-caption text-grey-lighten-1 mb-3">
          PROGRESO ACADÉMICO
        </div>
        <v-progress-circular
          :model-value="progressPercent"
          :size="70"
          :width="7"
          color="primary"
        >
          <span class="text-caption font-weight-bold">
            {{ progressPercent }}%
          </span>
        </v-progress-circular>
        <div 
          v-if="progress.isEvaluationUnlocked"
          class="text-caption text-accent mt-2 font-weight-bold"
        >
          ¡Evaluación Desbloqueada!
        </div>
        <div v-else class="text-caption text-grey-lighten-2 mt-2">
          Completa el 80% para la evaluación
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProgress } from '~~/composables/useProgress'
import { useNavigation } from '~~/composables/useNavigation'
import { storeToRefs } from 'pinia'

const route = useRoute()
const progress = useProgress()
const { progressPercent } = storeToRefs(progress)
const { navItems } = useNavigation()

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isActive = (to: string) => {
  return route.path === to
}
</script>

<style scoped>
.glass-drawer {
  background: rgba(7, 10, 19, 0.9) !important;
  backdrop-filter: blur(25px) saturate(180%) !important;
  border-right: 1px solid rgba(0, 240, 255, 0.1) !important;
}

.glass-panel {
  background: rgba(0, 240, 255, 0.05) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(0, 240, 255, 0.1) !important;
  border-radius: 12px;
}
</style>
