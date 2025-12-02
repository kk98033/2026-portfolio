import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'var(--text-color)',
            position: 'relative',
            zIndex: 1
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
                marginBottom: '1rem',
                cursor: 'default',
                lineHeight: '1',
                perspective: '2000px', // Increased perspective for deeper 3D feel
                fontWeight: '800',
                fontFamily: 'var(--font-main)',
                background: 'transparent', // Explicitly transparent
                textShadow: 'none', // Remove container shadow
            }}>
                {["CHIA YU"].map((line, lineIndex) => (
                    <div key={lineIndex} style={{ overflow: 'visible' }}> {/* Allow flying in from outside */}
                        {line.split('').map((char, charIndex) => (
                            <motion.span
                                key={`${lineIndex}-${charIndex}`}
                                initial={{
                                    opacity: 0,
                                    x: (Math.random() - 0.5) * 5000, // Start from WAY OFF-SCREEN
                                    y: (Math.random() - 0.5) * 5000, // Start from WAY OFF-SCREEN
                                    z: 2000 + Math.random() * 1000, // Start VERY CLOSE to camera
                                    scale: 10 + Math.random() * 10, // Start MASSIVE (pixel block look)
                                    rotate: Math.random() * 360,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    scale: 1,
                                    rotate: 0,
                                }}
                                transition={{
                                    duration: 3, // Slow and epic
                                    ease: [0.16, 1, 0.3, 1], // Custom ease for a "tech" snap
                                    delay: Math.random() * 1.5
                                }}
                                style={{
                                    display: 'inline-block',
                                    color: 'var(--accent-color)',
                                    textShadow: '0 0 30px rgba(102, 252, 241, 0.2)',
                                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                                    fontWeight: '800',
                                    marginRight: char === ' ' ? '1rem' : '0',
                                    willChange: 'transform, opacity', // Optimize performance
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </div>
            <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                color: 'var(--secondary-color)',
                fontWeight: '300'
            }}>
                Building digital experiences with code and creativity.
            </p>
            <div style={{ marginTop: '2rem' }}>
                <a href="#about" style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1rem',
                    background: 'rgba(102, 252, 241, 0.1)',
                    border: '1px solid var(--accent-color)',
                    color: 'var(--accent-color)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--accent-color)';
                        e.target.style.color = 'var(--bg-color)';
                        e.target.style.boxShadow = '0 0 20px var(--accent-color)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(102, 252, 241, 0.1)';
                        e.target.style.color = 'var(--accent-color)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    Explore Work
                </a>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.7
            }}>
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
