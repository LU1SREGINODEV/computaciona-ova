<template>
  <div class="home-page">
    <!-- Hero Banner Section -->
    <v-row class="align-center py-10 min-vh-80">
      <v-col cols="12" md="6" class="text-left pr-md-8">
        <v-chip
          color="primary"
          variant="elevated"
          class="mb-4 pulse-cyan-glow font-weight-bold px-4"
          label
        >
          <v-icon icon="mdi-rocket-launch" class="mr-2" />
          OBJETO VIRTUAL DE APRENDIZAJE (OVA)
        </v-chip>

        <h1 class="text-h2 font-weight-black text-white leading-tight mb-4">
          Domina el Arte del <br />
          <span class="text-gradient-cyan">Pensamiento</span> <br />
          <span class="text-gradient-purple">Computacional</span>
        </h1>

        <p class="text-body-1 text-grey-lighten-2 mb-8 pr-md-10" style="line-height: 1.8;">
          ¡Bienvenido, explorador! El pensamiento computacional no es solo para programadores.
          Es una poderosa caja de herramientas mentales que te enseña a dividir grandes retos en
          partes fáciles, encontrar patrones secretos, simplificar lo confuso y crear instrucciones
          exactas para dominar cualquier problema de la vida real. ¡Especialmente diseñado para grado 9°!
        </p>

        <div class="d-flex flex-wrap gap-4 align-center">
          <v-btn
            size="x-large"
            color="primary"
            class="glow-button px-8 py-4 font-weight-bold"
            rounded="xl"
            to="/contenidos"
            prepend-icon="mdi-arrow-right-drop-circle-outline"
          >
            Comenzar Aprendizaje
          </v-btn>

          <v-btn
            size="x-large"
            variant="outlined"
            color="secondary"
            class="px-8 py-4 font-weight-bold"
            rounded="xl"
            @click="scrollToTerminal"
            prepend-icon="mdi-console"
          >
            Probar Consola
          </v-btn>
        </div>
      </v-col>

      <!-- Hero Illustration -->
      <v-col cols="12" md="6" class="text-center position-relative mt-8 mt-md-0">
        <div class="tech-graphic-container float-animation">
          <div class="central-glow-circle" />

          <!-- Floating tech elements -->
          <div class="floating-icon icon-1 float-animation-delay-1">
            <v-icon size="40" color="primary">mdi-code-braces</v-icon>
          </div>
          <div class="floating-icon icon-2 float-animation-delay-2">
            <v-icon size="36" color="secondary">mdi-sitemap</v-icon>
          </div>
          <div class="floating-icon icon-3 float-animation">
            <v-icon size="32" color="accent">mdi-rotate-right</v-icon>
          </div>
          <div class="floating-icon icon-4 float-animation-delay-1">
            <v-icon size="44" color="info">mdi-lambda</v-icon>
          </div>

          <!-- Central visual -->
          <div class="glass-illustration pa-6">
            <v-icon size="110" color="primary" class="mb-4">mdi-robot-outline</v-icon>
            <div class="text-h5 text-white font-weight-bold">CONECTANDO LOGIC.EXE</div>
            <div class="binary-stream text-caption text-grey-lighten-2 mt-2 font-mono">
              01001100 01001111 01000111 01001001 01000011
            </div>
            <div class="d-flex justify-center gap-2 mt-4">
              <span class="pulse-dot green" />
              <span class="pulse-dot blue" />
              <span class="pulse-dot purple" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Pillars Section -->
    <v-row class="py-12">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold text-white mb-2">
          Los <span class="text-gradient-cyan">4 Pilares</span> del Pensamiento Computacional
        </h2>
        <p class="text-body-1 text-grey-lighten-1">
          Cuatro habilidades fundamentales que te permiten resolver cualquier problema.
        </p>
      </v-col>
      <v-col
        v-for="pillar in pillars"
        :key="pillar.id"
        cols="12" sm="6" lg="3"
      >
        <v-card class="glass-card pa-6 text-center h-100">
          <v-avatar :color="pillar.bgColor" size="64" class="mb-4 float-animation">
            <v-icon :icon="pillar.icon" size="32" color="white" />
          </v-avatar>
          <div class="text-h5 font-weight-bold text-white mb-1">{{ pillar.num }}</div>
          <div class="text-subtitle-1 font-weight-bold text-white mb-2">{{ pillar.title }}</div>
          <div class="text-caption text-primary font-weight-bold mb-3 uppercase">{{ pillar.slogan }}</div>
          <p class="text-body-2 text-grey-lighten-2">{{ pillar.desc }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Interactive Terminal Section -->
    <div id="terminal-section">
      <v-row class="py-8">
        <v-col cols="12" class="text-center mb-6">
          <h2 class="text-h4 font-weight-bold text-white mb-2">
            Terminal <span class="text-gradient-cyan">Interactiva</span>
          </h2>
          <p class="text-body-1 text-grey-lighten-1">
            Simula los 4 pilares del pensamiento computacional en tiempo real.
          </p>
        </v-col>

        <v-col cols="12" lg="5" class="d-flex flex-column gap-3">
          <v-btn
            v-for="btn in terminalButtons"
            :key="btn.command"
            block
            variant="outlined"
            color="primary"
            class="text-none justify-start px-4 py-5 border-start-cyan hover-cyan"
            rounded="lg"
            :prepend-icon="btn.icon"
            @click="runTerminalCommand(btn.command)"
          >
            {{ btn.label }}
            <template #append>
              <span class="text-caption font-mono text-grey-lighten-2">{{ btn.cmdText }}</span>
            </template>
          </v-btn>
        </v-col>

        <v-col cols="12" lg="7">
          <div class="cyber-terminal pulse-cyan-glow">
            <div class="terminal-header">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="text-caption text-grey-lighten-1 ml-4 font-mono">pc-terminal@estudiante: ~</span>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-refresh" variant="text" size="small" color="grey-lighten-1" @click="clearTerminal"></v-btn>
            </div>
            <div class="terminal-body font-mono text-body-2" ref="terminalBody">
              <div v-for="(line, index) in terminalLines" :key="index" :class="line.type">
                {{ line.text }}
              </div>
              <div v-if="isWriting" class="cursor-blink">_</div>
              <div v-else class="text-white mt-1">pc-terminal@estudiante:~$ <span class="typing-placeholder"></span></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Curious Facts Section -->
    <v-row class="py-12 bg-panel-rounded">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold text-white mb-2">
          ¿Sabías qué? - Datos Curiosos
        </h2>
        <p class="text-body-1 text-grey-lighten-1">
          Da clic sobre los módulos para descubrir datos alucinantes del mundo de la computación.
        </p>
      </v-col>

      <v-col cols="12" sm="6" md="3" v-for="(stat, idx) in statistics" :key="idx">
        <v-card
          class="glass-panel text-center pa-6 hover-scale-card cursor-pointer position-relative overflow-hidden"
          @click="showStatFact(stat)"
        >
          <div class="stat-highlight-gradient"></div>
          <v-icon :icon="stat.icon" size="48" :color="stat.color" class="mb-4 float-animation"></v-icon>
          <div class="text-h3 font-weight-black text-white mb-2">{{ stat.value }}</div>
          <div class="text-body-2 font-weight-medium text-grey-lighten-1">{{ stat.label }}</div>
          <div class="text-caption text-primary font-weight-bold mt-2">Haz clic para descubrir</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal for curious facts -->
    <v-dialog v-model="factDialog" width="480">
      <v-card class="glass-card pa-6 text-center">
        <v-icon :icon="activeStat?.icon" size="64" :color="activeStat?.color" class="mb-4 mx-auto float-animation"></v-icon>
        <h3 class="text-h5 font-weight-bold text-white mb-2">{{ activeStat?.label }}</h3>
        <p class="text-body-1 text-grey-lighten-2 mt-4" style="line-height: 1.6;">
          {{ activeStat?.fact }}
        </p>
        <v-card-actions class="justify-center mt-6">
          <v-btn color="primary" variant="elevated" rounded="xl" width="140" @click="factDialog = false">
            ¡Increíble!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useProgress } from '~~/composables/useProgress'

