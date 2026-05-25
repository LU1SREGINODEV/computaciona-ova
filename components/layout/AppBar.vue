<template>
  <v-app-bar 
    flat 
    class="glass-navbar px-md-8 px-2"
    height="75"
  >
    <!-- Mobile menu icon -->
    <template #prepend>
      <v-app-bar-nav-icon 
        class="d-md-none text-primary" 
        @click="emit('toggle-drawer')"
      />
      
      <!-- Logo -->
      <div class="d-flex align-center cursor-pointer" @click="navigateTo('/')">
        <v-icon color="primary" size="32" class="float-animation mr-2">
          mdi-xml
        </v-icon>
        <span class="logo-text font-weight-black text-h5">
          PENSAMIENTO<span class="text-primary">.COMP</span>
        </span>
      </div>
    </template>

    <v-spacer />

    <!-- Desktop Nav Items -->
    <div class="d-none d-md-flex align-center gap-4">
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        variant="text"
        class="nav-link font-weight-medium px-4 py-2"
        :color="isActive(item.to) ? 'primary' : 'grey-lighten-1'"
        rounded="lg"
      >
        <v-icon :icon="item.icon" class="mr-2" size="18" />
        {{ item.title }}
      </v-btn>
    </div>

    <v-spacer />

    <!-- Progress Badge -->
    <v-tooltip text="Tu Progreso Global" location="bottom">
      <template #activator="{ props }">
        <v-chip
          v-bind="props"
          color="primary"
          variant="outlined"
          class="progress-badge px-4"
          size="large"
        >
          <v-icon icon="mdi-trophy-outline" class="mr-2" color="accent" />
          <span class="font-weight-bold mr-1">{{ progressPercent }}%</span>
          <span class="text-caption">PROGRESO</span>
        </v-chip>
      </template>
    </v-tooltip>
  </v-app-bar>

  <!-- Progress Bar Line -->
  <div class="global-progress-line-container">
    <div 
      class="global-progress-line"
      :style="{ width: progressPercent + '%' }"
    />
  </div>
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

const emit = defineEmits<{
  'toggle-drawer': []
}>()

const isActive = (to: string) => {
  return route.path === to
}
</script>

<style scoped>
.glass-navbar {
  background: rgba(7, 10, 19, 0.75) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid rgba(0, 240, 255, 0.1) !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.logo-text {
  letter-spacing: -0.05em;
  font-family: 'Outfit', sans-serif;
  background: linear-gradient(90deg, #ffffff 60%, #00f0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.05em;
}

.nav-link:hover {
  background-color: rgba(0, 240, 255, 0.08) !important;
  color: #00f0ff !important;
  transform: translateY(-1px);
}

.global-progress-line-container {
  position: fixed;
  top: 75px;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1001;
}

.global-progress-line {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff 0%, #bd00ff 50%, #39ff14 100%);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.8), 0 0 5px rgba(189, 0, 255, 0.8);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-badge {
  background: rgba(0, 240, 255, 0.05) !important;
  border-color: rgba(0, 240, 255, 0.25) !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
  transition: all 0.3s ease;
}

.progress-badge:hover {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  border-color: rgba(0, 240, 255, 0.45) !important;
}

.gap-4 {
  gap: 16px;
}
</style>
