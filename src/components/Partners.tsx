import { Sparkles } from "./ui/Sparkles";
import { motion } from "framer-motion";
export default function Partners() {
  const partners = [
    { name: 'Amstel', logo: '/logo-amstel.png' },
    { name: 'Caffeine', logo: '/logo-caffeine.png' },
    { name: 'Clube', logo: '/logo-clube.png' },
    { name: 'Corona', logo: '/logo-corona.png' },
    { name: 'Gatorade', logo: '/logo-gatorade.png' },
    { name: 'Nu', logo: '/logo-nu.png' },
    { name: 'Mikasa', logo: '/logo-mikasa.png' },
    { name: 'Sol', logo: '/logo-sol.png' },
    { name: 'Vitória', logo: '/logo-vitoria.png' },
    { name: 'Sudesb', logo: '/logo-sudesb.png' },
    { name: 'Fafeb', logo: '/logo-fafeb.png' }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Sparkles
          id="partners-sparkles"
          background="transparent"
          minSize={0.6}
          size={1.4}
          density={80}
          className="w-full h-full"
          color="#0732C1"
        />
      </div>

      <div className="w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center px-4"
        >
          <h2 className="text-4xl md:text-6xl font-avenue font-black tracking-tighter text-brand-blue uppercase leading-none">
            Aprovado por quem entende & <br />
            <span className="text-brand-lightBlue">Requisitado entre os maiores</span>
          </h2>
        </motion.div>

        <div className="relative flex overflow-hidden py-16 md:py-24">
          {/* Continuous Loop Container */}
          <div className="flex animate-infinite-scroll whitespace-nowrap items-center w-max">
            {/* Double the partners to ensure seamless loop */}
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={`${partner.name}-${i}`} 
                className="flex items-center justify-center px-16 md:px-32 group cursor-default flex-shrink-0"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Side Blur Gradients */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
      
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
