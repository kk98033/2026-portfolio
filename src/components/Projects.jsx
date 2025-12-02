import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        title: "AI Image Generator",
        description: "A deep learning model that generates realistic images from text descriptions.",
        tags: ["Python", "PyTorch", "React", "FastAPI"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=AI+Generator",
        details: "This project leverages Generative Adversarial Networks (GANs) to create high-fidelity images. The backend is powered by FastAPI serving a PyTorch model, while the frontend provides a seamless user interface for prompt entry and gallery viewing."
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory and secure payments.",
        tags: ["Next.js", "Node.js", "Stripe", "MongoDB"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=E-Commerce",
        details: "Built a scalable e-commerce platform handling thousands of concurrent users. Features include real-time stock updates via WebSockets, secure payment processing with Stripe, and a comprehensive admin dashboard."
    },
    {
        title: "Smart Home Dashboard",
        description: "IoT dashboard for monitoring and controlling smart home devices.",
        tags: ["Vue.js", "Firebase", "IoT", "MQTT"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Smart+Home",
        details: "An intuitive dashboard for managing smart home ecosystems. Integrates with various IoT protocols (MQTT, Zigbee) to provide real-time status updates and control over lights, thermostat, and security systems."
    },
    {
        title: "Crypto Tracker",
        description: "Real-time cryptocurrency tracker with price alerts and portfolio management.",
        tags: ["React Native", "Redux", "CoinGecko API"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Crypto+Tracker",
        details: "A mobile-first application for tracking cryptocurrency prices. Users can set custom alerts, manage their portfolio, and view historical data charts."
    },
    {
        title: "Task Management App",
        description: "Collaborative task manager with real-time updates and team features.",
        tags: ["Svelte", "Supabase", "TailwindCSS"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Task+Manager",
        details: "Streamline team productivity with this task management tool. Features include drag-and-drop boards, real-time collaboration, and automated email notifications."
    },
    {
        title: "Fitness Tracker",
        description: "Mobile app for tracking workouts, nutrition, and personal records.",
        tags: ["Flutter", "Firebase", "Google Fit API"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Fitness+App",
        details: "A comprehensive fitness companion. Users can log workouts, track calories, and visualize their progress over time with interactive charts."
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather forecasting with interactive maps and alerts.",
        tags: ["React", "OpenWeatherMap", "Leaflet"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Weather+App",
        details: "Get accurate weather forecasts for any location. Features include a dynamic map, severe weather alerts, and a 7-day forecast."
    },
    {
        title: "Chat Application",
        description: "Secure messaging app with end-to-end encryption.",
        tags: ["Socket.io", "Node.js", "Redis"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Chat+App",
        details: "Stay connected securely. This chat app features real-time messaging, file sharing, and robust end-to-end encryption for privacy."
    },
    {
        title: "Portfolio Website v1",
        description: "My first portfolio website built with HTML, CSS, and vanilla JavaScript.",
        tags: ["HTML", "CSS", "JavaScript"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Portfolio+v1",
        details: "A retrospective look at my first portfolio. It showcases my early understanding of web fundamentals and responsive design."
    },
    {
        title: "Recipe Finder",
        description: "Search for recipes based on ingredients you have at home.",
        tags: ["React", "Edamam API", "Styled Components"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Recipe+Finder",
        details: "Don't know what to cook? Enter your available ingredients and get delicious recipe suggestions instantly."
    },
    {
        title: "Budget Planner",
        description: "Personal finance tool for tracking income and expenses.",
        tags: ["Vue.js", "Chart.js", "Local Storage"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Budget+Planner",
        details: "Take control of your finances. Visualize your spending habits with interactive charts and set monthly budgets."
    },
    {
        title: "Markdown Editor",
        description: "Browser-based markdown editor with live preview.",
        tags: ["React", "Marked.js", "CodeMirror"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=MD+Editor",
        details: "Write and preview markdown in real-time. Features include syntax highlighting, export to HTML, and local auto-save."
    },
    {
        title: "Quiz App",
        description: "Interactive quiz application with various categories and difficulty levels.",
        tags: ["TypeScript", "React", "Open Trivia DB"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Quiz+App",
        details: "Test your knowledge! Choose from multiple categories, track your score, and compete on the leaderboard."
    },
    {
        title: "Music Player",
        description: "Custom audio player with playlist support and visualizer.",
        tags: ["JavaScript", "Web Audio API", "Canvas"],
        image: "https://via.placeholder.com/600x400/0b0c10/66fcf1?text=Music+Player",
        details: "A sleek music player built from scratch. Features a frequency visualizer powered by the Web Audio API and HTML5 Canvas."
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
                    04. Projects
                </h2>
                <div style={{ position: 'relative' }}>
                    <button
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
