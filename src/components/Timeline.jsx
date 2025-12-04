import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
    {
        year: '2025',
        title: '國立成功大學 工程科學所',
        description: '碩士班 (Master\'s Degree)',
        side: 'left'
    },

    {
        year: '2020',
        title: '國立臺東大學 資訊工程學系',
        description: '學士班 (Bachelor\'s Degree)',
        side: 'right'
    }
];

const TimelineItem = ({ data, index }) => {
    const isLeft = data.side === 'left';

    return (
        <div style={{
            display: 'flex',
            justifyContent: isLeft ? 'flex-end' : 'flex-start',
            paddingBottom: '50px',
            position: 'relative',
            width: '50%',
            left: isLeft ? '0' : '50%'
        }}>
            {/* Node */}
            <div style={{
                position: 'absolute',
                [isLeft ? 'right' : 'left']: '-8px', // Center on line
                top: '0',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'var(--bg-color)',
                border: '2px solid var(--accent-color)',
                boxShadow: '0 0 10px var(--accent-color)',
                zIndex: 2
            }}></div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{
                    background: 'rgba(11, 12, 16, 0.8)',
                    border: '1px solid rgba(69, 162, 158, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '400px',
                    backdropFilter: 'blur(5px)',
                    textAlign: isLeft ? 'right' : 'left',
                    position: 'relative'
                }}
            >
                <span style={{
                    color: 'var(--accent-color)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    display: 'block',
                    marginBottom: '0.5rem'
                }}>
                    {data.year}
                </span>
                <h3 style={{
                    color: '#fff',
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem'
                }}>
                    {data.title}
                </h3>
                <p style={{
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}>
                    {data.description}
                </p>
            </motion.div>
        </div>
    );
};

const Timeline = () => {
    return (
        <section id="timeline" style={{
            width: '100%',
            padding: '100px 0',
            background: 'var(--bg-color)',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 20px',
                position: 'relative'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--accent-color)',
                    marginBottom: '4rem',
                    textAlign: 'center',
                    borderBottom: '1px solid var(--secondary-color)',
                    paddingBottom: '0.5rem',
                    display: 'block',
                    width: 'fit-content',
                    margin: '0 auto 4rem'
                }}>
                    Journey
                </h2>

                {/* Central Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '120px', // Start after header
                    bottom: '50px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--accent-color), var(--secondary-color), transparent)',
                    transform: 'translateX(-50%)',
                    opacity: 0.5
                }}></div>

                <div style={{ position: 'relative' }}>
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} data={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
