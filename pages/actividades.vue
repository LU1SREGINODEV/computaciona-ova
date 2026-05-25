<template>
  <div class="activities-page">
    <!-- Header -->
    <v-row class="py-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-black text-white mb-2">
          Actividades <span class="text-gradient-cyan">Interactivas</span>
        </h1>
        <p class="text-body-1 text-grey-lighten-1 max-w-600 mx-auto">
          Pon a prueba tus habilidades de lógica resolviendo estos retos gamificados. Cada actividad que resuelvas aumentará tu progreso en un 10%.
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
            :model-value="activitiesCompletedPercentage"
            rounded
            class="flex-grow-1"
          ></v-progress-linear>
          <div class="d-flex align-center ml-auto">
            <v-chip color="primary" variant="tonal" class="mr-2">
              {{ completedCount }} de 4 Resueltas
            </v-chip>
            <span class="text-body-2 text-white font-weight-bold">{{ activitiesCompletedPercentage }}% Completado</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Navigation Tabs -->
    <v-card class="glass-panel mb-8">
      <v-tabs
        v-model="tab"
        color="primary"
        align-tabs="center"
        grow
        stacked
      >
        <v-tab value="act1" class="text-none font-weight-bold py-3 text-white">
          <v-icon icon="mdi-sort" class="mb-1" :color="isCompleted('act1') ? 'success' : 'primary'"></v-icon>
          Act 1: Ordenar Pasos
          <v-icon v-if="isCompleted('act1')" icon="mdi-check-circle" color="success" size="14" class="ml-1"></v-icon>
        </v-tab>
        <v-tab value="act2" class="text-none font-weight-bold py-3 text-white">
          <v-icon icon="mdi-form-select" class="mb-1" :color="isCompleted('act2') ? 'success' : 'secondary'"></v-icon>
          Act 2: Completar Frases
          <v-icon v-if="isCompleted('act2')" icon="mdi-check-circle" color="success" size="14" class="ml-1"></v-icon>
        </v-tab>
        <v-tab value="act3" class="text-none font-weight-bold py-3 text-white">
          <v-icon icon="mdi-swap-horizontal" class="mb-1" :color="isCompleted('act3') ? 'success' : 'accent'"></v-icon>
          Act 3: Relacionar Pilares
          <v-icon v-if="isCompleted('act3')" icon="mdi-check-circle" color="success" size="14" class="ml-1"></v-icon>
        </v-tab>
        <v-tab value="act4" class="text-none font-weight-bold py-3 text-white">
          <v-icon icon="mdi-robot-vacuum" class="mb-1" :color="isCompleted('act4') ? 'success' : 'info'"></v-icon>
          Act 4: Laberinto Robot
          <v-icon v-if="isCompleted('act4')" icon="mdi-check-circle" color="success" size="14" class="ml-1"></v-icon>
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- Tab Contents -->
    <v-window v-model="tab">
      
      <!-- Actividad 1: Ordenar Algoritmo -->
      <v-window-item value="act1">
        <v-card class="glass-card pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-2">Actividad 1: El Algoritmo Correcto</h2>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Ordena de forma correcta el algoritmo para <strong>lavarse las manos</strong> utilizando los botones de subir <v-icon icon="mdi-arrow-up"></v-icon> y bajar <v-icon icon="mdi-arrow-down"></v-icon> en cada tarjeta. ¡Piensa en la secuencia lógica lógica!
          </p>

          <div class="d-flex flex-column gap-3 mb-6 max-w-600 mx-auto">
            <v-card 
              v-for="(item, idx) in orderList" 
              :key="item.id" 
              class="glass-panel px-4 py-3 d-flex align-center justify-space-between border-glow-cyan"
            >
              <div class="d-flex align-center">
                <v-avatar color="primary" size="32" class="mr-3 text-caption font-weight-bold text-white">
                  {{ idx + 1 }}
                </v-avatar>
                <span class="text-body-2 text-white">{{ item.text }}</span>
              </div>
              <div class="d-flex gap-1">
                <v-btn 
                  icon="mdi-arrow-up" 
                  variant="text" 
                  size="small" 
                  color="white" 
                  :disabled="idx === 0" 
                  @click="moveItem(idx, -1)"
                ></v-btn>
                <v-btn 
                  icon="mdi-arrow-down" 
                  variant="text" 
                  size="small" 
                  color="white" 
                  :disabled="idx === orderList.length - 1" 
                  @click="moveItem(idx, 1)"
                ></v-btn>
              </div>
            </v-card>
          </div>

          <div class="text-center">
            <v-btn 
              color="primary" 
              class="glow-button px-8 py-3 font-weight-bold" 
              rounded="xl" 
              @click="checkAct1"
            >
              Verificar Orden
            </v-btn>
            <div v-if="feedback1" :class="['text-body-1 font-weight-bold mt-4', isCorrect1 ? 'text-accent' : 'text-error']">
              {{ feedback1 }}
            </div>
          </div>
        </v-card>
      </v-window-item>

      <!-- Actividad 2: Completar Frases -->
      <v-window-item value="act2">
        <v-card class="glass-card pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-2">Actividad 2: Sintaxis de Lógica</h2>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Selecciona las palabras correctas en los desplegables para completar de forma precisa el significado de las definiciones.
          </p>

          <div class="glass-panel pa-6 max-w-600 mx-auto mb-6 text-body-1 text-grey-lighten-2 leading-loose">
            La 
            <select v-model="fillAns1" class="custom-select mx-2">
              <option value="">...</option>
              <option value="descomposicion">descomposición</option>
              <option value="abstraccion">abstracción</option>
              <option value="algoritmos">algoritmos</option>
            </select> 
            consiste en ignorar los detalles irrelevantes de un problema para enfocarse en lo esencial. 
            Por otro lado, el diseño de 
            <select v-model="fillAns2" class="custom-select mx-2">
              <option value="">...</option>
              <option value="computacion">computación</option>
              <option value="patrones">patrones</option>
              <option value="algoritmos">algoritmos</option>
            </select> 
            nos permite formular una secuencia de instrucciones lógicas paso a paso para resolverlo. 
            Finalmente, al buscar regularidades y similitudes repetitivas entre problemas aplicamos el reconocimiento de 
            <select v-model="fillAns3" class="custom-select mx-2">
              <option value="">...</option>
              <option value="patrones">patrones</option>
              <option value="errores">errores</option>
              <option value="codigos">códigos</option>
            </select>.
          </div>

          <div class="text-center">
            <v-btn 
              color="secondary" 
              class="glow-button-purple px-8 py-3 font-weight-bold" 
              rounded="xl" 
              @click="checkAct2"
            >
              Comprobar Frases
            </v-btn>
            <div v-if="feedback2" :class="['text-body-1 font-weight-bold mt-4', isCorrect2 ? 'text-accent' : 'text-error']">
              {{ feedback2 }}
            </div>
          </div>
        </v-card>
      </v-window-item>

      <!-- Actividad 3: Relacionar Pilares -->
      <v-window-item value="act3">
        <v-card class="glass-card pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-2">Actividad 3: Conectar Conceptos</h2>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Haz clic en un Pilar de la columna izquierda y luego haz clic en su Ejemplo correcto de la columna derecha para emparejarlos.
          </p>

          <v-row class="max-w-800 mx-auto mb-6">
            <!-- Left Column: Pillars -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-3">
              <h3 class="text-subtitle-1 font-weight-bold text-primary text-center">Pilares</h3>
              <v-btn
                v-for="p in matchLeft"
                :key="p.id"
                block
                :variant="selectedLeft === p.id ? 'elevated' : 'outlined'"
                :color="isMatched(p.id) ? 'success' : selectedLeft === p.id ? 'primary' : 'white'"
                :disabled="isMatched(p.id)"
                class="text-none justify-start px-4 py-6"
                rounded="lg"
                @click="selectLeft(p.id)"
              >
                <v-icon :icon="p.icon" class="mr-2" size="20"></v-icon>
                {{ p.title }}
                <v-spacer></v-spacer>
                <v-icon v-if="isMatched(p.id)" icon="mdi-check-circle" color="success"></v-icon>
              </v-btn>
            </v-col>

            <!-- Right Column: Examples -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-3">
              <h3 class="text-subtitle-1 font-weight-bold text-accent text-center">Ejemplos Prácticos</h3>
              <v-btn
                v-for="e in matchRight"
                :key="e.id"
                block
                :variant="selectedRight === e.id ? 'elevated' : 'outlined'"
                :color="isMatched(getLeftIdFromExample(e.id)) ? 'success' : selectedRight === e.id ? 'accent' : 'white'"
                :disabled="isMatched(getLeftIdFromExample(e.id))"
                class="text-none justify-start text-left px-4 py-6 h-auto"
                style="white-space: normal;"
                rounded="lg"
                @click="selectRight(e.id)"
              >
                {{ e.text }}
                <v-spacer></v-spacer>
                <v-icon v-if="isMatched(getLeftIdFromExample(e.id))" icon="mdi-check-circle" color="success"></v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn 
              variant="outlined" 
              color="white" 
              class="px-6 mr-2 font-weight-bold text-none"
              rounded="xl"
              @click="resetAct3"
            >
              Reiniciar Conexiones
            </v-btn>
            <div v-if="feedback3" class="text-body-1 text-accent font-weight-bold mt-4">
              {{ feedback3 }}
            </div>
          </div>
        </v-card>
      </v-window-item>

      <!-- Actividad 4: Código del Laberinto -->
      <v-window-item value="act4">
        <v-card class="glass-card pa-6">
          <h2 class="text-h5 text-white font-weight-bold mb-2">Actividad 4: Laberinto Lógico de Robot</h2>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Escribe el algoritmo para guiar al astronauta robot 🤖 hasta la nave espacial 🚀. Agrega comandos en cola, revisa el flujo lógico y haz clic en <strong>Ejecutar Algoritmo</strong>. ¡Evita chocar contra las murallas rojas 🟥!
          </p>

          <v-row class="align-center justify-center">
            <!-- Grid Representation -->
            <v-col cols="12" md="6" class="d-flex justify-center">
              <div class="maze-grid">
                <div 
                  v-for="row in 5" 
                  :key="row" 
                  class="maze-row"
                >
                  <div 
                    v-for="col in 5" 
                    :key="col" 
                    :class="['maze-cell', getCellClass(row - 1, col - 1)]"
                  >
                    <!-- Robot Avatar -->
                    <div v-if="robotX === col - 1 && robotY === row - 1" class="robot-element">
                      <span :style="{ transform: `rotate(${robotRotation}deg)`, display: 'inline-block' }">🤖</span>
                    </div>
                    <!-- Target Spacecraft -->
                    <span v-else-if="targetX === col - 1 && targetY === row - 1" class="target-element">🚀</span>
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Command block controllers -->
            <v-col cols="12" md="6">
              <v-card class="glass-panel pa-4 mb-4">
                <h3 class="text-subtitle-1 font-weight-bold text-white mb-3">Comandos Disponibles</h3>
                <div class="d-flex gap-2 flex-wrap">
                  <v-btn color="primary" variant="flat" size="small" class="text-none font-weight-bold" rounded="lg" prepend-icon="mdi-arrow-up-bold" @click="addCommand('avanzar')">Avanzar</v-btn>
                  <v-btn color="secondary" variant="flat" size="small" class="text-none font-weight-bold" rounded="lg" prepend-icon="mdi-rotate-left" @click="addCommand('izquierda')">Girar Izq</v-btn>
                  <v-btn color="secondary" variant="flat" size="small" class="text-none font-weight-bold" rounded="lg" prepend-icon="mdi-rotate-right" @click="addCommand('derecha')">Girar Der</v-btn>
                </div>
              </v-card>

              <v-card class="glass-panel pa-4 h-220 d-flex flex-column justify-between">
                <div>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <h3 class="text-subtitle-1 font-weight-bold text-white">Algoritmo en Cola (Máx 10)</h3>
                    <v-btn size="x-small" variant="text" color="error" class="text-none" @click="clearCommands">Vaciar</v-btn>
                  </div>
                  
                  <div class="d-flex flex-wrap gap-2 py-2 overflow-y-auto max-h-120">
                    <v-chip
                      v-for="(cmd, index) in commandsQueue"
                      :key="index"
                      color="primary"
                      variant="elevated"
                      closable
                      size="small"
                      @click:close="removeCommandAt(index)"
                    >
                      {{ index + 1 }}. {{ getCommandLabel(cmd) }}
                    </v-chip>
                    <span v-if="commandsQueue.length === 0" class="text-caption text-grey-lighten-2">Cola vacía. Selecciona comandos arriba...</span>
                  </div>
                </div>

                <div class="d-flex gap-2 mt-4">
                  <v-btn 
                    color="accent" 
                    block 
                    class="font-weight-bold text-black" 
                    rounded="lg"
                    :disabled="commandsQueue.length === 0 || isRunningSimulation"
                    @click="runSimulation"
                  >
                    <v-icon icon="mdi-play" class="mr-1"></v-icon> Ejecutar Algoritmo
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <div class="text-center mt-6">
            <div v-if="feedback4" :class="['text-body-1 font-weight-bold', isCorrect4 ? 'text-accent' : 'text-error']">
              {{ feedback4 }}
            </div>
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