const progress = useProgress()

onMounted(() => {
  progress.visitHome()
})

// ─── Stat Dialog ────────────────────────────────────────────────
interface StatInfo {
  icon: string
  color: string
  value: string
  label: string
  fact: string
}
const factDialog = ref(false)
const activeStat = ref<StatInfo | null>(null)

const showStatFact = (stat: StatInfo) => {
  activeStat.value = stat
  factDialog.value = true
}

// ─── Scroll ─────────────────────────────────────────────────────
const scrollToTerminal = () => {
  const el = document.getElementById('terminal-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ─── Terminal ────────────────────────────────────────────────────
interface TerminalLine {
  text: string
  type: 'cmd' | 'output' | 'success' | 'error' | 'info'
}

const terminalLines = ref<TerminalLine[]>([
  { text: 'Conectando con el Núcleo de Aprendizaje de PC-OVA...', type: 'info' },
  { text: 'Sistema listo. Estudiante en línea.', type: 'success' },
  { text: 'Escribe un comando o haz clic en los botones de la izquierda.', type: 'output' }
])
const isWriting = ref(false)
const terminalBody = ref<HTMLElement | null>(null)

const clearTerminal = () => {
  if (isWriting.value) return
  terminalLines.value = []
}

const appendTerminalLines = async (lines: TerminalLine[]) => {
  isWriting.value = true
  for (const line of lines) {
    await new Promise(resolve => setTimeout(resolve, 300))
    terminalLines.value.push(line)
    await nextTick()
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  }
  isWriting.value = false
}

const runTerminalCommand = (cmd: string) => {
  if (isWriting.value) return
  terminalLines.value.push({ text: `pc-terminal@estudiante:~$ run ${cmd}`, type: 'cmd' })

  const responseMap: Record<string, TerminalLine[]> = {
    'descomposicion.sh': [
      { text: '[+] Cargando módulo DESCOMPOSICIÓN...', type: 'info' },
      { text: '[+] Problema masivo: "Hacer un almuerzo familiar"', type: 'output' },
      { text: '    |--> Subtarea A: Hacer el arroz (Fácil)', type: 'output' },
      { text: '    |--> Subtarea B: Preparar la proteína (Media)', type: 'output' },
      { text: '    |--> Subtarea C: Hacer ensalada y jugo (Fácil)', type: 'output' },
      { text: '    |--> Subtarea D: Montar la mesa (Fácil)', type: 'output' },
      { text: '[✓] Éxito: El problema masivo fue resuelto dividiendo fuerzas.', type: 'success' }
    ],
    'patrones.sh': [
      { text: '[+] Cargando módulo RECONOCIMIENTO DE PATRONES...', type: 'info' },
      { text: '[+] Entrada: Analizar secuencia: 2, 4, 8, 16, 32, ...', type: 'output' },
      { text: '    [!] Patrón detectado: Cada número es el doble del anterior (N * 2).', type: 'info' },
      { text: '    [*] Predicción siguiente: 32 * 2 = 64', type: 'output' },
      { text: '[✓] Regla establecida: f(n) = 2^n.', type: 'success' }
    ],
    'abstraccion.sh': [
      { text: '[+] Cargando módulo ABSTRACCIÓN...', type: 'info' },
      { text: '[+] Problema: Representar un automóvil para base de datos escolar.', type: 'output' },
      { text: '    [-] Ignorando: ¿Tiene ambientador? ¿Color de luces?', type: 'error' },
      { text: '    [+] Guardando: Placa, Modelo, Marca, Color, Dueño.', type: 'info' },
      { text: '[✓] 80% de datos irrelevantes descartados para ahorrar memoria.', type: 'success' }
    ],
    'algoritmos.sh': [
      { text: '[+] Cargando módulo DISEÑO DE ALGORITMOS...', type: 'info' },
      { text: '[+] Algoritmo: "Cruzar la calle con semáforo"', type: 'output' },
      { text: '    Paso 1: Pararse al borde del andén.', type: 'output' },
      { text: '    Paso 2: Mirar color del semáforo peatonal.', type: 'output' },
      { text: '    Paso 3: SI semáforo == VERDE ENTONCES cruzar.', type: 'info' },
      { text: '    Paso 4: SINO esperar a que cambie.', type: 'info' },
      { text: '[✓] Secuencia lógica terminada sin bucles infinitos.', type: 'success' }
    ]
  }

  appendTerminalLines(responseMap[cmd] ?? [{ text: 'Comando no reconocido. Prueba los botones interactivos.', type: 'error' }])
}

// ─── Data ────────────────────────────────────────────────────────
const pillars = [
  { id: 'descomposicion', num: '01', title: 'Descomposición', slogan: 'Divide el problema', icon: 'mdi-sitemap', bgColor: 'primary', desc: 'Aprende a romper problemas grandes en pequeñas tareas sencillas que puedes resolver una a una fácilmente.' },
  { id: 'patrones', num: '02', title: 'Patrones', slogan: 'Encuentra conexiones', icon: 'mdi-hub', bgColor: 'secondary', desc: 'Busca similitudes y repeticiones dentro del problema o en problemas que ya resolviste antes. ¡No reinventes la rueda!' },
  { id: 'abstraccion', num: '03', title: 'Abstracción', slogan: 'Filtra lo importante', icon: 'mdi-filter-variant', bgColor: 'accent', desc: 'Elimina todo el ruido y detalles innecesarios. Concéntrate únicamente en la información que sí importa.' },
  { id: 'algoritmos', num: '04', title: 'Algoritmos', slogan: 'Paso a paso lógico', icon: 'mdi-arrow-decision-auto', bgColor: 'info', desc: 'Escribe guías ordenadas de instrucciones precisas que cualquiera (o una computadora) pueda seguir para llegar al éxito.' }
]

const terminalButtons = [
  { label: 'Simular Descomposición', command: 'descomposicion.sh', cmdText: 'run descomposicion.sh', icon: 'mdi-sitemap' },
  { label: 'Simular Patrones', command: 'patrones.sh', cmdText: 'run patrones.sh', icon: 'mdi-hub' },
  { label: 'Simular Abstracción', command: 'abstraccion.sh', cmdText: 'run abstraccion.sh', icon: 'mdi-filter-variant' },
  { label: 'Simular Algoritmos', command: 'algoritmos.sh', cmdText: 'run algoritmos.sh', icon: 'mdi-arrow-decision-auto' }
]

const statistics = [
  { icon: 'mdi-brain', color: 'primary', value: '4', label: 'Pilares Clave', fact: 'Los 4 pilares (Descomposición, Patrones, Abstracción y Algoritmos) fueron creados basándose en cómo los científicos y matemáticos resuelven problemas del mundo real.' },
  { icon: 'mdi-school', color: 'secondary', value: '9°', label: 'Grado Escolar', fact: 'El grado 9° es una etapa perfecta para el pensamiento computacional. Tu cerebro desarrolla el pensamiento formal abstracto que permite entender diagramas de flujo y condicionales complejos.' },
  { icon: 'mdi-controller-classic', color: 'accent', value: '4', label: 'Actividades', fact: 'El juego es la mejor forma de aprender programación. Nuestras 4 actividades activan áreas específicas del cerebro encargadas del razonamiento espacial, secuencial y lógico.' },
  { icon: 'mdi-check-decagram-outline', color: 'info', value: '100%', label: 'Autónomo', fact: 'Este OVA guarda tu progreso en el navegador mediante LocalStorage. Puedes cerrar la ventana y regresar mañana, ¡no perderás tu avance ni tus actividades completadas!' }
]
</script>

<style scoped>
.home-page {
  width: 100%;
}

.min-vh-80 {
  min-height: 80vh;
}

.leading-tight {
  line-height: 1.2;
}

.glow-button {
  background: linear-gradient(135deg, #00f0ff 0%, #0072ff 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.glow-button:hover {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.7) !important;
  transform: translateY(-2px);
}

.tech-graphic-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.central-glow-circle {
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 70%);
  z-index: 1;
}

.glass-illustration {
  background: rgba(17, 23, 38, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 24px;
  width: 320px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.15);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(17, 23, 38, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  z-index: 3;
}
.icon-1 { top: 15%; left: 15%; border-color: rgba(0, 240, 255, 0.3); }
.icon-2 { top: 10%; right: 15%; border-color: rgba(189, 0, 255, 0.3); }
.icon-3 { bottom: 15%; left: 10%; border-color: rgba(57, 255, 20, 0.3); }
.icon-4 { bottom: 10%; right: 10%; border-color: rgba(0, 210, 255, 0.3); }

.binary-stream { font-family: 'Fira Code', monospace; letter-spacing: 2px; }

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  animation: pulse-dot-anim 1.5s infinite ease-in-out;
}
.pulse-dot.green { background-color: #39ff14; }
.pulse-dot.blue { background-color: #00f0ff; animation-delay: 0.5s; }
.pulse-dot.purple { background-color: #bd00ff; animation-delay: 1s; }

@keyframes pulse-dot-anim {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.border-start-cyan {
  border-left: 4px solid #00f0ff !important;
  transition: all 0.3s ease;
}
.hover-cyan:hover {
  background-color: rgba(0, 240, 255, 0.08) !important;
  transform: translateX(4px);
}

.cursor-blink {
  display: inline-block;
  animation: blink 1s infinite steps(2, start);
  color: #00f0ff;
  font-weight: bold;
}
@keyframes blink { to { visibility: hidden; } }

.bg-panel-rounded {
  background: rgba(17, 23, 38, 0.3);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.hover-scale-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.hover-scale-card:hover {
  transform: scale(1.05);
  border-color: rgba(189, 0, 255, 0.3) !important;
  box-shadow: 0 0 25px rgba(189, 0, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4) !important;
}

.stat-highlight-gradient {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, #00f0ff, #bd00ff);
}

.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.position-relative { position: relative; }
.font-mono { font-family: 'Fira Code', monospace; }
</style>
