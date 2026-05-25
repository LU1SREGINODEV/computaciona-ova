<template>
  <div class="contents-dashboard">
    <!-- Header -->
    <v-row class="py-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-black text-white mb-2">
          Módulos de <span class="text-gradient-cyan">Contenido</span>
        </h1>
        <p class="text-body-1 text-grey-lighten-1 max-w-600 mx-auto">
          Explora cada uno de los cuatro conceptos clave para resolver problemas como un científico de la computación. Cada módulo incluye explicaciones, ejemplos reales y retos sencillos.
        </p>
      </v-col>
    </v-row>

    <!-- Sub-Progress Panel -->
    <v-row class="justify-center mb-8">
      <v-col cols="12" md="8" lg="6">
        <v-card class="glass-panel pa-4 d-flex align-center flex-wrap gap-4">
          <v-progress-linear
            color="primary"
            height="10"
            :model-value="contentsReadPercentage"
            rounded
            class="flex-grow-1"
          ></v-progress-linear>
          <div class="d-flex align-center ml-auto">
            <v-chip color="primary" variant="tonal" class="mr-2">
              {{ readCount }} de 4 Leídos
            </v-chip>
            <span class="text-body-2 text-white font-weight-bold">{{ contentsReadPercentage }}% Completado</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cards Grid -->
    <v-row class="gap-y-6">
      <v-col 
        cols="12" 
        md="6" 
        v-for="item in contentItems" 
        :key="item.id"
      >
        <v-card 
          :class="['h-100 pa-6 d-flex flex-column position-relative overflow-hidden', getCardClass(item.id)]"
          @click="navigateTo(`/contenidos/${item.id}`)"
        >
          <!-- Corner Glow Decorator -->
          <div class="glow-corner" :style="{ background: item.color === 'primary' ? 'rgba(0, 240, 255, 0.15)' : item.color === 'secondary' ? 'rgba(189, 0, 255, 0.15)' : 'rgba(57, 255, 20, 0.15)' }"></div>

          <div class="d-flex align-center justify-space-between mb-4">
            <v-avatar :color="item.avatarColor" size="56" rounded="xl" class="elevation-6">
              <v-icon :icon="item.icon" color="white" size="30"></v-icon>
            </v-avatar>
            
            <!-- Read / Pending status badge -->
            <v-chip 
              :color="isRead(item.id) ? 'success' : 'grey-lighten-2'" 
              variant="elevated"
              size="small"
              class="font-weight-bold"
            >
              <v-icon :icon="isRead(item.id) ? 'mdi-check-circle' : 'mdi-circle-outline'" class="mr-1"></v-icon>
              {{ isRead(item.id) ? 'LEÍDO' : 'PENDIENTE' }}
            </v-chip>
          </div>

          <h2 class="text-h4 font-weight-bold text-white mb-2">{{ item.title }}</h2>
          <div class="text-subtitle-2 text-primary font-weight-medium mb-4">{{ item.subtitle }}</div>
          
          <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-6 flex-grow-1">
            {{ item.shortDescription }}
          </p>

          <v-divider class="my-4 border-opacity-10"></v-divider>

          <div class="d-flex align-center justify-space-between mt-auto">
            <div class="d-flex align-center gap-2">
              <v-icon icon="mdi-help-circle-outline" size="16" color="grey-lighten-1"></v-icon>
              <span class="text-caption text-grey-lighten-1">Incluye ejemplos de la vida real</span>
            </div>
            <v-btn
              color="primary"
              variant="flat"
              rounded="lg"
              class="px-4 text-none"
              :to="`/contenidos/${item.id}`"
            >
              Estudiar Tema
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgress } from '~~/composables/useProgress'
import contentsData from '~/public/data/contents.json'

const router = useRouter()
const progress = useProgress()

const navigateTo = (path: string) => {
  router.push(path)
}

const isRead = (id: string) => {
  return progress.readContents.includes(id)
}

const readCount = computed(() => {
  return progress.readContents.length
})

const contentsReadPercentage = computed(() => {
  return Math.round((readCount.value / 4) * 100)
})

const getCardClass = (id: string) => {
  if (id === 'patrones') return 'glass-card-purple'
  if (id === 'abstraccion') return 'glass-card-green'
  return 'glass-card'
}

const contentItems = contentsData.map(item => ({
  ...item,
  avatarColor: item.id === 'descomposicion' ? 'primary' 
            : item.id === 'patrones' ? 'secondary' 
            : item.id === 'abstraccion' ? 'accent' 
            : 'info'
}))
</script>

<style scoped>
.max-w-600 {
  max-width: 600px;
}

.glow-corner {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(25px);
  pointer-events: none;
}

.gap-y-6 {
  row-gap: 24px;
}
</style>
