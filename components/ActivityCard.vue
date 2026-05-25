<template>
  <v-card 
    class="activity-card glass-card pa-5 d-flex flex-column h-100"
    :class="{ completed: isCompleted }"
  >
    <!-- Header con icono y estado -->
    <div class="d-flex align-center justify-space-between mb-4">
      <v-chip
        :color="chipColor"
        variant="elevated"
        class="font-weight-bold"
      >
        <v-icon :icon="icon" class="mr-1" />
        {{ type.toUpperCase() }}
      </v-chip>
      <v-badge 
        v-if="isCompleted"
        color="success"
        content="✓"
        overlap
      >
        <v-icon icon="mdi-check-circle" color="success" size="24" />
      </v-badge>
    </div>

    <!-- Contenido -->
    <h3 class="text-h5 font-weight-bold text-white mb-2">
      {{ title }}
    </h3>
    
    <p class="text-body-2 text-grey-lighten-2 mb-4 flex-grow-1">
      {{ description }}
    </p>

    <!-- Botón de acción -->
    <div class="d-flex gap-2">
      <v-btn
        color="primary"
        variant="tonal"
        prepend-icon="mdi-play-circle-outline"
        class="flex-grow-1"
        @click="emit('click')"
      >
        {{ isCompleted ? 'Revisar' : 'Comenzar' }}
      </v-btn>
      <v-tooltip v-if="isCompleted" text="Ya completada">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-check"
            color="success"
            variant="text"
          />
        </template>
      </v-tooltip>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  description: string
  type: 'sorting' | 'multiple-choice' | 'matching' | 'maze'
  completed?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  completed: false,
  icon: 'mdi-puzzle-outline'
})

defineEmits<{
  click: []
}>()

const isCompleted = computed(() => props.completed)

const chipColor = computed(() => {
  const colors: Record<string, string> = {
    'sorting': 'primary',
    'multiple-choice': 'secondary',
    'matching': 'accent',
    'maze': 'info'
  }
  return colors[props.type] || 'primary'
})
</script>

<style scoped>
.activity-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.activity-card:hover {
  transform: translateY(-4px);
}

.activity-card.completed {
  border-color: rgba(16, 185, 129, 0.4) !important;
  background: rgba(16, 185, 129, 0.03) !important;
}

.gap-2 {
  gap: 8px;
}

.flex-grow-1 {
  flex: 1;
}

.leading-relaxed {
  line-height: 1.625;
}
</style>
