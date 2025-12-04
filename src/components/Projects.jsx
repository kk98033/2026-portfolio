import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        title: "居家智能語音助理 - 小光 (Hikari)",
        description: "整合 LLM (OpenAI Assistant) 的實體語音助理，具備自然對話與 IoT 控制能力。",
        tags: ["ESP32", "OpenAI API", "Python", "Node-Red", "IoT"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Hikari+Assistant",
        details: "這是一個專為日常生活設計的 AI 語音助理實體裝置。它不僅能像一般智慧音箱一樣播放音樂、設定鬧鐘，更整合了 LLM (OpenAI Assistant API) 具備自然對話能力。小光能透過語音指令控制房間燈光、回報溫濕度，甚至記錄使用者的 GPS 路徑並生成熱力圖。"
    },
    {
        title: "沈浸式 VR 原住民文化導覽系統",
        description: "結合生成式 AI 與數位孿生技術的 VR 導覽系統，提供全語音自然對話體驗。",
        tags: ["Unity", "RAG", "LlamaIndex", "Whisper", "GPT-SoVITS"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=VR+Culture+Guide",
        details: "結合生成式 AI 與數位孿生技術的 VR 導覽系統。使用者戴上 VR 頭盔後，能進入 3D 重建的原住民虛擬教室，與 AI 虛擬導覽員進行「全語音」的自然對話。系統利用 RAG 技術讓 AI 能準確回答特定的文化知識，解決師資不足與文化傳承問題。"
    },
    {
        title: "線上西洋棋對戰平台 & 論壇",
        description: "整合即時對戰與社群交流的 Web 平台，支援即時聊天與棋局同步。",
        tags: ["PHP", "MySQL", "Socket.io", "Bootstrap", "Chess.js"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Chess+Platform",
        details: "這是一個整合了「即時對戰」與「社群交流」的完整 Web 平台。使用者可以在網頁上進行西洋棋配對對弈，系統支援即時聊天室與棋局同步。此外，平台還包含一個功能完整的論壇，使用者可發表 Markdown 格式的文章、攻略，並設有管理員審核與積分排行榜機制。"
    },
    {
        title: "類 Terraria 橫向卷軸冒險遊戲",
        description: "從零開發的 2D 沙盒生存遊戲，自行實作物理引擎與 Perlin Noise 地形生成。",
        tags: ["C#", "Windows Forms", "Perlin Noise", "Game Physics"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Terraria+Clone",
        details: "受到《Terraria》啟發，從零開始開發的 2D 沙盒生存遊戲。此專案最大的挑戰在於不使用現成遊戲引擎的物理與地圖系統，而是自行撰寫演算法。實現了基於 Perlin Noise 的隨機地形生成（包含山脈、海洋、洞窟、礦脈），以及類似 Minecraft 的「區塊 (Chunk)」動態載入系統，達成無限地圖的效能優化。"
    },
    {
        title: "線上遊戲伺服器架設 (TF2)",
        description: "利用 Ubuntu Server 架設公開遊戲伺服器，處理網路配置與自動化管理。",
        tags: ["Linux", "Ubuntu", "Bash Script", "Network Admin"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Game+Server",
        details: "利用報廢電腦升級硬體，安裝 Ubuntu Server 架設公開的 TF2 遊戲伺服器。處理了固定 IP 申請、Switch 防火牆設定與網路配置。在營運期間，同時在線人數達到 15 人，並累積數百名玩家。"
    },
    {
        title: "CPE 解題部落格 & 個人網站",
        description: "分享 CPE 與 UVA 解題心得的個人部落格，透過 SEO 優化幫助考生。",
        tags: ["GCP", "Hexo", "Nginx", "SEO", "Linux"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Coding+Blog",
        details: "為了分享 CPE (大學程式能力檢定) 與 UVA Online Judge 的解題心得而架設的個人部落格。自行租用 GCP 伺服器並架設環境，大幅修改 Hexo 模板以符合需求。透過 SEO 優化，成功讓網站在特定關鍵字搜尋中名列前茅，幫助許多同學與考生。"
    },
    {
        title: "全球確診資料查詢網站",
        description: "串接 Open API 提供即時 COVID-19 數據查詢與視覺化圖表。",
        tags: ["HTML/CSS", "JavaScript", "RESTful API", "Chart.js"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=COVID+Dashboard",
        details: "大一時期將高中開發的 App 移植至 Web 端的專案。網站透過串接政府與全球的 Open API，提供即時的 COVID-19 確診數據查詢。利用圖表 (圓餅圖、長條圖) 進行資料視覺化，並設計了響應式網頁 (RWD) 以支援手機瀏覽。"
    },
    {
        title: "電商平台系統 (ShopGrids)",
        description: "功能完整的電商網站，包含 Google 登入、購物車與後台管理。",
        tags: ["PHP", "MySQL", "Apache", "OAuth 2.0", "Bootstrap"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=E-Commerce",
        details: "資料庫課程的期末專案，實作了一個功能具備的電商網站。功能包含：Google 第三方快速登入、商品上架與管理（支援圖片上傳）、購物車系統、商品評分與留言機制、以及使用者個人資料管理。特別實作了 Apache Rewrite Rule 來美化 URL。"
    },
    {
        title: "隨機地牢探索遊戲",
        description: "網頁版 Roguelike 遊戲，特色為演算法即時生成的隨機地圖。",
        tags: ["Phaser 3", "TypeScript", "Webpack", "Procedural Gen"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Dungeon+Game",
        details: "一款網頁版的 Roguelike 探索遊戲。核心特色在於「隨機性」，每次遊玩的地圖、房間構造與連接方式皆由演算法即時生成，確保玩家有不同的體驗。使用 TypeScript 開發以確保程式碼架構的嚴謹性，並透過 Webpack 進行打包部署。"
    },
    {
        title: "網頁多人連線桌遊",
        description: "利用 WebSocket 實現多人即時連線的數位化桌遊。",
        tags: ["Phaser", "Socket.io", "Docker", "Node.js"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Multiplayer+Boardgame",
        details: "協助教授將實體桌遊數位化。利用 WebSocket 技術實現多人即時連線功能，讓玩家能透過瀏覽器同步進行遊戲。專案最後使用 Docker 進行容器化，以便於快速部署至學校伺服器。"
    },
    {
        title: "Epidemic Sentry 疫情監控 App",
        description: "Android App 提供全球疫情即時更新與主動推播通知。",
        tags: ["Android", "Java/Kotlin", "Web Scraping", "Push Notification"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Epidemic+App",
        details: "高中時期開發的 Android 應用程式，用於即時監控全球 COVID-19 疫情。App 串接 Worldometer 數據，提供各國確診與死亡數據的即時更新。最具特色的功能是「主動推播通知」，使用者可設定特定國家，當確診數有變化時，系統會主動發送手機推播或電子郵件提醒。"
    },
    {
        title: "Vocabulary Master 單字背誦 App",
        description: "功能豐富的單字學習 App，內建多種測驗模式與收藏功能。",
        tags: ["Android", "SQLite", "Java", "Quiz Logic"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Vocab+App",
        details: "一款功能豐富的單字學習 Android App。除了基本的單字庫瀏覽與查詢外，還實作了「星號收藏」功能。App 內建多種測驗模式，包含「Quiz Mode」（從歌詞中挖空單字進行測驗）、「Infinity Mode」以及「克漏字測驗」，幫助使用者透過不同方式記憶單字。"
    },
    {
        title: "Marisa 疫情資訊聊天機器人",
        description: "Facebook Messenger 聊天機器人，提供疫情查詢與熱力圖回傳。",
        tags: ["Python", "Selenium", "Messenger API", "Data Viz"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Chatbot+Marisa",
        details: "基於 Facebook Messenger 平台的自動化聊天機器人。使用者可以直接傳送訊息查詢特定國家的疫情數據，機器人會即時回傳確診數、死亡數等統計資料。此外，它還具備爬蟲功能，能自動抓取並回傳最新的全球疫情熱力圖。"
    },
    {
        title: "Pygame 橫向卷軸射擊遊戲",
        description: "使用 Python Pygame 開發的 2D 射擊遊戲，包含難度動態調整。",
        tags: ["Python", "Pygame", "Game Dev"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Pygame+Shooter",
        details: "使用 Python 的 Pygame 函式庫開發的 2D 橫向卷軸射擊生存遊戲。玩家需操作角色在不斷捲動的背景中躲避障礙物並擊敗敵人。遊戲包含計分系統與生存計時，隨著時間推移，遊戲會進入「Crazy Mode」，大幅增加敵人數量與速度，考驗玩家的反應能力。"
    }
];

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={onClick}
            style={{
                background: 'rgba(11, 12, 16, 0.6)',
                border: '1px solid rgba(69, 162, 158, 0.2)',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                minWidth: '350px', // Fixed width for horizontal scroll
                scrollSnapAlign: 'start'
            }}
            className="project-card"
        >
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="card-image"
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.4rem' }}>{project.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1rem' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.8rem',
                            color: 'var(--accent-color)',
                            background: 'rgba(102, 252, 241, 0.1)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

import { createPortal } from 'react-dom';

// ... (Projects array and ProjectCard component remain unchanged)

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999, // High z-index to ensure it's on top
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#0b0c10',
                    border: '1px solid var(--accent-color)',
                    borderRadius: '16px',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 0 30px rgba(102, 252, 241, 0.2)'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    &times;
                </button>

                <div style={{ height: '300px', width: '100%' }}>
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ padding: '2rem' }}>
                    <h2 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '1rem' }}>{project.title}</h2>
                    <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        {project.details}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Technologies Used:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--bg-color)',
                                    background: 'var(--secondary-color)',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '20px',
                                    fontWeight: '600'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{
                            padding: '0.8rem 2rem',
                            background: 'var(--accent-color)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Live Demo
                        </button>
                        <button style={{
                            padding: '0.8rem 2rem',
                            background: 'transparent',
                            color: 'var(--accent-color)',
                            border: '1px solid var(--accent-color)',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            View Code
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const scrollRef = React.useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section id="projects" style={{
            width: '100%',
            background: 'linear-gradient(180deg, var(--bg-color) 0%, var(--bg-color) 80%, rgba(11,12,16,0) 100%)',
            position: 'relative',
            zIndex: 1,
            padding: '100px 0'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--accent-color)',
                    marginBottom: '3rem',
                    borderBottom: '1px solid var(--secondary-color)',
                    paddingBottom: '0.5rem',
                    display: 'inline-block'
                }}>
                    Projects
                </h2>
                <div style={{ position: 'relative' }}>
                    <button
                        className="project-nav-btn"
                        onClick={() => {
                            scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
                        }}
                        style={{
                            position: 'absolute',
                            left: '-20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(11, 12, 16, 0.8)',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        &#8592;
                    </button>
                    <style>{`
                        @media (max-width: 768px) {
                            .project-nav-btn {
                                display: none !important;
                            }
                        }
                    `}</style>

                    <div
                        className="projects-container"
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: '2.5rem',
                            paddingBottom: '2rem',
                            scrollSnapType: isDragging ? 'none' : 'x mandatory', // Disable snap while dragging
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--secondary-color) var(--bg-color)',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            userSelect: 'none' // Prevent text selection while dragging
                        }}
                    >
                        {projects.map((p, i) => (
                            <ProjectCard
                                key={i}
                                project={p}
                                onClick={() => {
                                    if (!isDragging) setSelectedProject(p);
                                }}
                            />
                        ))}
                    </div>

                    <button
                        className="project-nav-btn"
                        onClick={() => {
                            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                        }}
                        style={{
                            position: 'absolute',
                            right: '-20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(11, 12, 16, 0.8)',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        &#8594;
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