const tab = ref('act1')

const isCompleted = (id: string) => {
  return progress.completedActivities.includes(id)
}

const completedCount = computed(() => {
  return progress.completedActivities.length
})

const activitiesCompletedPercentage = computed(() => {
  return Math.round((completedCount.value / 4) * 100)
})

// ==========================================
// ACTIVIDAD 1: ORDENAR PASOS
// ==========================================
const orderList = ref([
  { id: '3', text: 'Aplicar jabón en las palmas y frotar entre los dedos.' },
  { id: '1', text: 'Abrir el grifo de agua para mojarse las manos.' },
  { id: '5', text: 'Cerrar el grifo con la toalla para evitar contaminarse.' },
  { id: '2', text: 'Depositar una cantidad suficiente de jabón líquido.' },
  { id: '4', text: 'Enjuagar las manos con agua limpia y secarlas con una toalla desechable.' }
])

const correctOrder = ['1', '2', '3', '4', '5']

const feedback1 = ref('')
const isCorrect1 = ref(false)

const moveItem = (idx: number, direction: number) => {
  const targetIdx = idx + direction
  if (targetIdx < 0 || targetIdx >= orderList.value.length) return
  
  const temp = orderList.value[idx]
  orderList.value[idx] = orderList.value[targetIdx]
  orderList.value[targetIdx] = temp
}

