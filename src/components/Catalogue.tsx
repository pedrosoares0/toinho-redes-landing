import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AwardBadge } from './ui/award-badge';
import { StarButton } from './ui/star-button';

const products = [
  {
    name: '3 Faixas',
    tag: 'A CLÁSSICA',
    badgeTop: 'MODELO',
    description: 'Rede profissional com tripla camada de reforço para máxima resistência.',
    material: '100% NYLON',
    images: ['3faixas3.png']
  },
  {
    name: '4 Faixas',
    tag: 'A MAIS PEDIDA',
    badgeTop: 'PREMIUM',
    description: 'O máximo em durabilidade e tensão para jogos intensos e profissionais.',
    material: '100% NYLON',
    images: ['4faixas.png', '4faixas2.png']
  },
  {
    name: 'Orelha',
    tag: 'CLASSIC DESIGN',
    badgeTop: 'TRADICIONAL',
    description: 'Design clássico com fixação reforçada nas extremidades para maior estabilidade.',
    material: '100% NYLON',
    images: ['https://6d995b8381.cbaul-cdnwnd.com/38958216990b58d66c8d7fd8b0c6ff46/200000301-ad357ae2f3/IMG_5107-9.JPG?ph=6d995b8381']
  },
  {
    name: 'Profissional',
    tag: 'OFICIAIS',
    badgeTop: 'ELITE',
    description: 'Instalação de elite para grandes jogos e competições oficiais.',
    material: '100% NYLON',
    images: [
      'https://anotabahia.com/wp-content/uploads/2022/11/anotabahia-bahia-open-de-futevolei-bahia-open-de-futevolei.jpg',
      'https://www.ba.gov.br/comunicacao/sites/site-comunicacao/files/2025-06/08.11.2024%20VII%20etapa%20do%20Campeonato%20Baiano%20de%20Futev%C3%B4lei%202024%20em%20Salvador%20-%20Ana%20Teresa%20Tavares%20-%20Ascom%20Sudesb%20%2811%29.JPG',
      'https://portoseguro.ba.gov.br/assets/img/posts/ii-porto-seguro-open-de-futevolei-emociona-torcida-no-arraial-d-ajuda.jpeg'
    ]
  }
];

export default function Catalogue() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const product = products[currentIndex];
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % product.images.length);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setImageIndex(0);
    }
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + products.length) % products.length);
    setImageIndex(0); // Reset image index on pagination
  };

  return (
    <section id="catalogo" className="py-24 md:py-48 bg-white overflow-hidden relative min-h-screen flex flex-col justify-center">
      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.span 
          key={currentIndex}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[30vw] font-avenue font-black text-brand-blue tracking-tighter leading-none whitespace-nowrap"
        >
          {products[currentIndex].name.toUpperCase()}
        </motion.span>
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10 w-full flex flex-col items-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-6xl md:text-[10rem] font-avenue font-black tracking-tighter text-brand-blue uppercase leading-[0.8] mb-4">
            Nossos <br />
            <span className="text-brand-lightBlue">Modelos</span>
          </h2>
        </motion.div>

        <div className="relative w-full max-w-6xl h-[500px] md:h-[700px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full max-w-[350px] md:max-w-[500px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-black group cursor-grab active:cursor-grabbing border border-white/10"
            >
              {/* Images Container */}
              <div className="absolute inset-0">
                <AnimatePresence>
                  <motion.img
                    key={products[currentIndex].images[imageIndex]}
                    src={products[currentIndex].images[imageIndex]}
                    alt={products[currentIndex].name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-4">
                    <AwardBadge 
                      topText={products[currentIndex].badgeTop} 
                      mainText={products[currentIndex].tag} 
                      index={currentIndex} 
                    />
                    <h3 className="text-3xl md:text-6xl font-avenue font-black text-white uppercase tracking-tighter leading-none">
                      {products[currentIndex].name}
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-sm md:text-base font-medium tracking-wide leading-relaxed line-clamp-2">
                    {products[currentIndex].description}
                  </p>
                  
                  <StarButton 
                    className="w-full"
                    lightColor="#1371F9"
                    backgroundColor="transparent"
                  >
                    Solicitar Orçamento
                  </StarButton>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-24 md:bottom-auto md:left-0 md:right-0 md:flex md:justify-between md:px-8 z-20 pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="hidden md:flex w-20 h-20 rounded-full bg-brand-blue/90 backdrop-blur-md text-white items-center justify-center hover:bg-brand-lightBlue transition-all hover:scale-110 pointer-events-auto shadow-2xl border border-white/20"
            >
              <FaChevronLeft size={28} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="hidden md:flex w-20 h-20 rounded-full bg-brand-blue/90 backdrop-blur-md text-white items-center justify-center hover:bg-brand-lightBlue transition-all hover:scale-110 pointer-events-auto shadow-2xl border border-white/20"
            >
              <FaChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-4 mt-40">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
                setImageIndex(0);
              }}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === currentIndex ? 'w-24 bg-brand-blue' : 'w-6 bg-brand-blue/20'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
