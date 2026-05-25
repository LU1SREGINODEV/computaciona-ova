<template>
  <div class="content-detail-page">
    <!-- Navigation Back -->
    <div class="mb-6">
      <v-btn
        to="/contenidos"
        variant="text"
        color="secondary"
        prepend-icon="mdi-arrow-left"
        class="text-none font-weight-bold"
      >
        Volver a Contenidos
      </v-btn>
    </div>

    <!-- Hero Section -->
    <v-row class="mb-8 align-center">
      <v-col cols="12" md="8">
        <div class="d-flex align-center gap-3 mb-2">
          <v-avatar color="secondary" size="48">
            <v-icon icon="mdi-hub" color="white" size="26"></v-icon>
          </v-avatar>
          <span class="text-caption text-secondary font-weight-bold tracking-wider uppercase">Pilar 02 de Pensamiento Computacional</span>
        </div>
        <h1 class="text-h3 font-weight-black text-white mb-2">Reconocimiento de Patrones</h1>
        <p class="text-h6 text-gradient-purple font-weight-medium">Buscar similitudes</p>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-btn
          v-if="!isRead"
          color="secondary"
          size="large"
          prepend-icon="mdi-book-open-page-variant"
          class="glow-button px-6 font-weight-bold"
          rounded="lg"
          @click="markAsRead"
        >
          Marcar como Leído (+7.5%)
        </v-btn>
        <v-chip
          v-else
          color="success"
          size="x-large"
          class="font-weight-bold px-6 py-4"
          variant="flat"
        >
          <v-icon icon="mdi-check-circle" class="mr-2" size="24"></v-icon>
          ¡Lección Completada!
        </v-chip>
      </v-col>
    </v-row>

    <!-- Definition & Context -->
    <v-row class="mb-8">
      <v-col cols="12" md="7">
        <v-card class="glass-panel pa-6 h-100">
          <h2 class="text-h5 text-white font-weight-bold mb-4">¿Qué es el Reconocimiento de Patrones?</h2>
          <p class="text-body-1 text-grey-lighten-2 mb-4" style="line-height: 1.8;">
            ¿Te has dado cuenta de que cuando aprendes a resolver una tarea en un videojuego, la siguiente que es similar la resuelves mucho más rápido? Esto es porque tu cerebro identifica cosas que se repiten.
          </p>
          <p class="text-body-1 text-grey-lighten-2" style="line-height: 1.8;">
            El **reconocimiento de patrones** consiste en buscar similitudes, regularidades o tendencias repetitivas tanto dentro de un mismo problema como entre problemas diferentes. Al encontrar estos patrones compartidos, podemos aplicar la misma solución que ya sabemos que funciona para resolver problemas nuevos de forma mucho más rápida y eficiente.
          </p>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-card class="glass-card-purple pa-6 h-100 border-glow-purple position-relative overflow-hidden">
          <h2 class="text-h5 text-secondary font-weight-bold mb-4">Ejemplo en la Vida Real</h2>
          <div class="text-subtitle-1 text-white font-weight-bold mb-2">Tendencias de Contenido (TikTok)</div>
          <p class="text-body-2 text-grey-lighten-2 mb-4">
            El algoritmo de TikTok busca patrones en lo que te gusta:
          </p>
          <ul class="text-body-2 text-grey-lighten-2 pl-4 d-flex flex-column gap-2">
            <li>Si te quedas viendo 3 videos sobre robótica hasta el final.</li>
            <li>Si das 'Like' a videos que usan una canción electrónica específica.</li>
            <li><strong class="text-white">Patrón detectado:</strong> Te interesan los gadgets e instrumental electrónico.</li>
            <li><strong class="text-white">Acción:</strong> Te recomienda automáticamente videos similares con esa música.</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visual Stepper -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold text-white">Fases del Análisis de Patrones</h2>
      </v-col>
      
      <v-col cols="12" md="3" v-for="step in steps" :key="step.num">
        <v-card class="glass-panel pa-6 text-center h-100 hover-scale-purple">
          <v-avatar color="secondary" size="48" class="mb-4 font-weight-black text-white elevation-4 text-h6">
            {{ step.num }}
          </v-avatar>
          <h3 class="text-h6 text-white font-weight-bold mb-3">{{ step.title }}</h3>
          <p class="text-body-2 text-grey-lighten-2" style="line-height: 1.6;">
            {{ step.desc }}
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Interactive Mini Challenge -->
    <v-row class="mb-10">
      <v-col cols="12">
        <v-card class="glass-card-purple pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-4">
            <v-icon icon="mdi-lightbulb-on-outline" color="secondary" class="mr-2"></v-icon>
            Mini-Reto Lógico: Secuencias Lógicas en Código
          </h2>
          <p class="text-body-1 text-grey-lighten-2 mb-6">
            Un robot camina siguiendo este patrón de pasos en una cuadrícula: <br />
            <code>[Avanzar 2, Girar Derecha 1, Avanzar 2, Girar Derecha 1, Avanzar 2, ...]</code> <br /><br />
            Si deseamos que el robot complete un recorrido cuadrado y regrese exactamente al punto de inicio, ¿cuántas veces debe ejecutarse este patrón completo en total?
          </p>
          
          <v-radio-group v-model="selectedOption" class="custom-radio-group" :disabled="challengeCompleted">
            <v-radio
              v-for="(option, idx) in options"
              :key="idx"
              :value="idx"
              color="secondary"
              class="mb-3 text-white glass-panel pa-3 rounded-lg border-opacity-10"
            >
              <template v-slot:label>
                <span class="text-body-2 text-grey-lighten-1">{{ option.text }}</span>
              </template>
            </v-radio>
          </v-radio-group>
          
          <div class="mt-4 d-flex align-center flex-wrap gap-4">
            <v-btn
              color="secondary"
              class="font-weight-bold px-6"
              rounded="lg"
              :disabled="selectedOption === null || challengeCompleted"
              @click="checkAnswer"
            >
              Verificar Patrón
            </v-btn>
            
            <div v-if="feedback" :class="['text-body-2 font-weight-bold', isCorrect ? 'text-accent' : 'text-error']">
              {{ feedback }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Navigation Footer -->
    <div class="d-flex justify-space-between align-center">
      <v-btn to="/contenidos/descomposicion" variant="outlined" color="secondary" rounded="lg" class="text-none font-weight-bold">
        <v-icon icon="mdi-arrow-left" class="mr-1"></v-icon> Anterior: Descomposición
      </v-btn>
      <v-btn to="/contenidos/abstraccion" color="secondary" rounded="lg" class="text-none font-weight-bold">
        Siguiente Pilar: Abstracción <v-icon icon="mdi-arrow-right" class="ml-1"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

const isRead = computed(() => {
  return progress.readContents.includes('patrones')
})

const markAsRead = () => {
  progress.readContent('patrones')
}

const steps = [
  {
    num: '1',
    title: 'Recopilar Datos',
    desc: 'Observa y registra el comportamiento del problema a través de diferentes intentos o registros.'
  },
  {
    num: '2',
    title: 'Buscar similitudes',
    desc: 'Compara los datos para encontrar qué acciones, números o eventos se repiten en orden.'
  },
  {
    num: '3',
    title: 'Formular una regla',
    desc: 'Define de forma matemática o lingüística el patrón encontrado (ej: "cada paso suma 3").'
  },
  {
    num: '4',
    title: 'Generalizar solución',
    desc: 'Aplica esa misma regla establecida para resolver nuevos casos similares rápidamente.'
  }
]

// Challenge Logic
const selectedOption = ref<number | null>(null)
const feedback = ref('')
const isCorrect = ref(false)
const challengeCompleted = ref(false)

const options = [
  { text: 'A) 2 veces.', correct: false },
  { text: 'B) 3 veces.', correct: false },
  { text: 'C) 4 veces (Ya que un cuadrado tiene 4 lados y cada secuencia hace avanzar y girar 90 grados).', correct: true },
  { text: 'D) 8 veces.', correct: false }
]

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  const chosen = options[selectedOption.value]
  if (chosen.correct) {
    feedback.value = '¡Correcto! Como el robot gira a la derecha 90 grados (1 giro de esquina) en cada repetición del patrón, necesita ejecutarlo 4 veces en total para trazar los 4 lados de un cuadrado y regresar a la orientación inicial.'
    isCorrect.value = true
    challengeCompleted.value = true
    markAsRead()
  } else {
    feedback.value = 'Incorrecto. Recuerda que un giro a la derecha completo en un cuadrado requiere cerrar una forma de 4 esquinas de 90 grados cada una. ¡Inténtalo de nuevo!'
    isCorrect.value = false
  }
}
</script>

<style scoped>
.border-glow-purple {
  border-color: rgba(189, 0, 255, 0.35) !important;
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.1) !important;
}

.hover-scale-purple {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hover-scale-purple:hover {
  transform: translateY(-4px);
  border-color: rgba(189, 0, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.15) !important;
}

.glow-button {
  background: linear-gradient(135deg, #bd00ff 0%, #ff007f 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.4);
}

.glow-button:hover {
  box-shadow: 0 0 25px rgba(189, 0, 255, 0.7);
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}
</style>