const checkAct1 = () => {
  const userOrder = orderList.value.map(item => item.id)
  const isMatch = JSON.stringify(userOrder) === JSON.stringify(correctOrder)
  
  if (isMatch) {
    feedback1.value = '¡Excelente! Has ordenado el algoritmo del lavado de manos de forma perfecta y lógica (+10%).'
    isCorrect1.value = true
    progress.completeActivity('act1')
  } else {
    feedback1.value = 'El orden actual no es óptimo. Piensa en la secuencia física: no puedes frotarte el jabón si no te has mojado o depositado jabón primero. ¡Inténtalo de nuevo!'
    isCorrect1.value = false
  }
}

// ==========================================
// ACTIVIDAD 2: COMPLETAR FRASES
// ==========================================
const fillAns1 = ref('')
const fillAns2 = ref('')
const fillAns3 = ref('')

const feedback2 = ref('')
const isCorrect2 = ref(false)

const checkAct2 = () => {
  if (fillAns1.value === 'abstraccion' && fillAns2.value === 'algoritmos' && fillAns3.value === 'patrones') {
    feedback2.value = '¡Correcto! Las tres frases definen de manera precisa la Abstracción, el Diseño de Algoritmos y el Reconocimiento de Patrones (+10%).'
    isCorrect2.value = true
    progress.completeActivity('act2')
  } else {
    feedback2.value = 'Alguna de las palabras seleccionadas no encaja con la definición lógica. ¡Vuelve a leer el texto y corrige!'
    isCorrect2.value = false
  }
}

