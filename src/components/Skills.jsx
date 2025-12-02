import React from 'react';

const skillsData = {
    row1: [
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
        { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
        { name: "Swift", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
        { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Ruby", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" }
    ],
    row2: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
        { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
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
                    The technologies that power my creations.
                </p>
            </div>

            <ScrollingRow items={skillsData.row1} direction="left" speed={40} />
            <ScrollingRow items={skillsData.row2} direction="right" speed={45} />
        </section>
    );
};

export default Skills;
