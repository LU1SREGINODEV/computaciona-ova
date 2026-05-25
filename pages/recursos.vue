<template>
  <div class="resources-page">
    <!-- Header -->
    <v-row class="py-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-black text-white mb-2">
          Recursos de <span class="text-gradient-cyan">Apoyo</span>
        </h1>
        <p class="text-body-1 text-grey-lighten-1 max-w-600 mx-auto">
          Accede a lecturas, guías y simulaciones interactivas locales diseñadas para complementar tu formación académica en pensamiento lógico.
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
            :model-value="resourcesExploredPercentage"
            rounded
            class="flex-grow-1"
          ></v-progress-linear>
          <div class="d-flex align-center ml-auto">
            <v-chip color="primary" variant="tonal" class="mr-2">
              {{ exploredCount }} de 4 Explorados
            </v-chip>
            <span class="text-body-2 text-white font-weight-bold">{{ resourcesExploredPercentage }}% Completado</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resources Grid -->
    <v-row>
      <v-col cols="12" sm="6" v-for="res in resources" :key="res.id" class="mb-4">
        <v-card class="glass-card h-100 pa-6 d-flex flex-column justify-between">
          <div>
            <div class="d-flex align-center justify-space-between mb-4">
              <v-chip color="primary" variant="outlined" size="small" class="font-weight-bold">
                {{ res.category }}
              </v-chip>
              <v-icon
                :icon="progress.exploredResources.includes(res.id) ? 'mdi-checkbox-marked-circle-outline' : 'mdi-checkbox-blank-circle-outline'"
                :color="progress.exploredResources.includes(res.id) ? 'success' : 'grey-lighten-1'"
              ></v-icon>
            </div>
            
            <h3 class="text-h5 font-weight-bold text-white mb-2">
              <v-icon :icon="res.icon" color="primary" class="mr-2" size="24"></v-icon>
              {{ res.title }}
            </h3>
            
            <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-6">
              {{ res.description }}
            </p>
          </div>

          <div class="d-flex align-center justify-space-between mt-auto flex-wrap gap-2 pt-4 border-top">
            <v-btn
              v-if="res.downloadUrl"
              :href="res.downloadUrl"
              download
              variant="outlined"
              color="primary"
              size="small"
              prepend-icon="mdi-download"
              class="text-none font-weight-bold"
              @click="progress.exploreResource(res.id)"
            >
              Descargar
            </v-btn>
            <span v-else></span>
            
            <v-btn
              color="primary"
              variant="flat"
              size="small"
              class="text-none font-weight-bold"
              @click="openResourceAction(res)"
            >
              {{ res.actionText }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal 1: PDF Preview -->
    <v-dialog v-model="pdfDialog" width="600">
      <v-card class="glass-card pa-6">
        <div class="d-flex align-center mb-4">
          <v-icon icon="mdi-file-pdf-box" color="error" size="36" class="mr-3"></v-icon>
          <h3 class="text-h5 text-white font-weight-bold">Vista Previa: Guía de Algoritmos</h3>
        </div>
        <v-divider class="mb-4 border-opacity-10"></v-divider>
        <div class="cyber-terminal pa-4 text-grey-lighten-2 text-body-2 font-mono" style="max-height: 300px; overflow-y: auto;">
          [DOCUMENTO DE ESTUDIO] <br />
          Tema: Introducción al Pensamiento Computacional de Grado 9° <br />
          Universidad de Córdoba - Licenciatura en Informática <br /><br />
          ------------------------------------------<br />
          CONTENIDO: <br />
          1. Concepto de algoritmos cotidianos.<br />
          2. Símbolos básicos de diagramas de flujo:<br />
          &nbsp;&nbsp; - Óvalo: Inicio y Fin del algoritmo.<br />
          &nbsp;&nbsp; - Rectángulo: Proceso o acción de cálculo.<br />
          &nbsp;&nbsp; - Rombo: Toma de decisión condicional (Si/No).<br />
          &nbsp;&nbsp; - Paralelogramo: Entrada o salida de datos.<br />
          3. Ejercicios propuestos de lógica.<br />
          ------------------------------------------<br /><br />
          Puedes descargar la versión PDF lista para imprimir haciendo clic en "Descargar" en la tarjeta del recurso.
        </div>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" variant="elevated" rounded="lg" @click="pdfDialog = false">Cerrar Vista</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal 2: Infographic SVG -->
    <v-dialog v-model="infoDialog" width="700">
      <v-card class="glass-card pa-6 text-center">
        <h3 class="text-h5 text-white font-weight-bold mb-4">Esquema Resumen: Los 4 Pilares</h3>
        
        <!-- Scalable Inline SVG Infographic -->
        <div class="svg-container py-4 glass-panel mb-4">
          <svg viewBox="0 0 500 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <!-- Central Node -->
            <rect x="180" y="120" width="140" height="50" rx="10" fill="#0b0f19" stroke="#00f0ff" stroke-width="2" />
            <text x="250" y="150" font-family="'Outfit', sans-serif" font-size="12" fill="#00f0ff" font-weight="bold" text-anchor="middle">PENSAMIENTO COMP.</text>
            
            <!-- Nodes Links -->
            <line x1="250" y1="120" x2="100" y2="70" stroke="rgba(0, 240, 255, 0.4)" stroke-dasharray="4" stroke-width="2"/>
            <line x1="250" y1="120" x2="400" y2="70" stroke="rgba(189, 0, 255, 0.4)" stroke-dasharray="4" stroke-width="2"/>
            <line x1="250" y1="170" x2="100" y2="230" stroke="rgba(57, 255, 20, 0.4)" stroke-dasharray="4" stroke-width="2"/>
            <line x1="250" y1="170" x2="400" y2="230" stroke="rgba(0, 210, 255, 0.4)" stroke-dasharray="4" stroke-width="2"/>

            <!-- Node 1: Descomposición -->
            <rect x="20" y="30" width="150" height="40" rx="8" fill="#121826" stroke="#00f0ff" stroke-width="1.5" />
            <text x="95" y="55" font-family="'Outfit', sans-serif" font-size="11" fill="#ffffff" font-weight="bold" text-anchor="middle">1. DESCOMPOSICIÓN</text>
            <text x="95" y="65" font-family="sans-serif" font-size="8" fill="#a5b4fc" text-anchor="middle">Dividir en partes sencillas</text>

            <!-- Node 2: Patrones -->
            <rect x="330" y="30" width="150" height="40" rx="8" fill="#121826" stroke="#bd00ff" stroke-width="1.5" />
            <text x="405" y="55" font-family="'Outfit', sans-serif" font-size="11" fill="#ffffff" font-weight="bold" text-anchor="middle">2. RECONOCIMIENTO PATRONES</text>
            <text x="405" y="65" font-family="sans-serif" font-size="8" fill="#a5b4fc" text-anchor="middle">Buscar similitudes repetidas</text>

            <!-- Node 3: Abstracción -->
            <rect x="20" y="210" width="150" height="40" rx="8" fill="#121826" stroke="#39ff14" stroke-width="1.5" />
            <text x="95" y="235" font-family="'Outfit', sans-serif" font-size="11" fill="#ffffff" font-weight="bold" text-anchor="middle">3. ABSTRACCIÓN</text>
            <text x="95" y="245" font-family="sans-serif" font-size="8" fill="#a5b4fc" text-anchor="middle">Filtrar detalles inútiles</text>

            <!-- Node 4: Algoritmos -->
            <rect x="330" y="210" width="150" height="40" rx="8" fill="#121826" stroke="#00d2ff" stroke-width="1.5" />
            <text x="405" y="235" font-family="'Outfit', sans-serif" font-size="11" fill="#ffffff" font-weight="bold" text-anchor="middle">4. DISEÑO DE ALGORITMOS</text>
            <text x="405" y="245" font-family="sans-serif" font-size="8" fill="#a5b4fc" text-anchor="middle">Instrucciones ordenadas</text>
          </svg>
        </div>
        <p class="text-caption text-grey-lighten-2 mb-4">Unión y flujo sistémico de las 4 fases lógicas del desarrollo computacional.</p>
        <v-card-actions class="justify-end">
          <v-btn color="primary" variant="elevated" rounded="lg" @click="infoDialog = false">Cerrar Esquema</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal 3: History Article -->
    <v-dialog v-model="articleDialog" width="600">
      <v-card class="glass-card pa-6">
        <div class="d-flex align-center mb-4">
          <v-icon icon="mdi-feather" color="secondary" size="36" class="mr-3"></v-icon>
          <h3 class="text-h5 text-white font-weight-bold">Ada Lovelace: La Primera Programadora</h3>
        </div>
        <v-divider class="mb-4 border-opacity-10"></v-divider>
        <div class="text-body-2 text-grey-lighten-2 text-justify" style="max-height: 350px; overflow-y: auto; line-height: 1.8;">
          <p class="mb-3">
            En el siglo XIX, una brillante matemática británica llamada <strong>Ada Lovelace</strong> trabajó codo con codo con Charles Babbage, inventor de la "Máquina Analítica" (un gigantesco computador mecánico de engranajes que nunca llegó a construirse en su totalidad).
          </p>
          <p class="mb-3">
            Ada no solo entendió el funcionamiento de la máquina, sino que vio mucho más allá que su propio inventor. Se dio cuenta de que la máquina podía procesar algo más que números simples. Si se abstraía su funcionamiento, podía representar música, gráficos o letras.
          </p>
          <p class="mb-3">
            En 1843, Ada escribió un conjunto detallado de notas sobre la máquina analítica. En la "Nota G", describió un <strong>algoritmo ordenado paso a paso</strong> para calcular los números de Bernoulli utilizando la máquina. Este es considerado históricamente como el <strong>primer algoritmo de computadora publicado</strong>, convirtiendo a Ada Lovelace en la primera programadora de la historia humana.
          </p>
          <p>
            Ada aplicó la <strong>descomposición</strong> de funciones matemáticas, identificó <strong>patrones</strong> repetitivos de cálculo (lo que hoy llamamos bucles o loops) y usó la <strong>abstracción</strong> para conceptualizar que las máquinas procesan ideas y símbolos, no solo aritmética básica. ¡Un verdadero ejemplo de Pensamiento Computacional!
          </p>
        </div>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" variant="elevated" rounded="lg" @click="articleDialog = false">Cerrar Artículo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal 4: Custom Interactive Video Simulator -->
    <v-dialog v-model="videoDialog" width="650" persistent>
      <v-card class="glass-card pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center">
            <v-icon icon="mdi-video-input-antenna" color="primary" size="32" class="mr-2"></v-icon>
            <h3 class="text-h5 text-white font-weight-bold">Reproductor Interactivo Local</h3>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" color="white" @click="closeVideoSimulator"></v-btn>
        </div>
        
        <!-- Video Screen Simulation -->
        <div class="video-screen mb-4">
          <!-- Playing Screen -->
          <div v-if="isPlaying && !isPausedForQuiz" class="video-content d-flex flex-column align-center justify-center">
            <v-icon size="80" color="primary" class="mb-3 animate-pulse">mdi-video-play</v-icon>
            <span class="text-caption font-mono text-cyan-accent">REPRODUCIENDO ANIMACIÓN EXPLICATIVA: PENSAMIENTO COMP.</span>
            <span class="text-caption text-grey mt-1">Tiempo: 00:0{{ Math.floor(videoTime) }} / 00:15</span>
          </div>

          <!-- Paused Screen -->
          <div v-else-if="!isPlaying && !isPausedForQuiz" class="video-content d-flex flex-column align-center justify-center">
            <v-icon size="80" color="grey" class="mb-3">mdi-play-circle-outline</v-icon>
            <span class="text-body-2 font-weight-bold text-white">Video Listo para Comenzar</span>
            <v-btn color="primary" class="mt-4 px-6 text-black font-weight-bold" rounded="xl" @click="startVideo">Reproducir Simulación</v-btn>
          </div>

          <!-- Pause Quiz 1 (Time = 5s) -->
          <div v-else-if="isPausedForQuiz && quizStep === 1" class="quiz-overlay pa-6 d-flex flex-column justify-center align-center text-center">
            <v-icon size="40" color="accent" class="mb-2 float-animation">mdi-help-circle-outline</v-icon>
            <div class="text-body-1 font-weight-bold text-white mb-3">Pregunta Interactiva (Minuto 0:05)</div>
            <p class="text-body-2 text-grey-lighten-2 mb-4">¿Cuál de los pilares sirve para desechar información innecesaria y simplificar el problema?</p>
            
            <div class="d-flex flex-column gap-2 w-100 px-4">
              <v-btn color="surface" block rounded="lg" size="small" class="text-none font-weight-bold" @click="answerQuiz(1, 'incorrect')">Descomposición</v-btn>
              <v-btn color="surface" block rounded="lg" size="small" class="text-none font-weight-bold" @click="answerQuiz(1, 'correct')">Abstracción</v-btn>
            </div>
            <div v-if="quizFeedback" class="text-caption text-error font-weight-bold mt-2">{{ quizFeedback }}</div>
          </div>

          <!-- Pause Quiz 2 (Time = 12s) -->
          <div v-else-if="isPausedForQuiz && quizStep === 2" class="quiz-overlay pa-6 d-flex flex-column justify-center align-center text-center">
            <v-icon size="40" color="accent" class="mb-2 float-animation">mdi-help-circle-outline</v-icon>
            <div class="text-body-1 font-weight-bold text-white mb-3">Pregunta Interactiva (Minuto 0:12)</div>
            <p class="text-body-2 text-grey-lighten-2 mb-4">¿Qué es un algoritmo en términos sencillos?</p>
            
            <div class="d-flex flex-column gap-2 w-100 px-4">
              <v-btn color="surface" block rounded="lg" size="small" class="text-none font-weight-bold" @click="answerQuiz(2, 'correct')">Una serie de pasos ordenados para resolver un problema</v-btn>
              <v-btn color="surface" block rounded="lg" size="small" class="text-none font-weight-bold" @click="answerQuiz(2, 'incorrect')">Un virus informático destructivo</v-btn>
            </div>
            <div v-if="quizFeedback" class="text-caption text-error font-weight-bold mt-2">{{ quizFeedback }}</div>
          </div>

          <!-- Video Completed Screen -->
          <div v-else-if="videoCompleted" class="video-content d-flex flex-column align-center justify-center text-center pa-4">
            <v-icon size="80" color="success" class="mb-3 float-animation">mdi-check-decagram</v-icon>
            <span class="text-h6 font-weight-bold text-white">¡Video Simulado Completado!</span>
            <span class="text-body-2 text-grey-lighten-2 mt-2">Has respondido correctamente a todas las pausas de aprendizaje.</span>
            <v-btn color="primary" class="mt-4 px-6 text-black font-weight-bold" rounded="xl" @click="restartVideo">Ver de nuevo</v-btn>
          </div>
        </div>

        <!-- Video Player Controls -->
        <div class="d-flex align-center gap-3">
          <v-btn
            :icon="isPlaying && !isPausedForQuiz ? 'mdi-pause' : 'mdi-play'"
            variant="text"
            color="white"
            :disabled="isPausedForQuiz || videoCompleted"
            @click="togglePlay"
          ></v-btn>
          
          <v-progress-linear
            color="primary"
            height="6"
            :model-value="(videoTime / 15) * 100"
            rounded
            class="flex-grow-1"
          ></v-progress-linear>
          
          <span class="text-caption font-mono text-white">0:{{ Math.round(videoTime).toString().padStart(2, '0') }} / 0:15</span>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

// Dialog states
const pdfDialog = ref(false)
const infoDialog = ref(false)
const articleDialog = ref(false)
const videoDialog = ref(false)

// Video simulator states
const isPlaying = ref(false)
const videoTime = ref(0)
const isPausedForQuiz = ref(false)
const quizStep = ref(0)
const quizFeedback = ref('')
const videoCompleted = ref(false)
let timerInterval: any = null

const exploredCount = computed(() => {
  return progress.exploredResources.length
})

const resourcesExploredPercentage = computed(() => {
  return Math.round((exploredCount.value / 4) * 100)
})

const openResourceAction = (res: any) => {
  progress.exploreResource(res.id)
  
  if (res.id === 'pdf') pdfDialog.value = true
  if (res.id === 'infografia') infoDialog.value = true
  if (res.id === 'articulo') articleDialog.value = true
  if (res.id === 'video') {
    videoDialog.value = true
    resetVideoState()
  }
}

// Video simulation logic
const resetVideoState = () => {
  isPlaying.value = false
  videoTime.value = 0
  isPausedForQuiz.value = false
  quizStep.value = 0
  quizFeedback.value = ''
  videoCompleted.value = false
  clearInterval(timerInterval)
}

const closeVideoSimulator = () => {
  videoDialog.value = false
  resetVideoState()
}

const startVideo = () => {
  isPlaying.value = true
  videoCompleted.value = false
  startTimer()
}

const togglePlay = () => {
  if (isPlaying.value) {
    isPlaying.value = false
    clearInterval(timerInterval)
  } else {
    isPlaying.value = true
    startTimer()
  }
}

const startTimer = () => {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (isPlaying.value && !isPausedForQuiz.value) {
      videoTime.value += 0.2
      
      // Quiz 1 Pause at 5 seconds
      if (videoTime.value >= 5.0 && quizStep.value < 1) {
        isPlaying.value = false
        isPausedForQuiz.value = true
        quizStep.value = 1
        quizFeedback.value = ''
        clearInterval(timerInterval)
      }
      
      // Quiz 2 Pause at 12 seconds
      if (videoTime.value >= 12.0 && quizStep.value < 2) {
        isPlaying.value = false
        isPausedForQuiz.value = true
        quizStep.value = 2
        quizFeedback.value = ''
        clearInterval(timerInterval)
      }

      // Completed
      if (videoTime.value >= 15.0) {
        isPlaying.value = false
        videoCompleted.value = true
        clearInterval(timerInterval)
      }
    }
  }, 200)
}