// ==========================================
// ACTIVIDAD 3: RELACIONAR PILARES
// ==========================================
interface MatchItem {
  id: string
  title: string
  icon: string
}
interface MatchExample {
  id: string
  text: string
}

const matchLeft: MatchItem[] = [
  { id: 'des', title: 'Descomposición', icon: 'mdi-sitemap' },
  { id: 'pat', title: 'Reconocimiento de Patrones', icon: 'mdi-hub' },
  { id: 'abs', title: 'Abstracción', icon: 'mdi-filter-variant' },
  { id: 'alg', title: 'Diseño de Algoritmos', icon: 'mdi-arrow-decision-auto' }
]

const matchRight = ref<MatchExample[]>([
  { id: 'pat_e', text: 'Identificar que todos los correos basura (SPAM) tienen títulos en mayúsculas y ofertas dudosas.' },
  { id: 'abs_e', text: 'Ignorar el color, marca y cilindrada de un carro para modelar solo su velocidad de viaje.' },
  { id: 'alg_e', text: 'Escribir las instrucciones precisas para encender el televisor, abrir Netflix y elegir una película.' },
  { id: 'des_e', text: 'Dividir el aseo de una casa por habitaciones para limpiarla más rápido y ordenadamente.' }
])

const correctMatches: Record<string, string> = {
  'des': 'des_e',
  'pat': 'pat_e',
  'abs': 'abs_e',
  'alg': 'alg_e'
}

