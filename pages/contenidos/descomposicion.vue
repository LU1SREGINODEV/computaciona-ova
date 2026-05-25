<template>
  <div class="content-detail-page">
    <!-- Navigation Back -->
    <div class="mb-6">
      <v-btn
        to="/contenidos"
        variant="text"
        color="primary"
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
          <v-avatar color="primary" size="48">
            <v-icon icon="mdi-sitemap" color="white" size="26"></v-icon>
          </v-avatar>
          <span class="text-caption text-primary font-weight-bold tracking-wider uppercase">Pilar 01 de Pensamiento Computacional</span>
        </div>
        <h1 class="text-h3 font-weight-black text-white mb-2">Descomposición</h1>
        <p class="text-h6 text-gradient-cyan font-weight-medium">Divide y vencerás</p>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-btn
          v-if="!isRead"
          color="primary"
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
          <h2 class="text-h5 text-white font-weight-bold mb-4">¿Qué es la Descomposición?</h2>
          <p class="text-body-1 text-grey-lighten-2 mb-4" style="line-height: 1.8;">
            Imagina que te piden construir un cohete espacial de tamaño real. Si lo miras en conjunto, parece una tarea imposible. Pero ¿y si primero te enfocas en construir solo la rueda? ¿Luego el tanque de combustible? ¿Luego el parabrisas?
          </p>
          <p class="text-body-1 text-grey-lighten-2" style="line-height: 1.8;">
            De eso se trata la **descomposición**: es el proceso de tomar un problema grande, confuso o complejo, y romperlo en piezas más pequeñas, sencillas y manejables. Al resolver por separado cada pequeña pieza, terminas solucionando el gran problema de manera ordenada y sin estresarte.
          </p>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-card class="glass-card pa-6 h-100 border-glow-cyan position-relative overflow-hidden">
          <h2 class="text-h5 text-primary font-weight-bold mb-4">Ejemplo en la Vida Real</h2>
          <div class="text-subtitle-1 text-white font-weight-bold mb-2">Crear un Videojuego de Autos</div>
          <p class="text-body-2 text-grey-lighten-2 mb-4">
            Un programador profesional no escribe el juego completo de golpe. Aplica descomposición dividiéndolo en:
          </p>
          <ul class="text-body-2 text-grey-lighten-2 pl-4 d-flex flex-column gap-2">
            <li><strong class="text-white">Módulo 1:</strong> Control del movimiento físico del auto.</li>
            <li><strong class="text-white">Módulo 2:</strong> Dibujar las curvas y texturas de la pista.</li>
            <li><strong class="text-white">Módulo 3:</strong> La inteligencia artificial del carro oponente.</li>
            <li><strong class="text-white">Módulo 4:</strong> Interfaz de usuario (marcador de vueltas y velocidad).</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visual Stepper -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold text-white">¿Cómo descomponer un problema paso a paso?</h2>
      </v-col>
      
      <v-col cols="12" md="3" v-for="step in steps" :key="step.num">
        <v-card class="glass-panel pa-6 text-center h-100 hover-scale">
          <v-avatar color="primary" size="48" class="mb-4 font-weight-black text-white elevation-4 text-h6">
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
        <v-card class="glass-card pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-4">
            <v-icon icon="mdi-lightbulb-on-outline" color="accent" class="mr-2"></v-icon>
            Mini-Reto Lógico: Descomponiendo un Desayuno
          </h2>
          <p class="text-body-1 text-grey-lighten-2 mb-6">
            Estás programando un robot de cocina para que prepare un tazón de cereal con leche y fresas cortadas. Para programarlo correctamente, debes descomponer la tarea. Selecciona la opción que representa la descomposición de tareas CORRECTA y más lógica:
          </p>
          
          <v-radio-group v-model="selectedOption" class="custom-radio-group" :disabled="challengeCompleted">
            <v-radio
              v-for="(option, idx) in options"
              :key="idx"
              :value="idx"
              color="primary"
              class="mb-3 text-white glass-panel pa-3 rounded-lg border-opacity-10"
            >
              <template v-slot:label>
                <span class="text-body-2 text-grey-lighten-1">{{ option.text }}</span>
              </template>
            </v-radio>
          </v-radio-group>
          
          <div class="mt-4 d-flex align-center flex-wrap gap-4">
            <v-btn
              color="accent"
              class="font-weight-bold px-6 text-black"
              rounded="lg"
              :disabled="selectedOption === null || challengeCompleted"
              @click="checkAnswer"
            >
              Verificar Respuesta
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
      <v-btn to="/contenidos" variant="outlined" color="primary" rounded="lg" class="text-none font-weight-bold">
        Regresar al Dashboard
      </v-btn>
      <v-btn to="/contenidos/patrones" color="primary" rounded="lg" class="text-none font-weight-bold">
        Siguiente Pilar: Patrones <v-icon icon="mdi-arrow-right" class="ml-1"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

const isRead = computed(() => {
  return progress.readContents.includes('descomposicion')
})

const markAsRead = () => {
  progress.readContent('descomposicion')
}

const steps = [
  {
    num: '1',
    title: 'Identificar el todo',
    desc: 'Define de forma clara y sin detalles cuál es el gran problema final que deseas resolver.'
  },
  {
    num: '2',
    title: 'Buscar partes lógicas',
    desc: 'Examina qué partes de ese gran problema son independientes y pueden completarse por sí solas.'
  },
  {
    num: '3',
    title: 'Resolver individualmente',
    desc: 'Dedícale tu esfuerzo a programar o solucionar cada subtarea de forma independiente.'
  },
  {
    num: '4',
    title: 'Unir las soluciones',
    desc: 'Integra las soluciones individuales para completar la resolución del problema general.'
  }
]

// Challenge Logic
const selectedOption = ref<number | null>(null)
const feedback = ref('')
const isCorrect = ref(false)
const challengeCompleted = ref(false)

const options = [
  { text: 'A) Decirle al robot: "Prepara cereal rápido". Si no funciona, golpearlo.', correct: false },
  { text: 'B) Dividir el proceso en: 1) Sacar el tazón y la cuchara, 2) Servir cereal y verter leche, 3) Lavar, picar las fresas y agregarlas sobre el cereal.', correct: true },
  { text: 'C) 1) Comprar leche fresca en la finca, 2) Esperar a que crezcan las fresas sembradas en el jardín, 3) Servir todo.', correct: false }
]

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  const chosen = options[selectedOption.value]
  if (chosen.correct) {
    feedback.value = '¡Correcto! Esta descomposición separa el desayuno en pasos lógicos independientes (buscar utensilios, servir ingredientes principales, preparar agregados secundarios).'
    isCorrect.value = true
    challengeCompleted.value = true
    // Award activity progress or read progress
    markAsRead()
  } else {
    feedback.value = 'Respuesta incorrecta. Inténtalo de nuevo. Piensa en qué tareas son realmente independientes y realizables en el momento.'
    isCorrect.value = false
  }
}
</script>

<style scoped>
.border-glow-cyan {
  border-color: rgba(0, 240, 255, 0.35) !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1) !important;
}

.hover-scale {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hover-scale:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 240, 255, 0.35) !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15) !important;
}

.glow-button {
  background: linear-gradient(135deg, #00f0ff 0%, #0072ff 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
}

.glow-button:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.7);
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}
</style>
