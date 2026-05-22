import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Gallery from './components/Gallery'
import Catalogue from './components/Catalogue'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/smooth-scroll'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}

function App() {
  return (
    <main className="min-h-screen bg-white text-brand-blue antialiased relative">
      <SmoothScroll />
      <Hero />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
        <Partners />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
        <Gallery />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
        <Catalogue />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
        <Stats />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
        <FAQ />
      </motion.div>
      <Footer />
    </main>
  )
}

export default App
