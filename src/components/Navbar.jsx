import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            background: scrolled ? 'rgba(11, 12, 16, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}>
            <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--accent-color)',
                letterSpacing: '2px',
                fontFamily: 'monospace'
            }}>
                [ CY ]
            </div>
            <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                {['About', 'Skills', 'Timeline', 'Research', 'Awards', 'Projects', 'Contact'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="nav-link-item">
                        {item}
                    </a>
                ))}
                <style>{`
                    @media (max-width: 768px) {
                        .nav-links {
                            display: none !important;
                        }
                    }
                `}</style>
            </div>
        </nav>
    );
};

export default Navbar;
