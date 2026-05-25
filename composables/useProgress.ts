/**
 * Composable para manejar el progreso del usuario.
 * Carga el progreso desde localStorage al montarse el componente.
 */
import { useProgressStore } from '../stores/progress'

export const useProgress = () => {
  return useProgressStore()
}
