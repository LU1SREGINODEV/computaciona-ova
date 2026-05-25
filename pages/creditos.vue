<template>
  <div class="credits-page">
    <!-- Header -->
    <v-row class="py-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-black text-white mb-2">
          Créditos del <span class="text-gradient-cyan">Proyecto</span>
        </h1>
        <p class="text-body-1 text-grey-lighten-1 max-w-600 mx-auto">
          Conoce al desarrollador y la institución académica detrás del diseño y
          desarrollo de este Objeto Virtual de Aprendizaje (OVA).
        </p>
      </v-col>
    </v-row>

    <!-- Main Profile and Info Grid -->
    <v-row class="justify-center">
      <!-- Developer Card (Figma Style Profile) -->
      <v-col cols="12" md="6" lg="5" class="mb-6">
        <v-card
          class="glass-card pa-6 text-center h-100 position-relative overflow-hidden"
        >
          <div class="glow-corner-purple"></div>

          <!-- Avatar -->
          <div class="avatar-wrapper mb-6 mx-auto float-animation">
            <img src="/yo.png" alt="Luis Ángel Regino" class="profile-photo" />
          </div>

          <h2 class="text-h4 font-weight-black text-white mb-1">
            Luis Ángel Regino
          </h2>
          <div
            class="text-subtitle-1 text-primary font-weight-bold mb-4 uppercase tracking-wider"
          >
            Desarrollador Full-Stack & UI/UX
          </div>

          <v-divider class="my-4 border-opacity-10"></v-divider>

          <div
            class="text-left d-flex flex-column gap-3 text-body-2 text-grey-lighten-2"
          >
            <div class="d-flex align-center">
              <v-icon icon="mdi-school" color="primary" class="mr-3"></v-icon>
              <span>Licenciatura en Informática</span>
            </div>
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-town-hall"
                color="secondary"
                class="mr-3"
              ></v-icon>
              <span>Universidad de Córdoba</span>
            </div>
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-map-marker"
                color="accent"
                class="mr-3"
              ></v-icon>
              <span>Montería, Córdoba, Colombia</span>
            </div>
            <div class="d-flex align-center">
              <v-icon
                icon="mdi-calendar-clock"
                color="info"
                class="mr-3"
              ></v-icon>
              <span>Año de desarrollo: 2026</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- University & Project details -->
      <v-col cols="12" md="6" lg="5" class="mb-6">
        <v-card
          class="glass-card pa-6 h-100 d-flex flex-column justify-between"
        >
          <div>
            <!-- University Emblem Vector -->
            <div class="d-flex align-center mb-6">
              <div class="university-emblem-svg mr-4">
                <svg
                  viewBox="0 0 100 100"
                  width="55"
                  height="55"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- Outer polygon -->
                  <polygon
                    points="50,5 92,30 92,70 50,95 8,70 8,30"
                    fill="none"
                    stroke="#39ff14"
                    stroke-width="3"
                  />
                  <!-- Inner details representing learning and university -->
                  <path
                    d="M30 40 L50 25 L70 40 L70 65 L50 80 L30 65 Z"
                    fill="none"
                    stroke="#00f0ff"
                    stroke-width="2"
                  />
                  <path d="M50 25 L50 80" stroke="#00f0ff" stroke-width="1.5" />
                  <circle
                    cx="50"
                    cy="50"
                    r="10"
                    fill="none"
                    stroke="#bd00ff"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-h6 font-weight-bold text-white leading-tight">
                  Universidad de Córdoba
                </h3>
                <span class="text-caption text-grey-lighten-1"
                  >Institución de Educación Superior Pública</span
                >
              </div>
            </div>

            <h3 class="text-h5 font-weight-bold text-white mb-3">
              Sobre este OVA
            </h3>
            <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-4">
              Este Objeto Virtual de Aprendizaje (OVA) es el resultado de un
              proyecto académico enfocado en la innovación de la enseñanza de
              las ciencias de la computación.
            </p>
            <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-6">
              Su propósito pedagógico es brindar a estudiantes de
              <strong>Grado 9° de educación básica secundaria</strong> una
              herramienta lúdica, visual y interactiva para comprender y
              ejercitar los pilares lógicos que estructuran la resolución de
              problemas técnicos y lógicos.
            </p>
          </div>

          <!-- Technologies Badges -->
          <div>
            <h4
              class="text-subtitle-2 font-weight-bold text-white mb-3 uppercase tracking-wider"
            >
              Tecnologías Utilizadas
            </h4>
            <div class="d-flex flex-wrap gap-2">
              <v-chip
                color="accent"
                variant="elevated"
                size="small"
                class="font-weight-bold text-black"
                >Vue 3</v-chip
              >
              <v-chip
                color="primary"
                variant="elevated"
                size="small"
                class="font-weight-bold"
                >Nuxt 4</v-chip
              >
              <v-chip
                color="secondary"
                variant="elevated"
                size="small"
                class="font-weight-bold"
                >Vuetify 3</v-chip
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// Credits page requires no complex logic
</script>

<style scoped>
.max-w-600 {
  max-width: 600px;
}

.glow-corner-purple {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(189, 0, 255, 0.12);
  filter: blur(25px);
  pointer-events: none;
}

.avatar-wrapper {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 240, 255, 0.2) 0%,
    transparent 80%
  );
  border: 1px dashed rgba(0, 240, 255, 0.3);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.university-emblem-svg {
  filter: drop-shadow(0 0 8px rgba(57, 255, 20, 0.25));
}

.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
</style>
