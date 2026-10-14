import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/** Reage a uma media query sem render extra / flash de layout (SSR-safe). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** < md do Tailwind */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** Dispositivo com mouse de verdade (não touch) */
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * Observa se o elemento está (quase) na tela. Usado para pausar loops caros
 * (partículas, morphing, gradientes) quando a seção não está visível.
 */
export function useInView<T extends Element>(rootMargin = '200px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
