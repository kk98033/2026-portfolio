import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        right: '40px',
                        zIndex: 100
                    }}
                >
                    <button
                        onClick={scrollToTop}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(11, 12, 16, 0.8)',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 0 15px rgba(102, 252, 241, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--accent-color)';
                            e.target.style.color = 'var(--bg-color)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(11, 12, 16, 0.8)';
                            e.target.style.color = 'var(--accent-color)';
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
