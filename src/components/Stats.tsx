import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Star, ShieldCheck, Trophy, MapPin } from 'lucide-react';
import SmoothScrollHero from '@/components/ui/smooth-scroll-hero';

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
        desktopImage="/sem-titulo-1.png"
        mobileImage="/sem-titulo-1.png"
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

  return (
    <div className="max-w-6xl mx-auto w-full px-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-brand-lightBlue/40" />
          <span className="text-brand-lightBlue text-[10px] font-sans font-black uppercase tracking-[0.4em]">
            Trajetória de Sucesso
          </span>
          <div className="w-8 h-[1px] bg-brand-lightBlue/40" />
        </div>
        <h2 className="text-5xl md:text-8xl font-avenue font-black text-white uppercase leading-none tracking-tighter">
          A mais famosa <br />
          <span className="text-brand-lightBlue">da Bahia</span>
        </h2>
        <p className="text-white/60 text-xs font-sans font-bold uppercase tracking-[0.2em] max-w-md mt-2">
          Liderança absoluta em redes esportivas de alta performance por todo o território nacional.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[480px]">
        {/* Main Stat Card */}
        <div className="md:col-span-8 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-10 relative overflow-hidden group border border-white/10 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.06] shadow-2xl">
          <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700">
            <MapPin size={320} className="text-white -rotate-12" />
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-lightBlue" />
              <span className="text-[9px] font-sans font-black text-white/80 uppercase tracking-[0.15em]">Presença Nacional</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-brand-lightBlue font-avenue font-black text-4xl md:text-5xl">+</span>
              <h3 className="text-white font-avenue font-black text-7xl md:text-9xl leading-none tracking-tighter">
                <CountUp end={1000} start={shouldStartCount} />
              </h3>
            </div>
          </div>
          
          <div className="max-w-md relative z-10">
            <p className="text-white font-avenue text-2xl md:text-3xl uppercase leading-tight mb-3 tracking-tight">
              Quadras equipadas em todo o país.
            </p>
            <p className="text-white/40 text-[13px] font-sans font-medium leading-relaxed max-w-sm">
              Nossa qualidade é a escolha de quem busca o melhor desempenho e durabilidade absoluta em cada jogo.
            </p>
          </div>
        </div>

        <div className="md:col-span-4 grid grid-rows-2 gap-5">
          {/* Quality Stat Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between group transition-all duration-500 hover:bg-white/[0.06] shadow-xl">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-brand-lightBlue/10 border border-brand-lightBlue/20 flex items-center justify-center text-brand-lightBlue group-hover:scale-110 transition-all duration-500">
                <Star size={24} />
              </div>
              <span className="text-[9px] font-sans font-black text-white/20 uppercase tracking-[0.2em]">Satisfação</span>
            </div>
            <div>
              <h4 className="text-white font-avenue font-black text-6xl md:text-7xl leading-none">100%</h4>
              <p className="text-white/30 text-[10px] font-sans font-bold uppercase tracking-[0.2em] mt-2">Aprovação total dos clientes</p>
            </div>
          </div>

          {/* Experience Stat Card */}
          <div className="bg-brand-lightBlue backdrop-blur-xl rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:brightness-110 shadow-xl">
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-all duration-700">
              <Trophy size={180} className="text-brand-blue -rotate-12" />
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-lg transition-all">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[9px] font-sans font-black text-brand-blue/30 uppercase tracking-[0.2em]">Resistência</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-brand-blue font-avenue font-black text-5xl md:text-6xl leading-none">+10 ANOS</h4>
              <p className="text-brand-blue/50 text-[10px] font-sans font-bold uppercase tracking-[0.2em] mt-2">Durabilidade média</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
