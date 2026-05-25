<template>
  <div class="pillars-section">
    <!-- Header -->
    <v-row class="py-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 font-weight-bold text-white mb-2">
          Los 4 Superpoderes de la Mente Computacional
        </h2>
        <p class="text-body-1 text-grey-lighten-1">
          Aprende y aplica los cuatro pilares fundamentales para resolver cualquier desafío.
        </p>
      </v-col>
    </v-row>

    <!-- Pillar Cards Grid -->
    <v-row class="py-4">
      <v-col 
        v-for="pillar in PILLARS"
        :key="pillar.id"
        cols="12" 
        sm="6" 
        lg="3"
      >
        <v-card 
          class="glass-card h-100 pa-5 d-flex flex-column cursor-pointer"
          @click="navigateTo(`/contenidos/${pillar.id}`)"
        >
          <!-- Header with Icon and Number -->
          <div class="d-flex align-center justify-space-between mb-4">
            <v-avatar 
              :color="pillar.bgColor"
              size="52"
              rounded="lg"
              class="elevation-4"
            >
              <v-icon :icon="pillar.icon" color="white" size="28" />
            </v-avatar>
            <span class="text-caption text-grey-lighten-1 font-weight-bold">
              PILAR {{ pillar.num }}
            </span>
          </div>
          
          <!-- Title -->
          <h3 class="text-h5 font-weight-bold text-white mb-2">
            {{ pillar.title }}
          </h3>
          
          <!-- Slogan -->
          <div class="text-caption text-primary font-weight-bold mb-3 uppercase tracking-wider">
            {{ pillar.slogan }}
          </div>
          
          <!-- Description -->
          <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-4 flex-grow-1">
            {{ pillar.desc }}
          </p>
          
          <v-divider class="my-4 border-opacity-15" />
          
          <!-- Explore Button -->
          <div class="d-flex align-center text-primary font-weight-bold text-caption cursor-pointer">
            Explorar Pilar <v-icon icon="mdi-chevron-right" class="ml-1" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { PILLARS } from '~~/utils/constants'

// El componente es puramente presentacional
</script>

<style scoped>
.pillars-section {
  width: 100%;
}

.cursor-pointer {
  cursor: pointer;
}

.leading-relaxed {
  line-height: 1.625;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.flex-grow-1 {
  flex: 1;
}

.uppercase {
  text-transform: uppercase;
}

.border-opacity-15 {
  border-color: rgba(255, 255, 255, 0.15) !important;
}
</style>