const matchedPairs = ref<string[]>([]) // List of left-side IDs successfully matched
const selectedLeft = ref<string | null>(null)
const selectedRight = ref<string | null>(null)
const feedback3 = ref('')

const selectLeft = (id: string) => {
  selectedLeft.value = id
  checkMatch()
}

const selectRight = (id: string) => {
  selectedRight.value = id
  checkMatch()
}

const checkMatch = () => {
  if (selectedLeft.value && selectedRight.value) {
    const expectedRight = correctMatches[selectedLeft.value]
    if (expectedRight === selectedRight.value) {
      matchedPairs.value.push(selectedLeft.value)
      if (matchedPairs.value.length === 4) {
        feedback3.value = '¡Increíble! Has emparejado correctamente todos los pilares con sus ejemplos (+10%).'
        progress.completeActivity('act3')
      } else {
        feedback3.value = `¡Par correcto! ${matchedPairs.value.length} de 4 emparejados.`
      }
    } else {
      feedback3.value = 'Esos dos elementos no encajan entre sí. Intenta con otra pareja.'
    }
    selectedLeft.value = null
    selectedRight.value = null
  }
}

const isMatched = (id: string) => {
  return matchedPairs.value.includes(id)
}

const getLeftIdFromExample = (rightId: string) => {
  for (const [left, right] of Object.entries(correctMatches)) {
    if (right === rightId) return left
  }
  return ''
}

const resetAct3 = () => {
  matchedPairs.value = []
  selectedLeft.value = null
  selectedRight.value = null
  feedback3.value = ''
}

// ==========================================
// ACTIVIDAD 4: LABERINTO ROBOT
// ==========================================
const robotX = ref(0)
const robotY = ref(0)
const robotRotation = ref(90) // 0: North, 90: East, 180: South, 270: West
const targetX = ref(4)
const targetY = ref(4)

// Obstacles Coordinates (Row, Col)
const mazeWalls = [
  { r: 1, c: 2 },
  { r: 2, c: 2 },
  { r: 3, c: 1 },
  { r: 0, c: 4 },
  { r: 3, c: 4 }
]

const commandsQueue = ref<string[]>([])
const isRunningSimulation = ref(false)
const feedback4 = ref('')
const isCorrect4 = ref(false)

const getCellClass = (row: number, col: number) => {
  const isWall = mazeWalls.some(w => w.r === row && w.c === col)
  if (isWall) return 'cell-wall'
  return ''
}

const addCommand = (cmd: string) => {
  if (commandsQueue.value.length >= 10 || isRunningSimulation.value) return
  commandsQueue.value.push(cmd)
}

const removeCommandAt = (idx: number) => {
  if (isRunningSimulation.value) return
  commandsQueue.value.splice(idx, 1)
}

const clearCommands = () => {
  if (isRunningSimulation.value) return
  commandsQueue.value = []
  resetRobotPosition()
}

const resetRobotPosition = () => {
  robotX.value = 0
  robotY.value = 0
  robotRotation.value = 90
}

const getCommandLabel = (cmd: string) => {
  if (cmd === 'avanzar') return 'Avanzar'
  if (cmd === 'izquierda') return 'Girar Izquierda'
  return 'Girar Derecha'
}

