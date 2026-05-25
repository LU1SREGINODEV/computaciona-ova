<template>
  <div class="evaluation-page">
    <!-- CASE 1: LOCKED STATE (Progress < 80%) -->
    <div v-if="!progress.isEvaluationUnlocked" class="locked-container text-center py-12">
      <v-card class="glass-card pa-8 max-w-600 mx-auto pulse-purple-glow">
        <v-icon icon="mdi-lock-outline" color="error" size="80" class="mb-4 float-animation"></v-icon>
        <h2 class="text-h4 font-weight-black text-white mb-2">Evaluación Bloqueada</h2>
        <p class="text-body-1 text-grey-lighten-2 mb-6">
          Para acceder a la evaluación final y obtener tu certificado, debes completar al menos el <strong>80% del progreso global</strong> del OVA. Tu progreso actual es de <strong class="text-primary">{{ progress.progressPercent }}%</strong>.
        </p>

        <v-divider class="my-6 border-opacity-10"></v-divider>

        <h3 class="text-subtitle-1 font-weight-bold text-white text-left mb-4">
          <v-icon icon="mdi-playlist-check" color="accent" class="mr-2"></v-icon>
          Tu Lista de Diagnóstico:
        </h3>

        <!-- Checklist -->
        <div class="d-flex flex-column gap-3 text-left mb-6">
          <div class="d-flex align-center justify-space-between glass-panel pa-3">
            <span class="text-body-2 text-white">1. Visitar la página de Inicio</span>
            <v-chip :color="progress.visitedHome ? 'success' : 'error'" size="small">
              {{ progress.visitedHome ? 'Completado' : 'Pendiente' }}
            </v-chip>
          </div>
          
          <div class="d-flex align-center justify-space-between glass-panel pa-3">
            <span class="text-body-2 text-white">2. Lecturas de Contenido ({{ progress.readContents.length }}/4)</span>
            <v-chip :color="progress.readContents.length === 4 ? 'success' : progress.readContents.length > 0 ? 'warning' : 'error'" size="small">
              {{ progress.readContents.length * 25 }}%
            </v-chip>
          </div>
          
          <div class="d-flex align-center justify-space-between glass-panel pa-3">
            <span class="text-body-2 text-white">3. Recursos Adicionales Explorados ({{ progress.exploredResources.length }}/4)</span>
            <v-chip :color="progress.exploredResources.length === 4 ? 'success' : progress.exploredResources.length > 0 ? 'warning' : 'error'" size="small">
              {{ progress.exploredResources.length * 25 }}%
            </v-chip>
          </div>
          
          <div class="d-flex align-center justify-space-between glass-panel pa-3">
            <span class="text-body-2 text-white">4. Actividades Prácticas Resueltas ({{ progress.completedActivities.length }}/4)</span>
            <v-chip :color="progress.completedActivities.length === 4 ? 'success' : progress.completedActivities.length > 0 ? 'warning' : 'error'" size="small">
              {{ progress.completedActivities.length * 25 }}%
            </v-chip>
          </div>
        </div>

        <v-btn
          color="primary"
          class="glow-button px-8 py-3 font-weight-bold"
          rounded="xl"
          to="/contenidos"
        >
          Ir a Estudiar
        </v-btn>
      </v-card>
    </div>

    <!-- CASE 2: UNLOCKED STATE (Progress >= 80%) -->
    <div v-else class="unlocked-container">
      
      <!-- STEP A: NAME REQUEST (If studentName is empty and score is null) -->
      <div v-if="!progress.studentName && progress.evaluationScore === null" class="name-request py-12">
        <v-card class="glass-card pa-8 max-w-500 mx-auto text-center">
          <v-icon icon="mdi-account-school-outline" color="primary" size="70" class="mb-4"></v-icon>
          <h2 class="text-h4 font-weight-bold text-white mb-2">Identificación del Estudiante</h2>
          <p class="text-body-2 text-grey-lighten-2 mb-6">
            Por favor ingresa tu nombre completo. Se utilizará para generar tu certificado digital una vez apruebes el examen.
          </p>
          
          <v-text-field
            v-model="studentInputName"
            label="Nombre y Apellidos"
            placeholder="Ej. Luis Ángel Regino"
            variant="outlined"
            color="primary"
            class="mb-4"
            base-color="grey-lighten-1"
            hide-details
            rounded="lg"
            bg-color="rgba(255,255,255,0.03)"
          ></v-text-field>

          <v-btn
            color="primary"
            class="glow-button px-8 py-3 font-weight-bold"
            rounded="xl"
            block
            :disabled="!studentInputName.trim()"
            @click="saveStudentName"
          >
            Iniciar Evaluación
          </v-btn>
        </v-card>
      </div>

      <!-- STEP B: ACTIVE QUIZ VIEW -->
      <div v-else-if="progress.evaluationScore === null" class="active-quiz py-6">
        <v-row class="justify-center">
          <v-col cols="12" md="10" lg="8">
            <v-card class="glass-card pa-6">
              <!-- Quiz Header -->
              <div class="d-flex justify-space-between align-center mb-4 flex-wrap gap-2">
                <div>
                  <span class="text-caption text-primary font-weight-bold uppercase">Evaluación de Conocimientos</span>
                  <h2 class="text-h5 text-white font-weight-bold">Pregunta {{ currentQuestionIdx + 1 }} de 15</h2>
                </div>
                <div class="text-right">
                  <span class="text-caption text-grey-lighten-1 font-mono">Estudiante: {{ progress.studentName }}</span>
                </div>
              </div>

              <!-- Question Progress Line -->
              <v-progress-linear
                color="primary"
                height="6"
                :model-value="((currentQuestionIdx + 1) / 15) * 100"
                rounded
                class="mb-6"
              ></v-progress-linear>

              <!-- Question Container -->
              <div class="question-container mb-6 min-h-120">
                <p class="text-h6 text-white font-weight-medium leading-relaxed">
                  {{ questions[currentQuestionIdx]?.question }}
                </p>
              </div>

              <!-- Options Selection -->
              <div class="options-container d-flex flex-column gap-3 mb-8">
                <v-btn
                  v-for="(option, idx) in questions[currentQuestionIdx]?.options"
                  :key="idx"
                  block
                  variant="outlined"
                  :color="selectedAnswers[currentQuestionIdx] === idx ? 'primary' : 'white'"
                  :class="['text-none justify-start px-4 py-4 h-auto text-left', selectedAnswers[currentQuestionIdx] === idx ? 'selected-option-btn' : '']"
                  style="white-space: normal;"
                  rounded="lg"
                  @click="selectAnswer(idx)"
                >
                  <span class="option-letter font-weight-bold mr-3">{{ getOptionLetter(idx) }})</span>
                  <span class="option-text text-grey-lighten-1">{{ option }}</span>
                </v-btn>
              </div>

              <!-- Navigation Footer -->
              <div class="d-flex justify-space-between align-center border-top pt-4">
                <v-btn
                  variant="text"
                  color="white"
                  :disabled="currentQuestionIdx === 0"
                  prepend-icon="mdi-chevron-left"
                  class="text-none font-weight-bold"
                  @click="navigateQuestion(-1)"
                >
                  Anterior
                </v-btn>

                <v-btn
                  v-if="currentQuestionIdx < 14"
                  color="primary"
                  :disabled="selectedAnswers[currentQuestionIdx] === undefined"
                  append-icon="mdi-chevron-right"
                  class="text-none font-weight-bold"
                  @click="navigateQuestion(1)"
                >
                  Siguiente
                </v-btn>

                <v-btn
                  v-else
                  color="accent"
                  class="font-weight-bold text-black"
                  :disabled="selectedAnswers.length < 15 || selectedAnswers.includes(undefined)"
                  append-icon="mdi-check-all"
                  @click="finishEvaluation"
                >
                  Finalizar Evaluación
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- STEP C: RESULTS VIEW -->
      <div v-else class="results-view py-6">
        <v-row class="justify-center">
          <v-col cols="12" md="10" lg="8">
            <v-card class="glass-card pa-8 text-center mb-6">
              
              <!-- Success/Failure Badge -->
              <v-icon
                :icon="isPassed ? 'mdi-certificate' : 'mdi-alert-decagram-outline'"
                :color="isPassed ? 'accent' : 'error'"
                size="80"
                class="mb-4 float-animation"
              ></v-icon>

              <h2 class="text-h3 font-weight-black text-white mb-2">
                {{ isPassed ? '¡Evaluación Aprobada!' : 'Evaluación Reprobada' }}
              </h2>
              <p class="text-body-1 text-grey-lighten-2 mb-6">
                Estudiante: <strong class="text-white">{{ progress.studentName }}</strong>
              </p>

              <!-- Score Indicator Circle -->
              <div class="d-flex justify-center mb-6">
                <v-progress-circular
                  :model-value="(progress.evaluationScore / 5.0) * 100"
                  :size="150"
                  :width="12"
                  :color="isPassed ? 'accent' : 'error'"
                >
                  <div class="d-flex flex-column align-center">
                    <span class="text-h3 font-weight-black text-white">{{ progress.evaluationScore?.toFixed(1) }}</span>
                    <span class="text-caption text-grey-lighten-1">DE 5.0</span>
                  </div>
                </v-progress-circular>
              </div>

              <p class="text-body-1 text-grey-lighten-2 max-w-600 mx-auto mb-6">
                {{ isPassed 
                  ? '¡Excelente trabajo! Has demostrado dominar los pilares del Pensamiento Computacional. Ya puedes descargar tu diploma oficial firmado.'
                  : 'No has alcanzado la nota mínima aprobatoria (3.5). Te sugerimos repasar los contenidos, volver a realizar las actividades prácticas y reintentar la prueba.'
                }}
              </p>

              <div class="d-flex justify-center gap-4 flex-wrap mt-8">
                <v-btn
                  v-if="isPassed"
                  color="accent"
                  size="large"
                  class="glow-button-green px-8 font-weight-bold text-black"
                  rounded="xl"
                  prepend-icon="mdi-printer-eye"
                  @click="certificateDialog = true"
                >
                  Ver Certificado
                </v-btn>
                
                <v-btn
                  color="error"
                  size="large"
                  variant="outlined"
                  class="px-8 font-weight-bold"
                  rounded="xl"
                  prepend-icon="mdi-refresh"
                  @click="retryEvaluation"
                >
                  Reintentar Examen
                </v-btn>

                <v-btn
                  variant="text"
                  color="white"
                  size="large"
                  class="px-6 text-none"
                  rounded="xl"
                  @click="resetAllProgress"
                >
                  Reiniciar Todo el OVA
                </v-btn>
              </div>
            </v-card>

            <!-- Detailed Exam Review Section -->
            <v-card class="glass-card pa-6">
              <h3 class="text-h5 text-white font-weight-bold mb-4 text-left">
                <v-icon icon="mdi-magnify" color="primary" class="mr-2"></v-icon>
                Revisión Detallada del Examen
              </h3>

              <div class="review-list d-flex flex-column gap-6">
                <div
                  v-for="(q, idx) in questions"
                  :key="q.id"
                  class="glass-panel pa-4 text-left border-left-indicator"
                  :style="{ borderLeftColor: selectedAnswers[idx] === q.correctAnswer ? '#39ff14' : '#ff007f' }"
                >
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="text-caption font-weight-bold" :color="selectedAnswers[idx] === q.correctAnswer ? 'success' : 'error'">
                      Pregunta {{ idx + 1 }}: {{ selectedAnswers[idx] === q.correctAnswer ? 'Correcta (✓)' : 'Incorrecta (✗)' }}
                    </span>
                  </div>

                  <p class="text-body-2 text-white font-weight-medium mb-3">
                    {{ q.question }}
                  </p>

                  <div class="d-flex flex-column gap-1 mb-3 text-caption">
                    <div>
                      <span class="text-grey-lighten-2">Tu respuesta:</span>
                      <strong :class="selectedAnswers[idx] === q.correctAnswer ? 'text-accent' : 'text-error'">
                        {{ getOptionLetter(selectedAnswers[idx]) }}) {{ q.options[selectedAnswers[idx]] }}
                      </strong>
                    </div>
                    <div v-if="selectedAnswers[idx] !== q.correctAnswer">
                      <span class="text-grey-lighten-2">Respuesta correcta:</span>
                      <strong class="text-accent">
                        {{ getOptionLetter(q.correctAnswer) }}) {{ q.options[q.correctAnswer] }}
                      </strong>
                    </div>
                  </div>

                  <v-divider class="my-2 border-opacity-10"></v-divider>
                  
                  <div class="text-caption text-grey-lighten-1 bg-surface pa-2 rounded-lg">
                    <strong class="text-primary">Explicación:</strong> {{ q.explanation }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

    </div>

    <!-- Certificate print modal -->
    <v-dialog v-model="certificateDialog" width="800">
      <v-card class="glass-card pa-6">
        <div id="print-area" class="certificate-container pa-8 text-center text-black">
          <div class="certificate-border pa-4">
            <div class="certificate-header mb-6">
              <span class="cert-university uppercase font-weight-black">UNIVERSIDAD DE CÓRDOBA</span> <br />
              <span class="cert-faculty text-caption">LICENCIATURA EN INFORMÁTICA</span>
            </div>
            
            <div class="cert-title mb-6">CERTIFICADO DE APROBACIÓN</div>
            
            <div class="cert-text mb-6">
              Otorgado con distinción académica a: <br />
              <div class="cert-name my-4 font-weight-black">{{ progress.studentName }}</div>
              Por haber completado satisfactoriamente el Objeto Virtual de Aprendizaje (OVA)<br />
              <strong class="text-uppercase font-weight-bold">"PENSAMIENTO COMPUTACIONAL"</strong> <br />
              diseñado para el fortalecimiento de la lógica secuencial en grado 9°.
            </div>

            <div class="cert-grades mb-8">
              Calificación Obtenida: <strong class="cert-score">{{ progress.evaluationScore?.toFixed(1) }} / 5.0</strong>
            </div>

            <v-row class="cert-signatures mt-8 justify-space-around">
              <v-col cols="5" class="text-center pt-6 border-top-dark">
                <div class="cert-signature-name font-weight-bold text-caption">PC-OVA SOFTWARE</div>
                <div class="cert-signature-title text-caption text-grey">Firma del Validador Digital</div>
              </v-col>
              <v-col cols="5" class="text-center pt-6 border-top-dark">
                <div class="cert-signature-name font-weight-bold text-caption">Lic. en Informática</div>
                <div class="cert-signature-title text-caption text-grey">Universidad de Córdoba</div>
              </v-col>
            </v-row>
          </div>
        </div>

        <v-card-actions class="justify-center mt-6 gap-4">
          <v-btn color="primary" variant="elevated" rounded="xl" prepend-icon="mdi-printer" class="px-6 font-weight-bold text-black" @click="printCertificate">
            Imprimir Diploma
          </v-btn>
          <v-btn color="white" variant="outlined" rounded="xl" class="px-6" @click="certificateDialog = false">
            Cerrar Ventana
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProgress } from '~~/composables/useProgress'
import questionsData from '~/public/data/questions.json'

