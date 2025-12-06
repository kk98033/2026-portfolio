import React, { useState, useEffect } from 'react';
import logo from '../assets/500_500_no_bg_icon.png';

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
            padding: '0.8rem 2rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            zIndex: 100,
            background: scrolled ? 'rgba(11, 12, 16, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}>
            <div
                style={{
                    position: 'absolute',
                    left: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    opacity: scrolled ? 1 : 0,
                    pointerEvents: scrolled ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
                }}
                onClick={() => window.location.href = '/'}
            >
                <img src={logo} alt="Logo" style={{ height: '85px', width: 'auto' }} />
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
