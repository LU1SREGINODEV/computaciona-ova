<template>
  <v-card class="glass-card pa-8">
    <!-- Header -->
    <div class="mb-8">
      <v-chip
        v-if="pillars"
        :color="pillarColor"
        variant="elevated"
        class="mb-4 font-weight-bold"
      >
        <v-icon icon="mdi-book-open-outline" class="mr-2" />
        {{ pillarName }}
      </v-chip>
      
      <h1 class="text-h3 font-weight-black text-white mb-2">
        {{ title }}
      </h1>
      
      <p v-if="subtitle" class="text-body-1 text-grey-lighten-1">
        {{ subtitle }}
      </p>
    </div>

    <!-- Progress Info -->
    <div class="d-flex align-center justify-space-between mb-8 pb-8 border-bottom">
      <div class="d-flex align-center gap-4">
        <div v-if="readingTime">
          <v-icon icon="mdi-clock-outline" class="mr-2" color="info" />
          <span class="text-body-2 text-grey-lighten-1">
            ~{{ readingTime }} min de lectura
          </span>
        </div>
      </div>
      
      <v-chip
        v-if="showReadButton"
        color="primary"
        variant="outlined"
        @click="emit('mark-read')"
        class="ml-4"
      >
        <v-icon icon="mdi-bookmark-check-outline" class="mr-1" />
        Marcar como leído
      </v-chip>
    </div>

    <!-- Content -->
    <div class="content-body">
      <slot />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { PILLARS } from '~~/utils/constants'

interface Props {
  title: string
  subtitle?: string
  pillarId?: string
  readingTime?: number
  showReadButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showReadButton: true
})

defineEmits<{
  'mark-read': []
}>()

const pillars = PILLARS.find(p => p.id === props.pillarId)
const pillarName = pillars?.title || ''
const pillarColor = pillars?.bgColor || 'primary'
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}

.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.content-body {
  line-height: 1.8;
}

.content-body :deep(p) {
  margin-bottom: 16px;
  color: #cbd5e1;
}

.content-body :deep(h2) {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 32px;
  margin-bottom: 16px;
}

.content-body :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
  margin-top: 24px;
  margin-bottom: 12px;
}

.content-body :deep(ul),
.content-body :deep(ol) {
  margin-bottom: 16px;
  margin-left: 20px;
}

.content-body :deep(li) {
  margin-bottom: 8px;
  color: #cbd5e1;
}

.content-body :deep(code) {
  background: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.content-body :deep(blockquote) {
  border-left: 4px solid #00f0ff;
  padding-left: 16px;
  margin-left: 0;
  color: #cbd5e1;
  font-style: italic;
}
</style>