const progress = useProgress()

const studentInputName = ref('')
const currentQuestionIdx = ref(0)
const selectedAnswers = ref<number[]>([])
const certificateDialog = ref(false)

const questions = questionsData

const isPassed = computed(() => {
  return progress.evaluationScore !== null && progress.evaluationScore >= 3.5
})

const saveStudentName = () => {
  if (studentInputName.value.trim()) {
    progress.setStudentName(studentInputName.value.trim())
  }
}

const selectAnswer = (idx: number) => {
  selectedAnswers.value[currentQuestionIdx.value] = idx
}

const navigateQuestion = (dir: number) => {
  currentQuestionIdx.value += dir
}

const getOptionLetter = (idx: number) => {
  if (idx === 0) return 'A'
  if (idx === 1) return 'B'
  if (idx === 2) return 'C'
  return 'D'
}

const finishEvaluation = () => {
  let correctCount = 0
  for (let i = 0; i < questions.length; i++) {
    if (selectedAnswers.value[i] === questions[i].correctAnswer) {
      correctCount++
    }
  }
  
  // Calculate score out of 5.0
  const score = (correctCount / 15) * 5.0
  // Round to 1 decimal place
  progress.setEvaluationScore(Math.round(score * 10) / 10)
}

const retryEvaluation = () => {
  selectedAnswers.value = []
  currentQuestionIdx.value = 0
  progress.setEvaluationScore(null)
}

