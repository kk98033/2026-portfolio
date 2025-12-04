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
                        About Me
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        marginBottom: '1.5rem',
                        color: '#e2e8f0'
                    }}>
                        我是一名對實作與系統開發充滿熱情的開發者，畢業於國立臺東大學資訊工程學系，目前就讀於國立成功大學工程科學系碩士班。擅長將 AI (LLM)、VR 與 IoT 技術整合成完整的應用系統。從大學時期開始，我便投入大量時間研究大型語言模型、後端 API 建置、虛擬實境互動設計以及物聯網裝置操作。
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#e2e8f0',
                        marginBottom: '1.5rem'
                    }}>
                        我不滿足於理論，更喜歡動手打造真正能用的東西。從伺服器架設、資料庫配置、API 設計，到 VR 環境建置、LLM 指令控制與硬體感測，我具備獨立完成並整合為可運行系統的能力。
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#e2e8f0'
                    }}>
                        我相信技術最重要的價值在於「能被使用、能解決問題」，因此在每一個專案中，我都專注於可行性、完整度與使用者體驗。
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
