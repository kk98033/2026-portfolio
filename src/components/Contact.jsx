import React, { useState } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/kk98033",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
        )
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/@evayang138",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
        )
    },
    {
        name: "Steam",
        url: "https://steamcommunity.com/id/IddleFromTaiwan/",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none">
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
            </svg>
        )
    },
    {
        name: "Blog",
        url: "https://blog.iddle.dev/public/",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
        )
    }
];

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "a8829037@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" style={{
            width: '100%',
            background: 'transparent',
            position: 'relative',
            zIndex: 1,
            padding: '100px 0',
            marginBottom: '0'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '0 20px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--accent-color)',
                    marginBottom: '1.5rem'
                }}>
                    Get In Touch
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#94a3b8',
                    marginBottom: '3rem'
                }}>
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                    my inbox is always open.
                </p>

                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '3rem' }}>
                    <button
                        onClick={handleCopy}
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.1rem',
                            background: 'transparent',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(102, 252, 241, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                        }}
                    >
                        {copied ? 'Email Copied!' : 'Copy Email'}
                    </button>

                    {copied && (
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--accent-color)',
                            color: 'var(--bg-color)',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            animation: 'fadeIn 0.3s ease'
                        }}>
                            Copied!
                        </div>
                    )}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    marginTop: '1rem'
                }}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#94a3b8',
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '12px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--accent-color)';
                                e.currentTarget.style.background = 'rgba(102, 252, 241, 0.1)';
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#94a3b8';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            title={link.name}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
