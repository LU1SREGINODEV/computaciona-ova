<template>
  <v-row class="py-12 align-center">
    <v-col cols="12" lg="5" class="pr-lg-8 mb-8 mb-lg-0">
      <h2 class="text-h4 font-weight-bold text-white mb-4">
        Consola Lógica Interactiva
      </h2>
      <p class="text-body-1 text-grey-lighten-2 mb-6" style="line-height: 1.8;">
        Las computadoras se comunican mediante instrucciones escritas. Con esta consola de simulación, 
        puedes hacer clic en las secuencias preestablecidas de abajo para ver cómo el Pensamiento 
        Computacional traduce problemas reales en lógica de procesamiento del sistema.
      </p>
      
      <!-- Terminal Buttons -->
      <div class="d-flex flex-column gap-3">
        <v-btn
          v-for="btn in terminalButtons"
          :key="btn.command"
          color="surface-variant"
          variant="flat"
          class="text-left justify-start border-start-cyan hover-cyan px-4 py-3"
          rounded="lg"
          @click="executeCommand(btn.command)"
        >
          <v-icon :icon="btn.icon" color="primary" class="mr-3" />
          <div class="text-left">
            <div class="text-body-2 font-weight-bold text-white">{{ btn.label }}</div>
            <div class="text-caption text-grey-lighten-1">{{ btn.cmdText }}</div>
          </div>
        </v-btn>
      </div>
    </v-col>

    <!-- Terminal Output -->
    <v-col cols="12" lg="7">
      <v-card class="glass-card">
        <div class="terminal-header">
          <span class="terminal-dot red" />
          <span class="terminal-dot yellow" />
          <span class="terminal-dot green" />
          <span class="ml-4 text-caption text-grey-lighten-1">COMPUTATIONAL LOGIC ENGINE</span>
        </div>

        <div class="terminal-body cyber-terminal">
          <!-- Terminal Output Display -->
          <div v-if="!isExecuting && !output">
            <p>> Selecciona un comando para comenzar...</p>
            <p class="text-grey-lighten-2">Esperando entrada...</p>
          </div>
          
          <div v-if="isExecuting" class="text-primary">
            <p class="blink">{{ currentCommand }} <span class="cursor">|</span></p>
            <p v-for="(line, idx) in outputLines" :key="idx" class="mt-2">
              {{ line }}
            </p>
          </div>

          <div v-if="output && !isExecuting">
            <p class="text-primary mb-2">> {{ currentCommand }}</p>
            <p v-for="(line, idx) in outputLines" :key="idx" class="mt-1">
              {{ line }}
            </p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TERMINAL_BUTTONS } from '~~/utils/constants'

const terminalButtons = TERMINAL_BUTTONS
const isExecuting = ref(false)
const output = ref('')
const currentCommand = ref('')

const outputLines = computed(() => {
  return output.value.split('\n').filter(line => line.trim() !== '')
})

const executeCommand = async (command: string) => {
  const btn = terminalButtons.find(b => b.command === command)
  if (!btn) return

  isExecuting.value = true
  currentCommand.value = btn.cmdText
  output.value = ''

  // Simulación de comando ejecutándose
  await new Promise(resolve => setTimeout(resolve, 800))

  // Generar salida según el comando
  const responses: Record<string, string[]> = {
    explore_algorithm: [
      '>>> Algoritmo detectado',
      '[INFO] Secuencia lógica identificada',
      '[✓] Análisis completado en 234ms',
      '[OUTPUT] Pasos: 5 | Complejidad: O(n log n)',
      '[SUCCESS] ¡Algoritmo optimizado!'
    ],
    decompose_problem: [
      '>>> Descomponiendo problema...',
      '[PASO 1] Identificar entrada',
      '[PASO 2] Procesar lógica',
      '[PASO 3] Generar salida',
      '[✓] Descomposición completada en 156ms'
    ],
    find_patterns: [
      '>>> Analizando patrones...',
      '[PATTERN] Repetición detectada cada 5 iteraciones',
      '[PATTERN] Similitud 87% con solución conocida',
      '[OPTIMIZATION] Aplica regla de oro',
      '[SUCCESS] ¡3 patrones encontrados!'
    ],
    generate_solution: [
      '>>> Generando solución...',
      '[STEP 1] Compilando lógica',
      '[STEP 2] Optimizando recursos',
      '[STEP 3] Validando resultado',
      '[COMPLETE] Solución lista: ALGORITMO_ÓPTIMO_2026.exe'
    ]
  }

  output.value = (responses[command] || ['Comando no reconocido']).join('\n')
  isExecuting.value = false
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}

.border-start-cyan {
  border-left: 3px solid rgba(0, 240, 255, 0.3) !important;
  transition: all 0.3s ease;
}

.hover-cyan:hover {
  border-left-color: #00f0ff !important;
  background: rgba(0, 240, 255, 0.08) !important;
}

.terminal-header {
  background: #0c0f17;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.15);
  display: flex;
  align-items: center;
}

.terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
  display: inline-block;
}

.terminal-dot.red { background-color: #ff5f56; }
.terminal-dot.yellow { background-color: #ffbd2e; }
.terminal-dot.green { background-color: #27c93f; }

.terminal-body {
  background: #020408 !important;
  border: 1px solid rgba(0, 240, 255, 0.2) !important;
  border-radius: 12px;
  font-family: 'Fira Code', 'Courier New', monospace;
  padding: 16px;
  min-height: 280px;
  color: #39ff14;
  font-size: 13px;
  line-height: 1.6;
  overflow-y: auto;
}

.cyber-terminal p {
  margin: 0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.blink {
  animation: blink 1s infinite;
}

.text-grey-lighten-2 {
  color: #94a3b8;
}

.text-grey-lighten-1 {
  color: #cbd5e1;
}
</style>