const runSimulation = async () => {
  if (commandsQueue.value.length === 0 || isRunningSimulation.value) return
  
  isRunningSimulation.value = true
  feedback4.value = 'Simulando ejecución de algoritmo...'
  resetRobotPosition()
  
  let currentX = 0
  let currentY = 0
  let currentRot = 90 // Facing East (90)
  
  for (let i = 0; i < commandsQueue.value.length; i++) {
    const cmd = commandsQueue.value[i]
    await new Promise(resolve => setTimeout(resolve, 600))
    
    if (cmd === 'izquierda') {
      currentRot = (currentRot - 90 + 360) % 360
      robotRotation.value = currentRot
    } else if (cmd === 'derecha') {
      currentRot = (currentRot + 90) % 360
      robotRotation.value = currentRot
    } else if (cmd === 'avanzar') {
      let dx = 0
      let dy = 0
      if (currentRot === 0) dy = -1   // North
      else if (currentRot === 90) dx = 1  // East
      else if (currentRot === 180) dy = 1 // South
      else if (currentRot === 270) dx = -1 // West
      
      const nextX = currentX + dx
      const nextY = currentY + dy
      
      // Check boundaries
      if (nextX < 0 || nextX > 4 || nextY < 0 || nextY > 4) {
        feedback4.value = `¡Colisión con el límite del mapa! Robot fuera de límites en el paso ${i + 1}.`
        isCorrect4.value = false
        isRunningSimulation.value = false
        return
      }
      
      // Check walls
      const hitWall = mazeWalls.some(w => w.r === nextY && w.c === nextX)
      if (hitWall) {
        feedback4.value = `¡Colisión con muralla en el paso ${i + 1}! Corrige el algoritmo.`
        isCorrect4.value = false
        isRunningSimulation.value = false
        return
      }
      
      currentX = nextX
      currentY = nextY
      robotX.value = currentX
      robotY.value = currentY
    }
  }

  // Finished commands queue. Check if reached spaceship
  if (currentX === targetX.value && currentY === targetY.value) {
    feedback4.value = '¡Felicidades! El robot astronauta ha llegado a salvo a la nave. Algoritmo impecable (+10%).'
    isCorrect4.value = true
    progress.completeActivity('act4')
  } else {
    feedback4.value = 'El algoritmo finalizó pero el robot no llegó a la nave espacial. ¡Ajusta los pasos!'
    isCorrect4.value = false
  }
  
  isRunningSimulation.value = false
}
</script>

<style scoped>
.max-w-600 {
  max-width: 600px;
}
.max-w-800 {
  max-width: 800px;
}

.glow-button {
  background: linear-gradient(135deg, #00f0ff 0%, #0072ff 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
}
.glow-button:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.7);
}

.glow-button-purple {
  background: linear-gradient(135deg, #bd00ff 0%, #ff007f 100%) !important;
  color: white !important;
  box-shadow: 0 0 15px rgba(189, 0, 255, 0.4);
}
.glow-button-purple:hover {
  box-shadow: 0 0 25px rgba(189, 0, 255, 0.7);
}

.border-glow-cyan {
  border-color: rgba(0, 240, 255, 0.25) !important;
  transition: all 0.3s ease;
}
.border-glow-cyan:hover {
  border-color: rgba(0, 240, 255, 0.45) !important;
}

/* Custom dropdown style */
.custom-select {
  background: #111726;
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 4px 12px;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

/* Maze Grid Design */
.maze-grid {
  display: flex;
  flex-direction: column;
  background-color: #0c101d;
  padding: 8px;
  border-radius: 12px;
  border: 2px solid rgba(0, 240, 255, 0.25);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
}

.maze-row {
  display: flex;
}

.maze-cell {
  width: 55px;
  height: 55px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: relative;
  background: rgba(17, 23, 38, 0.4);
}

.cell-wall {
  background-color: rgba(255, 0, 127, 0.45) !important;
  border: 1px solid rgba(255, 0, 127, 0.6) !important;
  box-shadow: inset 0 0 10px rgba(255, 0, 127, 0.5);
}

.robot-element {
  animation: float-mini 2s infinite ease-in-out;
}

.target-element {
  animation: pulse-mini 1.5s infinite ease-in-out;
}

@keyframes float-mini {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes pulse-mini {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.h-220 {
  height: 220px;
}
.max-h-120 {
  max-height: 120px;
}

.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
</style>
