import { MorphingText } from "@/components/ui/liquid-text";
import { ImageCursorTrail } from "@/components/ui/image-cursor-trail";
import GradientText from "@/components/ui/GradientText";
import { motion } from "motion/react";

const sports = ["FUTEVÔLEI", "BEACH TENNIS", "VÔLEI", "TÊNIS"];

// Servidas do próprio site (public/img) — geradas por `npm run optimize:images`
const images = Array.from({ length: 9 }, (_, i) => `/img/hero-trail-${i + 1}.webp`);

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image — zoom lento via CSS (compositor), imagem real p/ prioridade de LCP */}
      <img
        src="/bgherolight.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="hero-kenburns absolute inset-0 z-0 h-full w-full object-cover object-center dark:brightness-[0.45] dark:saturate-[0.8]"
      />

      <ImageCursorTrail
        items={images}
        className="absolute inset-0 z-10 h-full w-full"
        imgClass="w-28 h-36 sm:w-40 sm:h-52 md:w-48 md:h-64 rounded-2xl shadow-2xl"
        distance={25}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 pt-12 sm:pt-16"
        >
          <div className="text-center flex flex-col items-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-avenue tracking-tight text-white leading-[0.85] drop-shadow-2xl uppercase">
              SEM REDE
            </h1>
            <div className="-mt-3 sm:-mt-6 md:-mt-8">
              <GradientText
                colors={["#0732C1", "#1371F9", "#80C2FD", "#1371F9", "#0732C1"]}
                animationSpeed={3}
                showBorder={false}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-behind italic leading-[1.1] drop-shadow-xl px-6 sm:px-10 py-2 sm:py-3"
                style={{ fontFamily: 'BehindTheNineties, cursive' }}
              >
                sem jogo!
              </GradientText>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-14 flex flex-col items-center">
            <p className="text-[10px] sm:text-xs md:text-sm font-sans font-bold text-white/90 uppercase tracking-[0.35em] mb-2 sm:mb-4 drop-shadow-md">
              Redes esportivas para
            </p>
            <div className="w-full flex justify-center h-14 sm:h-18 md:h-20">
              <MorphingText
                texts={sports}
                className="text-white font-avenue font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </ImageCursorTrail>
    </section>
  );
}