const resetAllProgress = () => {
  if (confirm('¿Estás seguro de reiniciar todo tu progreso y empezar de cero?')) {
    progress.resetProgress()
    selectedAnswers.value = []
    currentQuestionIdx.value = 0
    studentInputName.value = ''
  }
}

const printCertificate = () => {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<style scoped>
.max-w-500 {
  max-width: 500px;
}
.max-w-600 {
  max-width: 600px;
}

.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.min-h-120 {
  min-height: 120px;
}

.selected-option-btn {
  background-color: rgba(0, 240, 255, 0.08) !important;
  border-color: #00f0ff !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.option-letter {
  color: #00f0ff;
}

.glow-button {
  background: linear-gradient(135deg, #00f0ff 0%, #0072ff 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
}
.glow-button:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.7);
}

.glow-button-green {
  background: linear-gradient(135deg, #39ff14 0%, #10b981 100%) !important;
  color: #070a13 !important;
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
}
.glow-button-green:hover {
  box-shadow: 0 0 25px rgba(57, 255, 20, 0.7);
}

.border-left-indicator {
  border-left: 4px solid #fff;
  transition: all 0.3s ease;
}

/* Certificate Styles */
.certificate-container {
  background-color: #f3f4f6; /* Off-white elegant card style */
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  font-family: 'Georgia', serif;
}

.certificate-border {
  border: 4px double #1f2937;
  border-radius: 4px;
}

.cert-university {
  font-family: 'Outfit', sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
  color: #1f2937;
}

.cert-faculty {
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  color: #4b5563;
}

.cert-title {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 3px;
  color: #111827;
  border-bottom: 2px solid #1f2937;
  display: inline-block;
  padding-bottom: 8px;
}

.cert-text {
  font-size: 15px;
  line-height: 1.8;
  color: #374151;
}

.cert-name {
  font-size: 26px;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  color: #111827;
}

.cert-grades {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.cert-score {
  font-size: 18px;
  color: #10b981;
}

.border-top-dark {
  border-top: 1px solid #9ca3af;
}

.cert-signature-name {
  font-family: 'Inter', sans-serif;
  color: #1f2937;
}

.cert-signature-title {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
}

/* Printing logic */
@media print {
  body * {
    visibility: hidden !important;
  }
  #print-area, #print-area * {
    visibility: visible !important;
  }
  #print-area {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
    box-shadow: none !important;
    background-color: white !important;
    padding: 20px !important;
  }
}

.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
</style>
