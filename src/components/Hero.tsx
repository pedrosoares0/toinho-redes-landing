import { MorphingText } from "@/components/ui/liquid-text";
import { ImageCursorTrail } from "@/components/ui/image-cursor-trail";
import PillNav from "@/components/ui/PillNav";
import GradientText from "@/components/ui/GradientText";
import { motion } from "motion/react";

const sports = ["futevôlei", "beach tennis", "vôlei", "tênis"];

const images = [
  "https://i.pinimg.com/736x/9f/a1/94/9fa1947f11c34424d8b81b84b2aadb74.jpg",
  "https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg",
  "https://i.pinimg.com/1200x/46/b0/a1/46b0a1049111344c80d27efe6e9d44a5.jpg",
  "https://i.pinimg.com/736x/f3/19/84/f31984c93a997420d812bca4bb7e2dd6.jpg",
  "https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg",
  "https://i.pinimg.com/736x/72/5c/25/725c25da4d5fa9d9a5a156b797beea27.jpg",
  "https://i.pinimg.com/1200x/18/19/f7/1819f7efa5cc86dd22ad441af9a11b8f.jpg",
  "https://i.pinimg.com/736x/47/b4/bd/47b4bd47e3a6360934816a9f2aca012b.jpg",
  "https://i.pinimg.com/1200x/18/80/11/18801189d45d80532c1e893cc8cbeaf3.jpg",
];

const navItems = [
  { label: 'Início', href: '#' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('bgherolight.png')" }}
      />
      
      <PillNav 
        logo="favicon.png"
        logoAlt="Toinho Redes"
        items={navItems}
        baseColor="#0732C1"
        pillColor="#ffffff"
        pillTextColor="#0732C1"
        hoveredPillTextColor="#ffffff"
        className="mt-4"
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
                className="text-white font-avenue font-black text-5xl md:text-8xl uppercase tracking-tighter drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </ImageCursorTrail>
    </section>
  );
}


