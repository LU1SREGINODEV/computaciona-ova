// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  vuetify: {
    moduleOptions: {
      importComposables: true,
      useVuetifyLabs: false
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'techDark',
        themes: {
          techDark: {
            dark: true,
            colors: {
              background: '#070a13',
              surface: '#111726',
              'surface-variant': '#1e293b',
              primary: '#00f0ff',
              secondary: '#bd00ff',
              accent: '#39ff14',
              error: '#ff007f',
              info: '#00d2ff',
              success: '#10b981',
              warning: '#f59e0b'
            }
          }
        }
      },
      icons: {
        defaultSet: 'mdi'
      }
    }
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/css/main.css'
  ],

  app: {
    head: {
      title: 'Pensamiento Computacional - OVA 9°',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Objeto Virtual de Aprendizaje sobre Pensamiento Computacional para 9° grado' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  typescript: {
    strict: false,
    typeCheck: false
  }
})
