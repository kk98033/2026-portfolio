import React, { useState } from 'react';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "hello@example.com";

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
                    05. Get In Touch
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#94a3b8',
                    marginBottom: '3rem'
                }}>
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                    my inbox is always open.
                </p>

                <div style={{ position: 'relative', display: 'inline-block' }}>
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
            </div>
        </section>
    );
};

export default Contact;
