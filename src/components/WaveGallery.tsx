import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

/** Imagens de teste (9 únicas) — trocar pelas fotos reais das quadras depois. */
const IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBB-1eNzNMpzF9FF-U9J8dKHlyEfQhTUKl-PR3VSSjr4X5PzUvXAYeMk&s=10',
  'https://i.pinimg.com/736x/e7/2b/98/e72b98b6322ee37cb009bf1c763c043d.jpg',
  'https://i.pinimg.com/736x/45/9a/9f/459a9f54b32dd5bfa8f7cb82f7f5e151.jpg',
  'https://i.pinimg.com/1200x/d8/8a/97/d88a97dbb18e57958f4a495426057d00.jpg',
  'https://i.pinimg.com/736x/5a/b2/1e/5ab21ea4c3984ebbf6b1b7fa8eee11b8.jpg',
  'https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg',
  'https://i.pinimg.com/1200x/66/ba/69/66ba699e00a8bddaf1f8ccb83169f055.jpg',
  'https://i.pinimg.com/736x/13/b9/cf/13b9cf9ce6008271b2cd5c9a948c986c.jpg',
  'https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg',
];

type Column = { images: { src: string; ratio: string }[]; travel: number; reverse: boolean };

/**
 * Distribui as 9 imagens (sem repetir) em N colunas.
 * `sizes` = quantas imagens por coluna; `ratios` = proporções usadas em ordem.
 * Colunas com menos imagens usam proporções mais altas para continuar cobrindo a altura.
 */
function buildColumns(sizes: number[], travels: number[]): Column[] {
  let cursor = 0;
  return sizes.map((count, c) => {
    const ratios =
      count <= 2 ? ['aspect-[2/3]', 'aspect-[3/5]'] : ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]'];
    const images = Array.from({ length: count }, (_, i) => ({
      src: IMAGES[cursor++],
      ratio: ratios[i % ratios.length],
    }));
    return { images, travel: travels[c], reverse: c % 2 === 1 };
  });
}

/**
 * Um layout por breakpoint (cada um usa as 9 imagens uma única vez):
 *  - mobile: 2 colunas (≈1,7 visíveis)
 *  - tablet: 3 colunas (≈2,5 visíveis)
 *  - desktop: 4 colunas (≈3,3 visíveis) — meio-termo entre "muitas" e "gigantes"
 * Imagens com loading="lazy" em layouts ocultos (display:none) não são baixadas.
 */
const LAYOUTS = [
  { className: 'grid grid-cols-2 md:hidden', columns: buildColumns([5, 4], [10, 14]) },
  { className: 'hidden md:grid lg:hidden grid-cols-3', columns: buildColumns([3, 3, 3], [10, 14, 11]) },
  { className: 'hidden lg:grid grid-cols-4', columns: buildColumns([3, 2, 2, 2], [10, 9, 8, 9]) },
];

function GalleryColumn({ column, progress }: { column: Column; progress: MotionValue<number> }) {
  // Sobe: 0% → -travel% | Desce: -travel% → 0% (nunca abre buraco no topo da coluna)
  const y = useTransform(
    progress,
    [0, 1],
    column.reverse ? [`-${column.travel}%`, '0%'] : ['0%', `-${column.travel}%`]
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex flex-col will-change-transform" style={{ y }}>
        {column.images.map((img) => (
          <figure key={img.src} className={`relative w-full ${img.ratio} overflow-hidden m-0`}>
            <img
              src={img.src}
              alt="Quadra equipada com rede Toinho Redes"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export default function WaveGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Progresso de 0 → 1 enquanto a seção atravessa a viewport (entra por baixo, sai por cima)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Mola leve por cima do scroll: movimento sedoso e com leve inércia, sem "degraus"
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const progress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-label="Galeria de quadras com redes Toinho"
      className="wave-mask relative w-full h-[80vh] min-h-[520px] md:h-[90vh] md:min-h-[680px] md:max-h-[980px] overflow-hidden bg-brand-blue"
    >
      {LAYOUTS.map((layout, l) => (
        // Grid levemente inclinado e maior que a tela para cobrir os cantos após a rotação
        <div key={l} className={`absolute -inset-x-[10%] -inset-y-[12%] rotate-[-4deg] ${layout.className}`}>
          {layout.columns.map((column, c) => (
            <GalleryColumn key={c} column={column} progress={progress} />
          ))}
        </div>
      ))}
    </section>
  );
}
