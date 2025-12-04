import React from 'react';
import { motion } from 'framer-motion';

const researchData = [
    {
        title: "113年度國科會大專學生研究計畫",
        role: "計畫主持人",
        advisor: "指導教授：賴盈勳 教授",
        description: "計畫名稱：沈浸式語言互動與文化傳承：利用大型語言模型 (LLM) 於 3D 虛擬實境中傳播臺灣原住民文化的創新教學策略。負責 LLM 技術研究與應用，選用 Ollama 與 LlamaIndex 框架搭建 RAG 系統，並整合 Whisper 與 GPT-SoVITS。",
        year: "2024",
        icon: "🔬"
    },
    {
        title: "TWSC2 2024 臺灣雲端與服務計算研討會",
        role: "發表人 (Poster Presentation)",
        advisor: "指導教授：賴盈勳 教授",
        team: "組員：Chia Yu Yang, Jia Hao Kang, Bo Rui Li, Jen Shu Yu",
        description: "發表題目：Exploring Taiwan Indigenous Cultural Sustainability Education with Large-Scale Language Modeling and Virtual Reality。本研究探索利用 VR 與 LLM 的創新教學策略，透過虛擬教師與自然對話，讓學生深入學習原住民文化。",
        year: "2024",
        icon: "🗣️"
    }
];

const ResearchCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
            background: 'rgba(11, 12, 16, 0.6)',
            borderLeft: '4px solid var(--accent-color)',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.5rem'
        }}
    >
        <div style={{ fontSize: '2rem' }}>{item.icon}</div>
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.5rem',
                flexWrap: 'wrap'
            }}>
                <h3 style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    margin: 0
                }}>
                    {item.title}
                </h3>
                <span style={{
                    background: 'rgba(102, 252, 241, 0.1)',
                    color: 'var(--accent-color)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                }}>
                    {item.year}
                </span>
            </div>
            <div style={{
                color: '#94a3b8',
                fontWeight: '600',
                marginBottom: '0.2rem',
                fontSize: '0.95rem'
            }}>
                {item.role}
            </div>
            {item.advisor && (
                <div style={{
                    color: '#94a3b8',
                    marginBottom: '0.2rem',
                    fontSize: '0.9rem'
                }}>
                    {item.advisor}
                </div>
            )}
            {item.team && (
                <div style={{
                    color: '#94a3b8',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                }}>
                    {item.team}
                </div>
            )}
            <p style={{
                color: '#e2e8f0',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: 0
            }}>
                {item.description}
            </p>
        </div>
    </motion.div>
);

const Research = () => {
    return (
        <section id="research" style={{
            width: '100%',
            padding: '100px 0',
            background: 'var(--bg-color)',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: 'var(--accent-color)',
                        marginBottom: '1rem',
                        display: 'inline-block',
                        borderBottom: '1px solid var(--secondary-color)',
                        paddingBottom: '0.5rem'
                    }}>
                        Academic Research
                    </h2>
                    <p style={{ color: '#94a3b8' }}>
                        Exploring the frontiers of technology and education.
                    </p>
                </div>

                <div>
                    {researchData.map((item, index) => (
                        <ResearchCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