const answerQuiz = (step: number, status: 'correct' | 'incorrect') => {
  if (status === 'correct') {
    isPausedForQuiz.value = false
    isPlaying.value = true
    quizFeedback.value = ''
    startTimer()
  } else {
    quizFeedback.value = '¡Ups! Esa no es la respuesta correcta. Inténtalo de nuevo.'
  }
}

const restartVideo = () => {
  resetVideoState()
  startVideo()
}

const resources = [
  {
    id: 'pdf',
    title: 'Guía de Algoritmos y Diagramas de Flujo',
    category: 'LECTURA / PDF',
    icon: 'mdi-file-pdf-box',
    description: 'Documento PDF local estructurado con explicaciones gráficas sobre los símbolos de los diagramas de flujo y ejercicios cotidianos.',
    downloadUrl: '/pdfs/guia_algoritmos.pdf',
    actionText: 'Vista Previa'
  },
  {
    id: 'infografia',
    title: 'Esquema de los 4 Pilares Lógicos',
    category: 'VISUAL / INFOGRAFÍA',
    icon: 'mdi-chart-bubble',
    description: 'Mapa mental interactivo que resume y vincula los procesos secuenciales de Descomposición, Patrones, Abstracción y Algoritmos.',
    downloadUrl: '',
    actionText: 'Ver Infografía'
  },
  {
    id: 'articulo',
    title: 'Lectura Histórica: Ada Lovelace',
    category: 'LECTURA / HISTORIA',
    icon: 'mdi-book-open-page-variant',
    description: 'Breve artículo de estudio sobre cómo una mujer del siglo XIX estructuró el primer algoritmo informático de la historia humana.',
    downloadUrl: '',
    actionText: 'Leer Artículo'
  },
  {
    id: 'video',
    title: 'Simulación: Pensamiento en 2 Minutos',
    category: 'SIMULADOR / VIDEO',
    icon: 'mdi-video-input-antenna',
    description: 'Video simulado interactivo que pondrá a prueba tus conocimientos en momentos clave antes de poder finalizar la reproducción.',
    downloadUrl: '',
    actionText: 'Iniciar Simulador'
  }
]
</script>

<style scoped>
.max-w-600 {
  max-width: 600px;
}

.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.svg-container {
  background-color: #030712;
  border-radius: 12px;
  border: 1px solid rgba(0, 240, 255, 0.1);
}

/* Simulated video screen styling */
.video-screen {
  width: 100%;
  height: 320px;
  background-color: #020408;
  border-radius: 16px;
  border: 2px solid rgba(0, 240, 255, 0.2);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}

.video-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 10, 19, 0.95);
  z-index: 10;
}

.cyan-accent {
  color: #00f0ff;
  letter-spacing: 1px;
}

.animate-pulse {
  animation: pulse-icon 1.5s infinite ease-in-out;
}

@keyframes pulse-icon {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}
</style>
