import React from 'react';
import { motion } from 'framer-motion';
import ThreeAsciiBackground from './components/ThreeAsciiBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import './index.css';

function App() {
  React.useEffect(() => {
    console.log(
      "%cWhat if we just hadn't said goodbye?",
      "color: #64ffda; font-size: 16px; font-family: monospace; font-weight: bold;"
    );
  }, []);

  return (
    <div className="app-container">
      <div className="secret-quote">What if we just hadn't said goodbye?</div>
      <ThreeAsciiBackground />
      <Navbar />
      <BackToTop />
      <main className="content-overlay" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <About />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Timeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Contact />
        </motion.div>

        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#64748b',
          fontSize: '0.8rem'
        }}>
          <p>Designed & Built by Chia Yu</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
