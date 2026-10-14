import { motion, useScroll, useSpring, type MotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/lib/hooks"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
}

function ScrollProgressBar({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  // Mola leve: o indicador desliza em vez de "pular" a cada tick de scroll
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-secondaryBlue to-brand-lightBlue will-change-transform",
        className
      )}
      style={{
        scaleX,
      }}
      {...props}
    />
  )
}

/** A barra é exclusiva do mobile — no desktop nem monta (zero listeners de scroll). */
export function ScrollProgress(props: ScrollProgressProps) {
  const isMobile = useIsMobile()
  return isMobile ? <ScrollProgressBar {...props} /> : null
}

