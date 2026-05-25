<template>
  <!-- NO v-app aquí: ya está en app.vue -->

  <!-- AppBar Navigation -->
  <LayoutAppBar @toggle-drawer="drawer = !drawer" />

  <!-- Navigation Drawer (Mobile) -->
  <LayoutNavDrawer v-model="drawer" />

  <!-- Main Content Area -->
  <v-main class="main-content">
    <!-- Abstract Background Shapes for Texture -->
    <div class="bg-shapes-container">
      <div class="glow-shape shape-cyan"></div>
      <div class="glow-shape shape-purple"></div>
      <div class="glow-shape shape-green"></div>
    </div>

    <v-container class="container-main" fluid>
      <slot />
    </v-container>
  </v-main>

  <!-- Footer -->
  <LayoutAppFooter />
</template>

<script setup lang="ts">
const drawer = ref(false)
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 75px - 200px);
  padding-top: 100px;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.container-main {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Background Shapes System */
.bg-shapes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.glow-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.35;
  animation: floatShape 25s infinite ease-in-out alternate;
}

.shape-cyan {
  width: 50vw;
  height: 50vw;
  max-width: 600px;
  max-height: 600px;
  background: rgba(0, 240, 255, 0.15);
  top: -10%;
  left: -10%;
}

.shape-purple {
  width: 60vw;
  height: 60vw;
  max-width: 700px;
  max-height: 700px;
  background: rgba(189, 0, 255, 0.12);
  bottom: -20%;
  right: -10%;
  animation-delay: -7s;
}

.shape-green {
  width: 40vw;
  height: 40vw;
  max-width: 500px;
  max-height: 500px;
  background: rgba(57, 255, 20, 0.08);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes floatShape {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-40px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
</style>
