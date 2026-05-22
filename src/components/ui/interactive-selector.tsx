import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaExpandAlt, FaDumbbell, FaTrophy, FaStar, FaShieldAlt } from 'react-icons/fa';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
   
  const options = [
    {
      title: "Arena Profissional",
      location: "Salvador, BA",
      description: "Instalação de elite com rede oficial de futevôlei.",
      image: "foto (1).jpeg",
      icon: <FaTrophy size={20} className="text-white" />
    },
    {
      title: "Quadra Premium",
      location: "Lauro de Freitas, BA",
      description: "Redes personalizadas para clubes de alto padrão.",
      image: "foto (5).png",
      icon: <FaStar size={20} className="text-white" />
    },
    {
      title: "Beach Tennis",
      location: "Costa do Sauípe, BA",
      description: "Durabilidade absoluta para o litoral baiano.",
      image: "foto (8).png",
      icon: <FaMapMarkerAlt size={20} className="text-white" />
    },
    {
      title: "Centro de Treinamento",
      location: "Feira de Santana, BA",
      description: "Equipamento para atletas de alto rendimento.",
      image: "3faixas3.png",
      icon: <FaDumbbell size={20} className="text-white" />
    },
    {
      title: "Arena Cross",
      location: "Camaçari, BA",
      description: "Redes ultra-reforçadas para uso intenso.",
      image: "4faixas.png",
      icon: <FaShieldAlt size={20} className="text-white" />
    },
    {
      title: "Vôlei de Praia",
      location: "Ilhéus, BA",
      description: "A melhor tecnologia em absorção de impacto.",
      image: "4faixas2.png",
      icon: <FaExpandAlt size={20} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
     
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });
     
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white font-sans">  
      {/* Options Container */}
      <div className="flex w-full h-[500px] md:h-[600px] items-stretch overflow-hidden relative rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-100">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`
              relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out group
              ${activeIndex === index ? 'flex-[6] md:flex-[8]' : 'flex-1 cursor-pointer'}
            `}
            style={{
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              backgroundColor: '#18181b',
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 transition-transform duration-700 ease-in-out bg-center bg-cover"
              style={{ 
                backgroundImage: `url('${option.image}')`,
                transform: activeIndex === index ? 'scale(1)' : 'scale(1.1)',
              }}
            />

            {/* Overlay Gradient */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeIndex === index ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' : 'bg-black/40 group-hover:bg-black/20'
              }`}
            />
             
            {/* Content Label */}
            <div className={`absolute left-0 right-0 bottom-8 flex items-center px-6 gap-4 z-10 transition-all duration-700 ${
              activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-100'
            }`}>
              <div className={`icon min-w-[48px] h-[48px] flex items-center justify-center rounded-full bg-brand-blue/90 backdrop-blur-md border border-white/20 shadow-lg transition-transform duration-300 ${
                activeIndex === index ? 'scale-110' : 'scale-90'
              }`}>
                {option.icon}
              </div>
              
              <div className={`flex flex-col overflow-hidden transition-all duration-700 ease-in-out ${
                activeIndex === index ? 'w-full opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10'
              }`}>
                <span className="text-brand-lightBlue text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                  {option.location}
                </span>
                <h3 className="text-white font-avenue text-2xl md:text-4xl uppercase leading-none mb-2 whitespace-nowrap">
                  {option.title}
                </h3>
                <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
