/**
 * tipos principales de la aplicación OVA
 */

export interface NavItem {
  title: string
  to: string
  icon: string
}

export interface Pillar {
  id: string
  num: number
  title: string
  icon: string
  slogan: string
  desc: string
  bgColor: string
}

export interface TerminalButton {
  label: string
  command: string
  cmdText: string
  icon: string
}

export interface Content {
  id: string
  title: string
  description: string
  content: string
}

export interface Activity {
  id: string
  title: string
  description: string
  type: 'sorting' | 'multiple-choice' | 'matching' | 'maze'
  completed: boolean
}

export interface ProgressData {
  visitedHome: boolean
  readContents: string[]
  exploredResources: string[]
  completedActivities: string[]
  evaluationScore: number | null
  studentName: string
}
