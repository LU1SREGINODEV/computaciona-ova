<template>
  <v-footer class="custom-footer py-12 px-6 px-md-16">
    <v-container class="footer-container" fluid>
      <v-row>
        <!-- Columna 1: Logo de la Universidad en Grande y Detalles de la Institución -->
        <v-col cols="12" md="4" class="d-flex flex-column align-start mb-8 mb-md-0">
          <div class="logo-wrapper mb-6">
            <img
              src="/logo-universidad.png"
              alt="Universidad de Córdoba"
              class="footer-univ-logo"
              @error="handleLogoError"
            />
          </div>
          <h3 class="univ-title font-title text-h6 mb-2">
            Universidad de Córdoba
          </h3>
          <p class="univ-desc text-body-2 text-grey-lighten-1 mb-6">
            Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional de Colombia. Comprometida con la educación pública, la inclusión y el avance científico y tecnológico de la región.
          </p>
          <div class="social-icons d-flex gap-3">
            <v-btn
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.href"
              target="_blank"
              icon
              variant="text"
              color="primary"
              class="social-btn"
              size="small"
            >
              <v-icon :icon="social.icon" size="20" />
            </v-btn>
          </div>
        </v-col>

        <!-- Columna 2: Navegación del OVA -->
        <v-col cols="12" sm="6" md="2" class="mb-8 mb-sm-0">
          <h4 class="footer-section-title font-title text-uppercase mb-4">
            Navegación
          </h4>
          <ul class="footer-links">
            <li v-for="item in navItems" :key="item.to" class="mb-2">
              <NuxtLink :to="item.to" class="footer-link d-flex align-center">
                <v-icon :icon="item.icon" size="14" class="mr-2 link-icon" />
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </v-col>

        <!-- Columna 3: Contenidos Académicos -->
        <v-col cols="12" sm="6" md="3" class="mb-8 mb-sm-0">
          <h4 class="footer-section-title font-title text-uppercase mb-4">
            Contenidos del OVA
          </h4>
          <ul class="footer-links">
            <li v-for="sub in contenidoLinks" :key="sub.to" class="mb-2">
              <NuxtLink :to="sub.to" class="footer-link d-flex align-center">
                <v-icon icon="mdi-chevron-right" size="14" class="mr-2 link-icon text-accent" />
                {{ sub.title }}
              </NuxtLink>
            </li>
          </ul>
        </v-col>

        <!-- Columna 4: Información de Desarrollo -->
        <v-col cols="12" md="3">
          <h4 class="footer-section-title font-title text-uppercase mb-4">
            Desarrollo & Créditos
          </h4>
          <div class="dev-info-box mb-4">
            <div class="text-caption text-uppercase text-primary font-weight-bold mb-1">
              Desarrollado por:
            </div>
            <div class="text-subtitle-1 font-weight-bold text-white mb-2">
              Luis Ángel Regino
            </div>
            <div class="text-caption text-grey-lighten-2">
              OVA de Pensamiento Computacional diseñado para estudiantes de Grado 9° de bachillerato.
            </div>
          </div>
          <div class="tech-stack-badges">
            <span class="tech-badge">Vue 3</span>
            <span class="tech-badge">Nuxt 4</span>
            <span class="tech-badge">Vuetify 3</span>
            <span class="tech-badge">Pinia</span>
          </div>
        </v-col>
      </v-row>

      <!-- Divisor con efecto Neon Glow -->
      <div class="footer-glow-divider my-8"></div>

      <!-- Fila inferior: Copyright -->
      <v-row class="footer-bottom-row align-center justify-space-between">
        <v-col cols="12" sm="auto" class="text-center text-sm-left text-body-2 text-grey-lighten-1 mb-4 mb-sm-0">
          <span>© 2026 Universidad de Córdoba · Todos los derechos reservados.</span>
        </v-col>
        <v-col cols="12" sm="auto" class="d-flex justify-center align-center">
          <span class="text-caption text-primary text-uppercase font-weight-black tracking-widest">
            Material Educativo Digital Abierto (MEDA)
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useNavigation } from '~~/composables/useNavigation'

