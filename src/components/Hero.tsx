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
        imgClass="w-32 h-40 sm:w-48 sm:h-64 rounded-2xl shadow-2xl"
        distance={25}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
        >
          <div className="text-center mt-10">
            <h1 className="text-7xl md:text-[11rem] font-avenue tracking-tight text-white leading-[0.8] drop-shadow-2xl uppercase">
              SEM REDE
            </h1>
            <div className="md:-mt-12 -mt-6">
              <GradientText
                colors={["#0732C1", "#1371F9", "#80C2FD", "#1371F9", "#0732C1"]}
                animationSpeed={3}
                showBorder={false}
                className="text-6xl md:text-[9.5rem] font-behind italic leading-[1.2] drop-shadow-xl px-12 py-4"
                style={{ fontFamily: 'BehindTheNineties, cursive' }}
              >
                sem jogo!
              </GradientText>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <p className="text-sm md:text-base font-inter font-bold text-white uppercase tracking-[0.4em] mb-6 drop-shadow-md">
              Redes esportivas para
            </p>
            <div className="w-full flex justify-center h-24 md:h-32">
              <MorphingText
                texts={sports}
                className="text-white font-avenue font-bold text-5xl md:text-8xl uppercase drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </ImageCursorTrail>
    </section>
  );
}
