/**
 * Utilidades y helpers para la aplicación
 */

/**
 * Formatea un porcentaje
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(Math.max(0, Math.min(100, value)))}%`
}

/**
 * Obtiene el color basado en un rango de porcentaje
 */
export const getPercentageColor = (percentage: number): string => {
  if (percentage < 25) return 'error'
  if (percentage < 50) return 'warning'
  if (percentage < 75) return 'info'
  return 'success'
}

/**
 * Calcula el tiempo de lectura estimado
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Genera un slug a partir de un texto
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Valida si un email es válido
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
