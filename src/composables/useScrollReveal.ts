import { ref, onMounted, onUnmounted, type Ref } from 'vue'

// Composable for scroll-based reveal animations using Intersection Observer
export function useScrollReveal(options: IntersectionObserverInit = {}) {
  const isVisible = ref(false)
  const target: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  const setTarget = (el: HTMLElement | null) => {
    target.value = el
  }

  onMounted(() => {
    // Delay to allow template ref to be set
    setTimeout(() => {
      if (!target.value) return

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Once visible, stop observing (one-time reveal)
            observer?.unobserve(entry.target)
          }
        })
      }, defaultOptions)

      observer.observe(target.value)
    }, 0)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    isVisible,
    target,
    setTarget
  }
}

// Hook for parallax scroll effect
export function useParallax(speed: number = 0.5) {
  const offset = ref(0)

  const handleScroll = () => {
    offset.value = window.scrollY * speed
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { offset }
}
