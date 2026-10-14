import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Qual o material das redes?',
    answer: 'Nossas redes são fabricadas com polietileno de alta densidade (100% nylon virgem), tratado com aditivos especiais contra raios UV e intempéries marinhas, garantindo anos de durabilidade sem ressecar.'
  },
  {
    question: 'Vocês fazem redes sob medida?',
    answer: 'Sim! Produzimos redes sob medida para qualquer tamanho de quadra (futevôlei, beach tennis, vôlei ou tênis), com faixas personalizadas e reforço duplo nas extremidades.'
  },
  {
    question: 'Como faço para limpar e conservar a rede?',
    answer: 'A manutenção é simples: basta lavar periodicamente com água doce e sabão neutro para retirar excessos de areia e salitre. Evite alvejantes químicos abrasivos.'
  },
  {
    question: 'Qual o prazo de envio e entrega?',
    answer: 'O envio é imediato para modelos em estoque e de 3 a 5 dias úteis para pedidos com personalização de faixas e cores. Entregamos em Salvador, na Bahia e em todo o Brasil.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-brand-darkBlue transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-brand-secondaryBlue" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondaryBlue">
              Tire suas dúvidas
            </span>
            <div className="h-px w-6 bg-brand-secondaryBlue" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-avenue font-black tracking-tight text-brand-blue dark:text-white uppercase leading-none">
            Dúvidas <span className="text-brand-secondaryBlue dark:text-brand-lightBlue">Frequentes</span>
          </h2>
        </div>

        {/* Lista de Acordeões ultraleves com Grid CSS (zero lag, 60fps garantido) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? 'border-brand-secondaryBlue/40 bg-brand-lightBlue/10 dark:bg-brand-secondaryBlue/10 shadow-sm'
                    : 'border-brand-blue/10 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-brand-blue/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-avenue font-black text-lg sm:text-xl uppercase tracking-tight transition-colors duration-200 ${
                      isOpen
                        ? 'text-brand-blue dark:text-white'
                        : 'text-brand-blue/80 dark:text-white/80'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? 'bg-brand-blue text-white rotate-45'
                        : 'bg-brand-blue/5 text-brand-blue dark:bg-white/10 dark:text-white rotate-0'
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Acordeão CSS Grid nativo (não causa reflow de layout) */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="px-6 pb-6 sm:px-7 sm:pb-7 text-brand-blue/70 dark:text-white/70 font-sans text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
