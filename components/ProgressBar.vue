<template>
  <v-card class="glass-panel pa-4 d-flex align-center flex-wrap gap-4">
    <v-progress-linear
      :color="progressColor"
      :model-value="percentage"
      height="10"
      rounded
      class="flex-grow-1"
    />
    <div class="d-flex align-center ml-auto">
      <v-chip 
        :color="progressColor"
        variant="tonal"
        class="mr-2"
      >
        {{ completed }} de {{ total }}
      </v-chip>
      <span class="text-body-2 font-weight-bold">
        {{ percentage }}% Completado
      </span>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  completed: number
  total: number
}

const props = defineProps<Props>()

const percentage = computed(() => {
  return Math.round((props.completed / props.total) * 100)
})

const progressColor = computed(() => {
  if (percentage.value < 25) return 'error'
  if (percentage.value < 50) return 'warning'
  if (percentage.value < 75) return 'info'
  return 'success'
})
</script>

<style scoped>
.glass-panel {
  background: rgba(0, 240, 255, 0.05) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(0, 240, 255, 0.1) !important;
  border-radius: 12px;
}

.gap-4 {
  gap: 16px;
}

.flex-grow-1 {
  flex: 1 1 auto;
}
</style>