const { navItems } = useNavigation()

const socialLinks = [
  { icon: 'mdi-web', href: 'https://www.unicordoba.edu.co/' },
  { icon: 'mdi-facebook', href: 'https://www.facebook.com/unicordobaoficial' },
  { icon: 'mdi-twitter', href: 'https://twitter.com/Unicordoba_Col' },
  { icon: 'mdi-youtube', href: 'https://www.youtube.com/user/unicordobavirtual' },
  { icon: 'mdi-instagram', href: 'https://www.instagram.com/unicordoba_col/' }
]

const contenidoLinks = [
  { title: 'Introducción a Contenidos', to: '/contenidos' },
  { title: 'Descomposición', to: '/contenidos/descomposicion' },
  { title: 'Reconocimiento de Patrones', to: '/contenidos/patrones' },
  { title: 'Abstracción', to: '/contenidos/abstraccion' },
  { title: 'Algoritmos', to: '/contenidos/algoritmos' }
]

const handleLogoError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  if (target) {
    target.style.display = 'none';
  }
}
</script>

<style scoped>
.custom-footer {
  background: linear-gradient(
    180deg,
    rgba(7, 10, 19, 0.95) 0%,
    rgba(10, 15, 29, 0.98) 100%
  ) !important;
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(0, 240, 255, 0.15) !important;
  position: relative;
  width: 100%;
  color: #e2e8f0 !important;
  overflow: hidden;
}

/* Decoraciones de fondo brillantes (neon circles) para dar ese toque tecnológico */
.custom-footer::before {
  content: '';
  position: absolute;
  top: -100px;
  right: 5%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(189, 0, 255, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.custom-footer::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: 5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Contenedor del logo con efecto de vidrio */
.logo-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 16px 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.logo-wrapper:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 12px 40px 0 rgba(0, 240, 255, 0.25);
  transform: translateY(-3px);
}

/* Logo Grande */
.footer-univ-logo {
  height: 90px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  transition: all 0.4s ease;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
}

.univ-title {
  font-family: var(--font-title);
  color: #ffffff;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.univ-desc {
  line-height: 1.6;
  max-width: 340px;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-btn {
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.15);
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(0, 240, 255, 0.15) !important;
  border-color: rgba(0, 240, 255, 0.5) !important;
  color: #00f0ff !important;
  transform: translateY(-3px);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.3);
}

.footer-section-title {
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  border-bottom: 2px solid rgba(0, 240, 255, 0.25);
  padding-bottom: 8px;
  display: inline-block;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.footer-link:hover {
  color: #00f0ff;
  transform: translateX(4px);
}

.link-icon {
  transition: transform 0.25s ease;
}

.footer-link:hover .link-icon {
  transform: scale(1.2);
  color: #00f0ff !important;
}

.dev-info-box {
  background: rgba(17, 23, 38, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 16px;
  transition: all 0.3s ease;
}

.dev-info-box:hover {
  border-color: rgba(189, 0, 255, 0.25);
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.1);
}

.tech-stack-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tech-badge {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 12px;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  color: #00f0ff;
  background: rgba(0, 240, 255, 0.05);
  border-color: rgba(0, 240, 255, 0.25);
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
}

.footer-glow-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg, 
    rgba(0, 240, 255, 0.05) 0%, 
    rgba(0, 240, 255, 0.3) 50%, 
    rgba(0, 240, 255, 0.05) 100%
  );
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.footer-bottom-row {
  letter-spacing: 0.02em;
}

.tracking-widest {
  letter-spacing: 0.15em;
}

/* Responsivo */
@media (max-width: 960px) {
  .custom-footer {
    padding-top: 48px !important;
    padding-bottom: 32px !important;
  }
  .univ-desc {
    max-width: 100%;
  }
}
</style>
