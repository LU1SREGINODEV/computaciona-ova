<template>
  <div class="content-detail-page">
    <!-- Navigation Back -->
    <div class="mb-6">
      <v-btn
        to="/contenidos"
        variant="text"
        color="accent"
        prepend-icon="mdi-arrow-left"
        class="text-none font-weight-bold text-accent"
      >
        Volver a Contenidos
      </v-btn>
    </div>

    <!-- Hero Section -->
    <v-row class="mb-8 align-center">
      <v-col cols="12" md="8">
        <div class="d-flex align-center gap-3 mb-2">
          <v-avatar color="accent" size="48" class="text-black">
            <v-icon icon="mdi-filter-variant" color="black" size="26"></v-icon>
          </v-avatar>
          <span class="text-caption text-accent font-weight-bold tracking-wider uppercase">Pilar 03 de Pensamiento Computacional</span>
        </div>
        <h1 class="text-h3 font-weight-black text-white mb-2">Abstracción</h1>
        <p class="text-h6 text-gradient-green font-weight-medium">Filtrar lo innecesario</p>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-btn
          v-if="!isRead"
          color="accent"
          size="large"
          prepend-icon="mdi-book-open-page-variant"
          class="glow-button px-6 font-weight-bold text-black"
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
          <h2 class="text-h5 text-white font-weight-bold mb-4">¿Qué es la Abstracción?</h2>
          <p class="text-body-1 text-grey-lighten-2 mb-4" style="line-height: 1.8;">
            Cuando envías un mensaje de texto con un emoji de carita feliz 😃, no envías una foto real de tu cara, ni detallas si tienes pecas, pestañas largas, o el color exacto de tus ojos. Envías un círculo amarillo con dos puntos y una curva. Todo el mundo entiende que estás feliz.
          </p>
          <p class="text-body-1 text-grey-lighten-2" style="line-height: 1.8;">
            Eso es la **abstracción**: consiste en ignorar activamente todos los detalles secundarios, irrelevantes o complejos de un problema, para centrarte únicamente en las características que son verdaderamente esenciales para resolverlo. Nos permite crear modelos simplificados para pensar con mayor claridad.
          </p>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-card class="glass-card-green pa-6 h-100 border-glow-green position-relative overflow-hidden">
          <h2 class="text-h5 text-accent font-weight-bold mb-4">Ejemplo en la Vida Real</h2>
          <div class="text-subtitle-1 text-white font-weight-bold mb-2">El Mapa del Metro de la Ciudad</div>
          <p class="text-body-2 text-grey-lighten-2 mb-4">
            Un mapa de transporte público utiliza la abstracción al máximo:
          </p>
          <ul class="text-body-2 text-grey-lighten-2 pl-4 d-flex flex-column gap-2">
            <li><strong class="text-accent">Ignora:</strong> El tráfico de las calles, la ubicación de las casas, los árboles de los parques y las curvas reales del terreno.</li>
            <li><strong class="text-white">Conserva:</strong> Los nombres de las estaciones y las líneas de conexión.</li>
            <li><strong class="text-white">Resultado:</strong> Una guía súper útil que cualquiera puede entender en 5 segundos.</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visual Stepper -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold text-white">¿Cómo abstraer un problema?</h2>
      </v-col>
      
      <v-col cols="12" md="3" v-for="step in steps" :key="step.num">
        <v-card class="glass-panel pa-6 text-center h-100 hover-scale-green">
          <v-avatar color="accent" size="48" class="mb-4 font-weight-black text-black elevation-4 text-h6">
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
        <v-card class="glass-card-green pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-4">
            <v-icon icon="mdi-lightbulb-on-outline" color="accent" class="mr-2"></v-icon>
            Mini-Reto Lógico: Abstrayendo un Teléfono Celular
          </h2>
          <p class="text-body-1 text-grey-lighten-2 mb-6">
            Deseas registrar un celular en una base de datos para una tienda virtual. ¿Cuáles de los siguientes datos son los **esenciales (abstraídos)** para vender el celular y cuáles deberías ignorar?
          </p>
          
          <v-radio-group v-model="selectedOption" class="custom-radio-group" :disabled="challengeCompleted">
            <v-radio
              v-for="(option, idx) in options"
              :key="idx"
              :value="idx"
              color="accent"
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
              Filtrar Detalles
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
      <v-btn to="/contenidos/patrones" variant="outlined" color="accent" rounded="lg" class="text-none font-weight-bold text-accent">
        <v-icon icon="mdi-arrow-left" class="mr-1"></v-icon> Anterior: Patrones
      </v-btn>
      <v-btn to="/contenidos/algoritmos" color="accent" rounded="lg" class="text-none font-weight-bold text-black">
        Siguiente Pilar: Algoritmos <v-icon icon="mdi-arrow-right" class="ml-1"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

const isRead = computed(() => {
  return progress.readContents.includes('abstraccion')
})

const markAsRead = () => {
  progress.readContent('abstraccion')
}

const steps = [
  {
    num: '1',
    title: 'Listar características',
    desc: 'Escribe todos los detalles que componen el problema o el objeto de estudio en su totalidad.'
  },
  {
    num: '2',
    title: 'Filtrar lo secundario',
    desc: 'Determina si quitar un dato afecta o no el resultado final. Si no lo afecta, descártalo.'
  },
  {
    num: '3',
    title: 'Quedarse con lo esencial',
    desc: 'Retén únicamente las variables núcleo que describen y controlan el problema.'
  },
  {
    num: '4',
    title: 'Crear el modelo',
    desc: 'Dibuja, escribe o esquematiza el problema simplificado listo para ser resuelto.'
  }
]

// Challenge Logic
const selectedOption = ref<number | null>(null)
const feedback = ref('')
const isCorrect = ref(false)
const challengeCompleted = ref(false)

const options = [
  { text: 'A) Marca, Capacidad de almacenamiento, Color exterior, y Precio.', correct: true },
  { text: 'B) Huellas dactilares del dueño anterior, Suciedad en el conector del cargador, Fondo de pantalla elegido.', correct: false },
  { text: 'C) Lista de contactos del comprador, Historial de llamadas del desarrollador, Temperatura de la fábrica.', correct: false }
]

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  const chosen = options[selectedOption.value]
  if (chosen.correct) {
    feedback.value = '¡Excelente! Estos son los datos esenciales que definen comercialmente al producto para la venta. Datos como las huellas del dueño anterior o el fondo de pantalla son irrelevantes y cambian constantemente.'
    isCorrect.value = true
    challengeCompleted.value = true
    markAsRead()
  } else {
    feedback.value = 'Incorrecto. Esos datos son detalles temporales o privados que no definen al modelo del celular comercialmente. ¡Inténtalo de nuevo!'
    isCorrect.value = false
  }
}
</script>

<style scoped>
.border-glow-green {
  border-color: rgba(57, 255, 20, 0.35) !important;
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.1) !important;
}

.hover-scale-green {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hover-scale-green:hover {
  transform: translateY(-4px);
  border-color: rgba(57, 255, 20, 0.4) !important;
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.15) !important;
}

.glow-button {
  background: linear-gradient(135deg, #39ff14 0%, #10b981 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
}

.glow-button:hover {
  box-shadow: 0 0 25px rgba(57, 255, 20, 0.7);
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}
</style>
