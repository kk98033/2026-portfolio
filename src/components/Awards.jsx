import React from 'react';
import { motion } from 'framer-motion';

const awardsData = [
    {
        title: "2024 智在家鄉 - 數位社會創新競賽",
        award: "潛力獎 (決賽入圍)",
        description: "作品：AI 虛擬導覽員互動系統。整合語音輸入、TTS 與 RAG 技術，提供無障礙的自然語言互動體驗。",
        icon: "🏆"
    },
    {
        title: "2024 全國大專校院智慧創新暨跨域整合創作競賽",
        award: "佳作 & 博物館特別獎",
        description: "作品：VR 原住民文化導覽學習系統。結合 VR 與 LLM 技術，打造虛擬原住民博物館導覽系統。",
        icon: "🥇"
    },
    {
        title: "2024 行動通訊實務競賽 (數位孿生應用組)",
        award: "佳作",
        description: "作品：具備遠端互動能力的數位孿生系統。負責雲端後端架構與 LLM 整合。",
        icon: "📡"
    },
    {
        title: "第 54 屆全國技能競賽 (分區賽) - 網頁設計組",
        award: "佳作",
        description: "在限定時間內完成具備前後端功能的動態網頁。使用 Bootstrap 與 PHP 實作。",
        icon: "💻"
    },
    {
        title: "CPE 大學程式能力檢定",
        award: "5/7 題 (排名 2.1%)",
        description: "展現紮實的演算法與資料結構解題能力。",
        icon: "📝"
    },
    {
        title: "Fortinet Cybersecurity Certification",
        award: "Certified Associate & Fundamentals",
        description: "具備網路安全基礎與實務操作認證 (Valid until Nov 2025)。",
        icon: "🛡️"
    }
];

const AwardCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
            background: 'rgba(11, 12, 16, 0.6)',
            border: '1px solid rgba(69, 162, 158, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(5px)',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            cursor: 'default',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}
        whileHover={{
            y: -5,
            borderColor: 'var(--accent-color)',
            boxShadow: '0 4px 20px rgba(102, 252, 241, 0.1)'
        }}
    >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
        <h3 style={{
            color: '#fff',
            fontSize: '1.2rem',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        }}>
            {item.title}
        </h3>
        <div style={{
            color: 'var(--accent-color)',
            fontWeight: '600',
            marginBottom: '1rem',
            fontSize: '1rem'
        }}>
            {item.award}
        </div>
        <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            flex: 1
        }}>
            {item.description}
        </p>
    </motion.div>
);

const Awards = () => {
    return (
        <section id="awards" style={{
            width: '100%',
            padding: '100px 0',
            background: 'var(--bg-color)',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{
                maxWidth: '1200px',
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
                        Honors & Awards
                    </h2>
                    <p style={{ color: '#94a3b8' }}>
                        Recognition of my technical skills and innovative projects.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {awardsData.map((item, index) => (
                        <AwardCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
