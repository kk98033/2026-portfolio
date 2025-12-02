import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{
            width: '100%',
            background: 'linear-gradient(180deg, rgba(11,12,16,0) 0%, #0b0c10 150px)', // Fade in
            position: 'relative',
            zIndex: 1,
            padding: '100px 0'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4rem',
                flexWrap: 'wrap'
            }}>
                {/* Photo Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ flex: '1 1 400px', position: 'relative' }}
                >
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '120%', // Aspect ratio
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid var(--accent-color)',
                        boxShadow: '0 0 20px rgba(102, 252, 241, 0.1)'
                    }}>
                        <img
                            src="https://via.placeholder.com/500x600/0b0c10/66fcf1?text=Profile+Photo"
                            alt="Profile"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(20%) contrast(1.1)'
                            }}
                        />
                        {/* Tech Frame Decorations */}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            width: '20px',
                            height: '20px',
                            borderTop: '2px solid var(--accent-color)',
                            borderLeft: '2px solid var(--accent-color)'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '20px',
                            height: '20px',
                            borderBottom: '2px solid var(--accent-color)',
                            borderRight: '2px solid var(--accent-color)'
                        }}></div>
                    </div>
                </motion.div>

                {/* Text Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ flex: '1 1 400px' }}
                >
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: 'var(--accent-color)',
                        marginBottom: '2rem',
                        borderBottom: '1px solid var(--secondary-color)',
                        paddingBottom: '0.5rem',
                        display: 'inline-block'
                    }}>
                        01. About Me
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        marginBottom: '1.5rem',
                        color: '#e2e8f0'
                    }}>
                        Hello! I'm a software engineer with a passion for building digital experiences that live on the internet.
                        My interest in web development started back in 2020 when I decided to try editing custom Tumblr themes —
                        turns out hacking together HTML & CSS is pretty fun!
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#e2e8f0',
                        marginBottom: '1.5rem'
                    }}>
                        Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up,
                        and a huge corporation. My main focus these days is building accessible, inclusive products and
                        digital experiences for a variety of clients.
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#e2e8f0'
                    }}>
                        I am currently pursuing my Master's degree, diving deeper into Artificial Intelligence and
                        Machine Learning to create smarter, more adaptive applications.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
