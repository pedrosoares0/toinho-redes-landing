import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Gallery from './components/Gallery'
import Catalogue from './components/Catalogue'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/smooth-scroll'
import ImagePreloader from './components/ui/image-preloader'
import { ScrollProgress } from './components/ui/scroll-progress'
import PillNav from './components/ui/PillNav'

const navItems = [
  { label: 'Início', href: '#' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

/**
 * Entrada suave das seções. Só anima opacity + translateY (compositor) e roda uma única vez —
 * antes era scale + y com `once: false`, o que reanimava seções gigantes a cada scroll.
 * Não usar em seções com position:sticky interno (Gallery / Stats).
 */
function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <ImagePreloader>
      <main className="min-h-screen bg-white dark:bg-brand-darkBlue text-brand-blue dark:text-white antialiased relative transition-colors duration-300">
        <PillNav
          logo="/favicon.png"
          logoAlt="Toinho Redes"
          items={navItems}
          baseColor="#0732C1"
          pillColor="#ffffff"
          pillTextColor="#0732C1"
          hoveredPillTextColor="#ffffff"
          className="mt-4"
        />
        <ScrollProgress />
        <SmoothScroll />
        <Hero />
        <Reveal>
          <Partners />
        </Reveal>
        {/* Sem wrapper animado: transform no pai quebra position:sticky da galeria mobile */}
        <Gallery />
        <Reveal>
          <Catalogue />
        </Reveal>
        {/* Seção de Autoridade & Estatísticas */}
        <Stats />
        <Reveal>
          <FAQ />
        </Reveal>
        <Footer />
      </main>
    </ImagePreloader>
  )
}

export default App
