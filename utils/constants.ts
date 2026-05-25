/**
 * Constantes y datos de la aplicación
 */

import type { Pillar, TerminalButton } from '~~/types'

export const PILLARS: Pillar[] = [
  {
    id: 'abstraccion',
    num: 1,
    title: 'Abstracción',
    icon: 'mdi-square-outline',
    slogan: 'SIMPLIFICAR LO COMPLEJO',
    desc: 'Aprende a identificar los elementos más importantes de un problema, dejando de lado los detalles innecesarios.',
    bgColor: 'primary'
  },
  {
    id: 'descomposicion',
    num: 2,
    title: 'Descomposición',
    icon: 'mdi-puzzle-outline',
    slogan: 'DIVIDIR PARA CONQUISTAR',
    desc: 'Divide los problemas grandes en partes más pequeñas y manejables que sean más fáciles de resolver.',
    bgColor: 'secondary'
  },
  {
    id: 'patrones',
    num: 3,
    title: 'Reconocimiento de Patrones',
    icon: 'mdi-vector-polygon',
    slogan: 'ENCONTRAR SIMILITUDES',
    desc: 'Identifica patrones y reglas que se repiten para aplicar la misma solución múltiples veces.',
    bgColor: 'accent'
  },
  {
    id: 'algoritmos',
    num: 4,
    title: 'Algoritmos',
    icon: 'mdi-code-braces',
    slogan: 'CREAR INSTRUCCIONES',
    desc: 'Desarrolla pasos claros y ordenados para resolver un problema de forma sistemática y repetible.',
    bgColor: 'info'
  }
]

export const TERMINAL_BUTTONS: TerminalButton[] = [
  {
    label: 'Explorar Algoritmo',
    command: 'explore_algorithm',
    cmdText: '$ python explore_algorithm.py',
    icon: 'mdi-play-circle-outline'
  },
  {
    label: 'Decomponer Problema',
    command: 'decompose_problem',
    cmdText: '$ java decompose.Analyzer --verbose',
    icon: 'mdi-puzzle-outline'
  },
  {
    label: 'Encontrar Patrones',
    command: 'find_patterns',
    cmdText: '$ ./pattern_finder --mode intelligent',
    icon: 'mdi-vector-combine'
  },
  {
    label: 'Generar Solución',
    command: 'generate_solution',
    cmdText: '$ node solution_generator.js',
    icon: 'mdi-lightbulb-on-outline'
  }
]
