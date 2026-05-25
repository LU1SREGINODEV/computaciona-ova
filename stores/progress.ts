/**
 * Store de Pinia para manejar el progreso del estudiante.
 * Guarda y carga datos de localStorage.
 */
import { defineStore } from 'pinia'
import type { ProgressData } from '../types'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    visitedHome: false,
    readContents: [] as string[],
    exploredResources: [] as string[],
    completedActivities: [] as string[],
    evaluationScore: null as number | null,
    studentName: '',
    isLoaded: false
  }),

  getters: {
    progressPercent(state): number {
      let percent = 0
      if (state.visitedHome) percent += 10
      percent += state.readContents.length * 7.5        // 4 * 7.5 = 30%
      percent += state.exploredResources.length * 5     // 4 * 5  = 20%
      percent += state.completedActivities.length * 10  // 4 * 10 = 40%
      return Math.min(Math.round(percent), 100)
    },

    isEvaluationUnlocked(): boolean {
      return this.progressPercent >= 80
    },

    contentsPercent(state): number {
      return Math.round((state.readContents.length / 4) * 100)
    },

    resourcesPercent(state): number {
      return Math.round((state.exploredResources.length / 4) * 100)
    },

    activitiesPercent(state): number {
      return Math.round((state.completedActivities.length / 4) * 100)
    }
  },

  actions: {
    visitHome() {
      this.visitedHome = true
      this.saveToLocalStorage()
    },

    readContent(id: string) {
      if (!this.readContents.includes(id)) {
        this.readContents.push(id)
        this.saveToLocalStorage()
      }
    },

    exploreResource(id: string) {
      if (!this.exploredResources.includes(id)) {
        this.exploredResources.push(id)
        this.saveToLocalStorage()
      }
    },

    completeActivity(id: string) {
      if (!this.completedActivities.includes(id)) {
        this.completedActivities.push(id)
        this.saveToLocalStorage()
      }
    },

    setEvaluationScore(score: number | null) {
      this.evaluationScore = score
      this.saveToLocalStorage()
    },

    setStudentName(name: string) {
      this.studentName = name
      this.saveToLocalStorage()
    },

    resetProgress() {
      this.visitedHome = false
      this.readContents = []
      this.exploredResources = []
      this.completedActivities = []
      this.evaluationScore = null
      this.studentName = ''
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      if (import.meta.client) {
        const data: ProgressData = {
          visitedHome: this.visitedHome,
          readContents: this.readContents,
          exploredResources: this.exploredResources,
          completedActivities: this.completedActivities,
          evaluationScore: this.evaluationScore,
          studentName: this.studentName
        }
        localStorage.setItem('ova_computational_thinking_progress', JSON.stringify(data))
      }
    },

    loadFromLocalStorage() {
      if (this.isLoaded) return
      if (import.meta.client) {
        const raw = localStorage.getItem('ova_computational_thinking_progress')
        if (raw) {
          try {
            const parsed: ProgressData = JSON.parse(raw)
            if (parsed.visitedHome !== undefined) this.visitedHome = parsed.visitedHome
            if (parsed.readContents !== undefined) this.readContents = parsed.readContents
            if (parsed.exploredResources !== undefined) this.exploredResources = parsed.exploredResources
            if (parsed.completedActivities !== undefined) this.completedActivities = parsed.completedActivities
            if (parsed.evaluationScore !== undefined) this.evaluationScore = parsed.evaluationScore
            if (parsed.studentName !== undefined) this.studentName = parsed.studentName
          } catch (e) {
            console.error('Error al cargar progreso desde localStorage:', e)
          }
        }
        this.isLoaded = true
      }
    }
  }
})
