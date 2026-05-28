import { motion } from 'framer-motion'
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

const sectionVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}

function App() {
  return (
    <ImagePreloader>
      <main className="min-h-screen bg-white dark:bg-brand-darkBlue text-brand-blue dark:text-white antialiased relative transition-colors duration-300">
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
        <ScrollProgress />
        <SmoothScroll />
        <Hero />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={sectionVariants}>
          <Partners />
        </motion.div>
        {/* Sem wrapper animado: transform no pai quebra position:sticky da galeria mobile */}
        <Gallery />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={sectionVariants}>
          <Catalogue />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={sectionVariants}>
          <Stats />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={sectionVariants}>
          <FAQ />
        </motion.div>
        <Footer />
      </main>
    </ImagePreloader>
  )
}

export default App
