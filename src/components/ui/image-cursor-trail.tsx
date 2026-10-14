"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ImageMouseTrailProps {
  items: string[]
  children?: ReactNode
  className?: string
  imgClass?: string
  distance?: number
  maxNumberOfImages?: number
  fadeAnimation?: boolean
}

/**
 * Rastro de imagens que segue o cursor (desktop) ou o dedo (mobile).
 *  - As imagens só são baixadas quando o navegador está ocioso (não competem com o LCP).
 *  - Estado vive em refs (antes era recriado a cada render).
 *  - Touch: threshold maior e menos imagens simultâneas para manter 60fps em celular.
 */
export function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const s = useRef({
    index: 0,
    z: 1,
    last: { x: 0, y: 0 },
    idleTimer: 0 as number,
  })
  const [ready, setReady] = useState(false)

  // Carrega as imagens só quando ocioso
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => () => clearTimeout(s.current.idleTimer), [])

  const deactivate = (image: HTMLImageElement | null | undefined) => {
    if (image) image.dataset.status = "inactive"
  }

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    image.style.left = `${x - rect.left}px`
    image.style.top = `${y - rect.top}px`

    if (s.current.z > 40) s.current.z = 1
    image.style.zIndex = String(s.current.z++)

    image.dataset.status = "active"
    if (fadeAnimation) setTimeout(() => deactivate(image), 1500)
    s.current.last = { x, y }

    // Some após inatividade
    clearTimeout(s.current.idleTimer)
    s.current.idleTimer = window.setTimeout(() => {
      imgRefs.current.forEach(deactivate)
    }, 500)
  }

  const handleMove = (clientX: number, clientY: number, touch: boolean) => {
    const st = s.current
    const threshold = window.innerWidth / (touch ? distance / 3 : distance)
    if (Math.hypot(clientX - st.last.x, clientY - st.last.y) <= threshold) return

    const total = imgRefs.current.length
    const max = touch ? Math.min(maxNumberOfImages, 4) : maxNumberOfImages
    const lead = imgRefs.current[st.index % total]
    const tail = imgRefs.current[(((st.index - max) % total) + total) % total]
    if (lead) activate(lead, clientX, clientY)
    if (st.index >= max) deactivate(tail)
    st.index++
  }

  return (
    <div
      onMouseMove={(e) => handleMove(e.clientX, e.clientY, false)}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) handleMove(t.clientX, t.clientY, true)
      }}
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {items.map((item, index) => (
        <img
          key={index}
          className={cn(
            "opacity-0 pointer-events-none absolute -translate-x-[50%] -translate-y-[50%] scale-0 rounded-3xl object-cover transition-transform duration-300 will-change-transform data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
            imgClass,
          )}
          data-index={index}
          data-status="inactive"
          src={ready ? item : undefined}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable={false}
          ref={(el) => {
            imgRefs.current[index] = el
          }}
        />
      ))}
      {children}
    </div>
  )
}
