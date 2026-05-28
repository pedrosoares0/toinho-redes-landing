import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Star, ShieldCheck, Trophy, MapPin } from 'lucide-react';
import SmoothScrollHero from '@/components/ui/smooth-scroll-hero';
import LiquidGlassSVG from './LiquidGlassSVG';
import TextReveal from './ui/text-reveal';

function CountUp({ end, duration = 2, start }: { end: number, duration?: number, start: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (start) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [start, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const scrollHeight = 2000; // A bit more scroll for a smoother transition

  return (
    <section id="sobre" className="relative w-full">
      <SmoothScrollHero
        scrollHeight={scrollHeight}
        desktopImage="https://navegantes.sc.gov.br/wp-content/uploads/2025/01/Circuito-Brasileiro-de-Volei-de-Praia-Credito-da-foto-Mauricio-Val-FV-Imagem-CBV-4.jpg"
        mobileImage="https://mir-s3-cdn-cf.behance.net/project_modules/fs/8f1ae7135567345.623b402809d39.jpg"
        initialClipPercentage={25}
        finalClipPercentage={75}
      >
        {(progress: MotionValue<number>) => {
          // Content reveals only after the image is fully clipped (progress > 0.6)
          const contentOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);
          const contentScale = useTransform(progress, [0.6, 0.8], [0.95, 1]);
          const contentY = useTransform(progress, [0.6, 0.8], [20, 0]);

          return (
            <div className="relative w-full h-full">
              <motion.div
                style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
                className="relative z-10 w-full h-full flex items-center justify-center p-6"
              >
                <StatsContent progress={progress} />
              </motion.div>
            </div>
          );
        }}
      </SmoothScrollHero>
    </section>
  );
}

function StatsContent({ progress }: { progress: MotionValue<number> }) {
  const [shouldStartCount, setShouldStartCount] = useState(false);

  useEffect(() => {
    return progress.onChange((latest) => {
      if (latest > 0.75) setShouldStartCount(true);
    });
  }, [progress]);

  const liquidGlassStyle = {
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 8px, rgba(0, 0, 0, 0.15) 0px -10px 25px inset, rgba(255, 255, 255, 0.74) 0px -1px 4px 1px inset",
    backdropFilter: "blur(12px) brightness(1.05) saturate(1.2)",
    WebkitBackdropFilter: "blur(12px) brightness(1.05) saturate(1.2)",
    backgroundColor: "rgba(255, 255, 255, 0.04)"
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const staggerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4">
      {/* SVG Liquid Glass Filter definitions */}
      <LiquidGlassSVG />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-3 md:mb-4 gap-1.5 md:gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-brand-lightBlue/40" />
          <span className="text-brand-white text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.4em]">
            Trajetória de Sucesso
          </span>
          <div className="w-8 h-[1px] bg-brand-lightBlue/40" />
        </div>
        <div className="text-3xl md:text-5xl lg:text-6xl font-avenue font-black text-white uppercase leading-none tracking-tighter text-center flex flex-col items-center">
          <TextReveal text="A mais famosa" className="text-white" />
          <TextReveal text="da Bahia" className="text-brand-lightBlue mt-1" />
        </div>
        <p className="text-white/80 text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] max-w-md mt-1">
          Liderança absoluta em redes esportivas de alta performance por todo o território baiano.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 h-auto md:h-[310px] lg:h-[350px]">
        {/* Main Stat Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
          className="md:col-span-8 bg-white/[0.03] rounded-2xl md:rounded-[1.5rem] p-4 md:p-6 lg:p-7 relative overflow-hidden group border border-white/10 flex flex-col justify-between"
          style={liquidGlassStyle}
        >
          <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 pointer-events-none">
            <MapPin size={320} className="text-white -rotate-12 hidden md:block" />
            <MapPin size={160} className="text-white -rotate-12 md:hidden" />
          </div>

          <motion.div variants={staggerItemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 md:mb-4 lg:mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-lightBlue animate-pulse" />
              <span className="text-[8px] md:text-[9px] font-sans font-black text-white/95 uppercase tracking-[0.15em]">Baianidade</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-brand-lightBlue font-avenue font-black text-2xl md:text-4xl">+</span>
              <h3 className="text-white font-avenue font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter">
                <CountUp end={930} start={shouldStartCount} />
              </h3>
            </div>
          </motion.div>

          <motion.div variants={staggerItemVariants} className="max-w-md relative z-10 mt-2 md:mt-0">
            <p className="text-white font-avenue text-lg md:text-xl lg:text-2xl uppercase leading-tight mb-1.5 tracking-tight">
              Quadras equipadas em todo o país.
            </p>
            <p className="text-white/80 text-[10px] md:text-xs font-sans font-semibold leading-relaxed max-w-xs md:max-w-sm">
              Nossa qualidade é a escolha de quem busca o melhor desempenho e durabilidade absoluta em cada jogo.
            </p>
          </motion.div>
        </motion.div>

        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 md:gap-4">
          {/* Events Stat Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="bg-white/[0.03] rounded-2xl md:rounded-[1.5rem] p-4 md:p-5 lg:p-6 border border-white/5 flex flex-col justify-between group transition-all duration-500 hover:bg-white/[0.06] gap-2 md:gap-0 relative overflow-hidden"
            style={liquidGlassStyle}
          >
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 pointer-events-none">
              <Trophy size={100} className="text-white -rotate-12 md:hidden" />
              <Trophy size={180} className="text-white -rotate-12 hidden md:block" />
            </div>

            <motion.div variants={staggerItemVariants} className="flex flex-col md:flex-row justify-between items-start gap-1 relative z-10">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-brand-lightBlue/10 border border-brand-blue/20 flex items-center justify-center text-brand-lightBlue group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Trophy size={16} />
              </div>
              <span className="text-[8px] md:text-[9px] font-sans font-black text-brand-lightBlue/90 uppercase tracking-[0.2em]">Parceria</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="relative z-10 mt-1 md:mt-2">
              <h4 className="text-white font-avenue font-black text-3xl md:text-5xl lg:text-6xl leading-none">
                +<CountUp end={200} start={shouldStartCount} />
              </h4>
              <p className="text-white/95 text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.15em] mt-1 md:mt-1.5">Eventos Patrocinados</p>
            </motion.div>
          </motion.div>

          {/* Experience Stat Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="bg-brand-lightBlue/30 rounded-2xl md:rounded-[1.5rem] p-4 md:p-5 lg:p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:brightness-110 gap-2 md:gap-0"
            style={liquidGlassStyle}
          >
            <div className="absolute -right-6 -bottom-6 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-700 pointer-events-none">
              <ShieldCheck size={100} className="text-brand-blue -rotate-12 md:hidden" />
              <ShieldCheck size={180} className="text-brand-blue -rotate-12 hidden md:block" />
            </div>

            <motion.div variants={staggerItemVariants} className="flex flex-col md:flex-row justify-between items-start relative z-10 gap-1">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-brand-blue flex items-center justify-center text-white shadow-md transition-all">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[8px] md:text-[9px] font-sans font-black text-brand-blue/90 uppercase tracking-[0.2em]">Tradição</span>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="relative z-10 mt-1 md:mt-2">
              <h4 className="text-brand-blue font-avenue font-black text-2xl md:text-4xl lg:text-5xl leading-none">
                <CountUp end={10} start={shouldStartCount} /> ANOS
              </h4>
              <p className="text-brand-blue/95 text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.15em] mt-1 md:mt-1.5">No Mercado</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
