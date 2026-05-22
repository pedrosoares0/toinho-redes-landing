import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Qual o material das redes?',
    answer: 'Nossas redes são fabricadas com polietileno de alta densidade, tratado para resistir a raios UV e intempéries, garantindo durabilidade e resistência.'
  },
  {
    question: 'Vocês fazem redes sob medida?',
    answer: 'Sim! Produzimos redes em qualquer tamanho para atender às necessidades específicas da sua quadra ou espaço esportivo. Entre em contato para um orçamento personalizado.'
  },
  {
    question: 'Como faço para limpar a rede?',
    answer: 'A limpeza é simples: basta utilizar água e sabão neutro. Evite produtos químicos agressivos que possam danificar as fibras de nylon ao longo do tempo.'
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia conforme o modelo e a personalização, mas geralmente entregamos em todo o estado em um período de 5 a 10 dias úteis.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-avenue font-black tracking-tighter text-brand-blue uppercase leading-none">
            Dúvidas <br />
            <span className="text-brand-lightBlue drop-shadow-sm">Frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className={`border-2 rounded-[2rem] overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'border-brand-secondaryBlue bg-brand-lightBlue/10' : 'border-brand-blue/5 bg-white'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left transition-colors"
              >
                <span className={`font-avenue font-black text-xl uppercase tracking-tighter ${openIndex === index ? 'text-brand-blue' : 'text-brand-blue/60'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-brand-blue text-white rotate-180' : 'bg-brand-blue/5 text-brand-blue'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-8 pt-0 text-brand-blue/60 font-inter font-bold uppercase tracking-wide leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
