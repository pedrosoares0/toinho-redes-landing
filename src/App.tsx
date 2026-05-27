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
      <main className="min-h-screen bg-white dark:bg-neutral-950 text-brand-blue dark:text-white antialiased relative transition-colors duration-300">
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
