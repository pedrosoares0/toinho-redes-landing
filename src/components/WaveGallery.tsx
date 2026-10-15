import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

/** 12 imagens autênticas e únicas (Pinterest + fotos reais Toinho Redes) — zero repetição. */
const IMAGES = [
  // Coluna 1: Bloqueio Copaya no topo, Bicicleta futevôlei no centro, Rede Mali na base
  'https://i.pinimg.com/736x/13/b9/cf/13b9cf9ce6008271b2cd5c9a948c986c.jpg',
  'https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg',
  '/img/gallery-mali.webp',

  // Coluna 2: Beach tennis no topo, Rede ao entardecer no centro, Clube Bahiano na base
  'https://i.pinimg.com/736x/45/9a/9f/459a9f54b32dd5bfa8f7cb82f7f5e151.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBB-1eNzNMpzF9FF-U9J8dKHlyEfQhTUKl-PR3VSSjr4X5PzUvXAYeMk&s=10',
  '/img/gallery-clube-baiano.webp',

  // Coluna 3: Ataque calção preto no topo, Quadra pôr do sol no centro, Lance na rede na base
  'https://i.pinimg.com/736x/e7/2b/98/e72b98b6322ee37cb009bf1c763c043d.jpg',
  'https://i.pinimg.com/1200x/66/ba/69/66ba699e00a8bddaf1f8ccb83169f055.jpg',
  'https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg',

  // Coluna 4: Defesa MrJack no topo, Salto céu azul no centro, Arena Praiana na base
  'https://i.pinimg.com/736x/5a/b2/1e/5ab21ea4c3984ebbf6b1b7fa8eee11b8.jpg',
  'https://i.pinimg.com/1200x/d8/8a/97/d88a97dbb18e57958f4a495426057d00.jpg',
  '/img/gallery-praiana.webp',
];

type Column = { images: { src: string; ratio: string }[]; travel: number; reverse: boolean };

function buildColumns(sizes: number[], travels: number[]): Column[] {
  let cursor = 0;
  return sizes.map((count, c) => {
    // Proporção 4:3 idêntica para todas as colunas garante divisão e centralização uniformes
    const images = Array.from({ length: count }, () => ({
      src: IMAGES[cursor++ % IMAGES.length],
      ratio: 'aspect-[4/3]',
    }));
    return { images, travel: travels[c], reverse: c % 2 === 1 };
  });
}

const LAYOUT_CONFIGS = {
  2: { className: 'grid-cols-2', columns: buildColumns([4, 4], [8, 8]) },
  3: { className: 'grid-cols-3', columns: buildColumns([3, 3, 3], [8, 7, 8]) },
  4: { className: 'grid-cols-4', columns: buildColumns([3, 3, 3, 3], [8, 7, 8, 7]) },
};

function useLayoutCols(): 2 | 3 | 4 {
  const [cols, setCols] = useState<2 | 3 | 4>(() => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    return w < 768 ? 2 : w < 1024 ? 3 : 4;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const next = w < 768 ? 2 : w < 1024 ? 3 : 4;
      setCols((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return cols;
}

function GalleryColumn({ column, progress }: { column: Column; progress: MotionValue<number> }) {
  // Deslocamento seguro com buffer fixo para garantir que nenhuma fresta azul apareça no topo ou na base
  const startY = column.reverse ? `-${column.travel + 3}%` : `-3%`;
  const endY = column.reverse ? `-3%` : `-${column.travel + 3}%`;

  const y = useTransform(progress, [0, 1], [startY, endY]);

  return (
    <div className="relative overflow-hidden w-full">
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
  const cols = useLayoutCols();
  const layout = LAYOUT_CONFIGS[cols];

  // Progresso direto do scroll da viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-label="Galeria de quadras com redes Toinho"
      className="wave-mask relative w-full h-[72vh] min-h-[500px] md:h-[80vh] md:min-h-[580px] md:max-h-[720px] overflow-hidden bg-brand-blue"
    >
      {/* Grid inclinado cobrindo toda a extensão com margem de segurança */}
      <div className={`absolute -inset-x-[10%] -inset-y-[10%] rotate-[-3.5deg] grid ${layout.className}`}>
        {layout.columns.map((column, c) => (
          <GalleryColumn key={`${cols}-${c}`} column={column} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
