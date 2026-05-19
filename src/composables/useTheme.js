import { ref } from 'vue'

const isDark = ref(false)

export function useTheme() {
  function initTheme() {
    const saved = localStorage.getItem('admin_theme')
    isDark.value = saved === 'dark'
    applyTheme()
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('admin_theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  return { isDark, initTheme, toggleTheme }
}
