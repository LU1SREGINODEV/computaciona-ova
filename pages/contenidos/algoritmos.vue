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
            <v-icon icon="mdi-arrow-decision-auto" color="white" size="26"></v-icon>
          </v-avatar>
          <span class="text-caption text-primary font-weight-bold tracking-wider uppercase">Pilar 04 de Pensamiento Computacional</span>
        </div>
        <h1 class="text-h3 font-weight-black text-white mb-2">Diseño de Algoritmos</h1>
        <p class="text-h6 text-gradient-cyan font-weight-medium">El paso a paso lógico</p>
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
          <h2 class="text-h5 text-white font-weight-bold mb-4">¿Qué es un Algoritmo?</h2>
          <p class="text-body-1 text-grey-lighten-2 mb-4" style="line-height: 1.8;">
            Una computadora es como un robot extremadamente veloz pero increíblemente despistado. No sabe hacer nada por sí misma. Tienes que decirle exactamente qué hacer, en qué orden exacto y qué decidir en cada situación.
          </p>
          <p class="text-body-1 text-grey-lighten-2" style="line-height: 1.8;">
            Un **algoritmo** es una lista ordenada de instrucciones, pasos lógicos y precisos que se diseñan para completar una tarea o solucionar un problema. Los algoritmos deben tener un **inicio** claro, un **final** exitoso y no deben dejar espacio a las dudas.
          </p>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-card class="glass-card pa-6 h-100 border-glow-cyan position-relative overflow-hidden">
          <h2 class="text-h5 text-primary font-weight-bold mb-4">Conceptos Clave de Control</h2>
          <div class="d-flex flex-column gap-3">
            <div class="glass-panel pa-3">
              <strong class="text-white">Secuencia:</strong> Ejecutar los pasos uno tras otro en orden descendente.
            </div>
            <div class="glass-panel pa-3">
              <strong class="text-white">Condición (Si... Entonces):</strong> Tomar una decisión lógica según las circunstancias (ej: SI llueve, usar paraguas).
            </div>
            <div class="glass-panel pa-3">
              <strong class="text-white">Bucle (Repetir):</strong> Ejecutar el mismo paso varias veces seguidas hasta cumplir un objetivo (ej: mezclar 10 veces).
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visual Stepper -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold text-white">¿Cómo diseñar un algoritmo exitoso?</h2>
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
            Mini-Reto Lógico: Interpretación de Código Condicional
          </h2>
          <p class="text-body-1 text-grey-lighten-2 mb-6">
            Analiza el siguiente pseudocódigo diseñado para controlar la temperatura de un invernadero automatizado:
          </p>
          
          <pre class="cyber-terminal pa-4 text-accent text-body-2 mb-6">
INICIO
  TemperaturaActual = 32
  SI TemperaturaActual > 30 ENTONCES
    Encender_Ventiladores()
    Imprimir("Alerta: Calor detectado")
  SINO
    Apagar_Ventiladores()
    Imprimir("Temperatura ideal")
  FIN SI
FIN</pre>
          
          <p class="text-body-1 text-grey-lighten-2 mb-4">
            Dado que la <strong>TemperaturaActual es de 32 grados</strong>, ¿cuál será la salida o acción final del invernadero?
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
              Procesar Algoritmo
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
      <v-btn to="/contenidos/abstraccion" variant="outlined" color="primary" rounded="lg" class="text-none font-weight-bold">
        <v-icon icon="mdi-arrow-left" class="mr-1"></v-icon> Anterior: Abstracción
      </v-btn>
      <v-btn to="/recursos" color="primary" rounded="lg" class="text-none font-weight-bold">
        Explorar Recursos de Apoyo <v-icon icon="mdi-arrow-right" class="ml-1"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

const isRead = computed(() => {
  return progress.readContents.includes('algoritmos')
})

const markAsRead = () => {
  progress.readContent('algoritmos')
}

const steps = [
  {
    num: '1',
    title: 'Definir el objetivo',
    desc: 'Describe el estado inicial (datos de entrada) y el estado final esperado (datos de salida).'
  },
  {
    num: '2',
    title: 'Describir los pasos',
    desc: 'Ordena de forma cronológica y numerada cada acción necesaria para transformar la entrada.'
  },
  {
    num: '3',
    title: 'Agregar controles',
    desc: 'Inserta condiciones (SI...) y repeticiones (REPETIR...) para dar inteligencia al flujo.'
  },
  {
    num: '4',
    title: 'Hacer pruebas (Debug)',
    desc: 'Simula el comportamiento a mano con datos de prueba para corregir posibles errores de lógica.'
  }
]

// Challenge Logic
const selectedOption = ref<number | null>(null)
const feedback = ref('')
const isCorrect = ref(false)
const challengeCompleted = ref(false)

const options = [
  { text: 'A) Se apagarán los ventiladores e imprimirá "Temperatura ideal".', correct: false },
  { text: 'B) Se encenderán los ventiladores e imprimirá "Alerta: Calor detectado".', correct: true },
  { text: 'C) El sistema se bloqueará por exceso de calor y entrará en bucle.', correct: false }
]

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  const chosen = options[selectedOption.value]
  if (chosen.correct) {
    feedback.value = '¡Correcto! Dado que 32 es mayor que 30 (32 > 30 es Verdadero), el algoritmo toma el camino del "SI" (ENTONCES) y ejecuta el encendido de ventiladores junto con la impresión de alerta.'
    isCorrect.value = true
    challengeCompleted.value = true
    markAsRead()
  } else {
    feedback.value = 'Incorrecto. Evalúa matemáticamente la condición: ¿32 es mayor que 30? Si se cumple, ejecuta la parte del "SI". Si no, la del "SINO". ¡Inténtalo de nuevo!'
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

.cyber-terminal {
  background-color: #030712 !important;
  border: 1px solid rgba(0, 240, 255, 0.2) !important;
  border-radius: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}
</style>
