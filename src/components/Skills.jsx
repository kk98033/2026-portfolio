import React from 'react';

const skillsData = {
    row1: [
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "Unity", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
        { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Three.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
    ],
    row2: [
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "GCP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Arduino", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
        { name: "Raspberry Pi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
        { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" }, // Custom URL for OpenAI if devicon missing
        { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
    ]
};

const SkillTag = ({ item }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        margin: '0 2rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '15px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.3s ease, background 0.3s ease'
    }}
        className="skill-card"
    >
        <img
            src={item.url}
            alt={item.name}
            title={item.name}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))'
            }}
        />
    </div>
);

const ScrollingRow = ({ items, direction = 'left', speed = 40 }) => {
    return (
        <div style={{
            display: 'flex',
            overflow: 'hidden',
            width: '100%',
            marginBottom: '3rem',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}>
            <div className={`scroll-${direction}`} style={{
                display: 'flex',
                animationDuration: `${speed}s`,
                width: 'max-content' // Ensure container fits content
            }}>
                {items.map((item, index) => (
                    <SkillTag key={`original-${index}`} item={item} />
                ))}
                {/* Duplicate for seamless loop */}
                {items.map((item, index) => (
                    <SkillTag key={`dup-${index}`} item={item} />
                ))}
                {items.map((item, index) => (
                    <SkillTag key={`dup2-${index}`} item={item} />
                ))}
                {items.map((item, index) => (
                    <SkillTag key={`dup3-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" style={{
            width: '100%',
            padding: '100px 0',
            background: 'var(--bg-color)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto 4rem',
                padding: '0 20px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--accent-color)',
                    marginBottom: '1rem',
                    display: 'inline-block',
                    borderBottom: '1px solid var(--secondary-color)',
                    paddingBottom: '0.5rem'
                }}>
                    Technical Arsenal
                </h2>
                <p style={{ color: '#94a3b8' }}>
                    AI • VR • IoT • Backend • Frontend
                </p>
            </div>

            <ScrollingRow items={skillsData.row1} direction="left" speed={40} />
            <ScrollingRow items={skillsData.row2} direction="right" speed={45} />
        </section>
    );
};

export default Skills;
