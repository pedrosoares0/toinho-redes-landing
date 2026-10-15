import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

/**
 * 9 imagens únicas fornecidas pelo usuário — NENHUMA repetição.
 * Distribuídas em 3 colunas de 3 imagens cada (total = 9 imagens).
 */
const COLUMNS = [
  {
    travel: 10,
    reverse: false,
    images: [
      {
        src: 'https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg',
        ratio: 'aspect-[3/4]',
      },
      {
        src: 'https://i.pinimg.com/736x/5a/b2/1e/5ab21ea4c3984ebbf6b1b7fa8eee11b8.jpg',
        ratio: 'aspect-[4/5]',
      },
      {
        src: 'https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg',
        ratio: 'aspect-[3/4]',
      },
    ],
  },
  {
    travel: 14,
    reverse: true,
    images: [
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBB-1eNzNMpzF9FF-U9J8dKHlyEfQhTUKl-PR3VSSjr4X5PzUvXAYeMk&s=10',
        ratio: 'aspect-[4/5]',
      },
      {
        src: 'https://i.pinimg.com/736x/e7/2b/98/e72b98b6322ee37cb009bf1c763c043d.jpg',
        ratio: 'aspect-[2/3]',
      },
      {
        src: 'https://i.pinimg.com/1200x/d8/8a/97/d88a97dbb18e57958f4a495426057d00.jpg',
        ratio: 'aspect-[4/5]',
      },
    ],
  },
  {
    travel: 10,
    reverse: false,
    images: [
      {
        src: 'https://i.pinimg.com/736x/45/9a/9f/459a9f54b32dd5bfa8f7cb82f7f5e151.jpg',
        ratio: 'aspect-[3/4]',
      },
      {
        src: 'https://i.pinimg.com/1200x/66/ba/69/66ba699e00a8bddaf1f8ccb83169f055.jpg',
        ratio: 'aspect-[4/5]',
      },
      {
        src: 'https://i.pinimg.com/736x/13/b9/cf/13b9cf9ce6008271b2cd5c9a948c986c.jpg',
        ratio: 'aspect-[3/4]',
      },
    ],
  },
];

function GalleryColumn({
  column,
  progress,
}: {
  column: (typeof COLUMNS)[number];
  progress: MotionValue<number>;
}) {
  // Sobe: 0% → -travel% | Desce: -travel% → 0% (movimento suave e sutil)
  const y = useTransform(
    progress,
    [0, 1],
    column.reverse ? [`-${column.travel}%`, '0%'] : ['0%', `-${column.travel}%`]
  );

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div className="flex flex-col will-change-transform" style={{ y }}>
        {column.images.map((img, i) => (
          <figure
            key={i}
            className={`relative w-full ${img.ratio} min-h-[220px] sm:min-h-[280px] md:min-h-[380px] overflow-hidden m-0`}
          >
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

  // Progresso de 0 → 1 enquanto a seção atravessa a viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Mola leve por cima do scroll: movimento sedoso e com leve inércia, sem solavancos
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
      className="wave-mask relative w-full h-[75vh] min-h-[500px] md:h-[95vh] md:min-h-[680px] md:max-h-[1050px] overflow-hidden bg-brand-blue"
    >
      {/* Grid inclinado cobrindo toda a largura sem gaps */}
      <div className="absolute -inset-x-[10%] -inset-y-[12%] rotate-[-4deg] grid grid-cols-3">
        {COLUMNS.map((column, c) => (
          <GalleryColumn key={c} column={column} progress={progress} />
        ))}
      </div>
    </section>
  );
}
