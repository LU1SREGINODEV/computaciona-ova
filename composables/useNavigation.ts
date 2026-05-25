/**
 * Composable para los ítems de navegación del OVA.
 * Centraliza la definición de rutas para AppBar y NavDrawer.
 */
export const useNavigation = () => {
  const navItems = [
    { title: 'Inicio', to: '/', icon: 'mdi-home-outline' },
    { title: 'Contenidos', to: '/contenidos', icon: 'mdi-book-open-outline' },
    { title: 'Recursos', to: '/recursos', icon: 'mdi-link-variant' },
    { title: 'Actividades', to: '/actividades', icon: 'mdi-controller-classic-outline' },
    { title: 'Evaluación', to: '/evaluacion', icon: 'mdi-file-certificate-outline' },
    { title: 'Créditos', to: '/creditos', icon: 'mdi-account-group-outline' }
  ]

  return { navItems }
}
