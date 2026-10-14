"use client"

import { useEffect, useId, useState } from "react"
import type { ComponentType } from "react"

/**
 * Partículas "sparkles" (tsParticles).
 * O tsParticles (~100KB) é carregado via import dinâmico, só quando o componente é montado
 * (Partners monta apenas perto da viewport) — sai do bundle inicial.
 */
export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
  id: propId,
}: any) {
  const [Particles, setParticles] = useState<ComponentType<any> | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [{ default: ParticlesComponent, initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("@tsparticles/react"),
        import("@tsparticles/slim"),
      ])
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
      if (!cancelled) setParticles(() => ParticlesComponent)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const generatedId = useId()
  const id = propId || generatedId

  const defaultOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 60,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none",
        speed: { min: minSpeed || speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity || opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize || size / 2.5, max: size } },
    },
    detectRetina: false,
  }

  return Particles ? <Particles id={id} options={{ ...defaultOptions, ...options }} className={className} /> : null
}
