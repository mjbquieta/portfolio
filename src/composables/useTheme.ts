import { ref, watch, onMounted } from 'vue'
import type { Theme } from '../types'

// Theme composable for managing light/dark mode with persistence
const theme = ref<Theme>('dark')
const isTransitioning = ref(false)

export function useTheme() {
  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null
    if (savedTheme) {
      theme.value = savedTheme
    } else {
      // Default to dark (space theme) or check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme(theme.value)
  }

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    isTransitioning.value = true
    theme.value = theme.value === 'dark' ? 'light' : 'dark'

    // Reset transition state after animation completes
    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }

  // Watch for theme changes and persist
  watch(theme, (newTheme) => {
    localStorage.setItem('portfolio-theme', newTheme)
    applyTheme(newTheme)
  })

  onMounted(() => {
    initTheme()
  })

  return {
    theme,
    isTransitioning,
    toggleTheme,
    isDark: () => theme.value === 'dark',
    isLight: () => theme.value === 'light'
  }
}
