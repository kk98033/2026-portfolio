import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            height: '100dvh', // Use dynamic viewport height for mobile browsers
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'var(--text-color)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            perspective: '1000px',
            perspectiveOrigin: 'center center'
        }}>
            {/* HUD Decorations */}
            <div style={{
                position: 'absolute',
                top: '100px',
                left: '40px',
                width: '200px',
                height: '200px',
                borderTop: '2px solid var(--accent-color)',
                borderLeft: '2px solid var(--accent-color)',
                opacity: 0.5
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                width: '200px',
                height: '200px',
                borderBottom: '2px solid var(--accent-color)',
                borderRight: '2px solid var(--accent-color)',
                opacity: 0.5
            }}></div>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                writingMode: 'vertical-rl',
                color: 'var(--secondary-color)',
                fontSize: '0.8rem',
                letterSpacing: '4px',
                opacity: 0.6
            }}>
                SYSTEM ONLINE // V.2.0
            </div>
            <div className="glitch-effect" style={{
                marginBottom: '0.5rem', // Reduced margin
                cursor: 'default',
                lineHeight: '1.1', // Slightly tighter line height
                perspective: '2000px',
                fontWeight: '800',
                fontFamily: 'var(--font-main)',
                background: 'transparent',
                textShadow: 'none',
                overflow: 'visible',
                position: 'relative',
                zIndex: 10,
                transformStyle: 'preserve-3d'
            }}>
                {["CHIA-YU", "YANG"].map((line, lineIndex) => (
                    <div key={lineIndex} style={{ overflow: 'visible', display: 'block' }}>
                        {line.split('').map((char, charIndex) => (
                            <motion.span
                                key={`${lineIndex}-${charIndex}`}
                                initial={{
                                    opacity: 0,
                                    x: (Math.random() - 0.5) * 1500,
                                    y: (Math.random() - 0.5) * 1200,
                                    z: 200 + Math.random() * 500,
                                    scale: 2 + Math.random() * 2,
                                    rotate: Math.random() * 360,
                                    textShadow: '0 0 0px rgba(102, 252, 241, 0)'
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    scale: 1,
                                    rotate: 0,
                                    textShadow: '0 0 30px rgba(102, 252, 241, 0.2)'
                                }}
                                transition={{
                                    duration: 3.5,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: Math.random() * 1.5
                                }}
                                style={{
                                    display: 'inline-block',
                                    color: 'var(--accent-color)',
                                    fontSize: 'clamp(2.5rem, 8vw, 6rem)', // Reduced min font size
                                    fontWeight: '800',
                                    marginRight: char === ' ' ? '1rem' : '0',
                                    padding: '0.25em',
                                    margin: '0 -0.05em',
                                    willChange: 'transform, opacity, filter'
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </div>
            <p style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.5rem)', // Reduced min font size
                maxWidth: '800px',
                margin: '0 auto 1.5rem', // Reduced bottom margin
                color: 'var(--secondary-color)',
                fontWeight: '300',
                lineHeight: '1.6', // Slightly tighter
                padding: '0 1rem' // Add padding for small screens
            }}>
                What if we just hadn't said goodbye?
            </p>
            {/* Scroll Indicator */}
            <div
                className="scroll-indicator-container"
                onClick={() => {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                <span style={{ fontSize: '0.8rem', marginBottom: '10px', letterSpacing: '0.1em' }}>SCROLL</span>
                <div className="scroll-arrow" style={{
                    width: '15px',
                    height: '15px',
                    borderRight: '2px solid var(--accent-color)',
                    borderBottom: '2px solid var(--accent-color)',
                    transform: 'rotate(45deg)'
                }}></div>
            </div>
        </section>
    );
};

export default Hero;