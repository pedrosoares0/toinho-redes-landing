import { useCallback, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { useInView } from '@/lib/hooks';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  colors?: string[];
  /** Segundos para ir de uma ponta à outra do gradiente (yoyo) */
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

/**
 * Texto com gradiente animado.
 * Antes: loop de requestAnimationFrame + MotionValue atualizando o React/DOM a cada frame.
 * Agora: keyframes CSS (zero JS por frame) que ainda pausam quando o texto sai da tela.
 */
export default function GradientText({
  children,
  className = '',
  style = {},
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>('100px');

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setHovered(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Primeira cor repetida no final para loop contínuo
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat',
  };

  const animationStyle = {
    '--gradient-speed': `${animationSpeed}s`,
    animationName: direction === 'vertical' ? 'gradient-pan-y' : 'gradient-pan',
    animationDirection: yoyo ? 'alternate' : 'normal',
    animationPlayState: inView && !hovered ? 'running' : 'paused',
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center transition-shadow duration-500 cursor-pointer overflow-visible ${showBorder ? 'py-1 px-2' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <div
          className="gradient-pan absolute inset-0 z-0 pointer-events-none rounded-[1.25rem] overflow-visible"
          style={{ ...gradientStyle, ...animationStyle }}
        >
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      <div
        className="gradient-pan inline-block relative z-[2] text-transparent bg-clip-text overflow-visible"
        style={{ ...gradientStyle, ...animationStyle, WebkitBackgroundClip: 'text', ...style }}
      >
        {children}
      </div>
    </div>
  );
}
