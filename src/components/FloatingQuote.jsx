import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const FloatingQuote = () => {
    const text = "What if we just hadn't said goodbye?";
    const characters = text.split('');
    const containerRef = useRef(null);

    // Track mouse globally for physics interaction
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                zIndex: 10,
                display: 'flex',
                flexWrap: 'nowrap',
                pointerEvents: 'none', // Let mouse pass through to window listener
                userSelect: 'none',
            }}
        >
            {characters.map((char, index) => (
                <PhysicsChar
                    key={index}
                    char={char}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    index={index}
                />
            ))}
        </div>
    );
};

const PhysicsChar = ({ char, mouseX, mouseY, index }) => {
    const ref = useRef(null);
    const [isShattered, setIsShattered] = useState(false);

    // Physics springs
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 1 });
    const rotate = useSpring(0, { stiffness: 100, damping: 20 });
    const scale = useSpring(1, { stiffness: 200, damping: 20 });
    const opacity = useSpring(0.4, { stiffness: 100, damping: 20 });

    // Random subtle float parameters
    const floatSpeed = Math.random() * 0.0005 + 0.0002;
    const floatOffset = Math.random() * Math.PI * 2;
    const floatAmp = 3; // Very subtle amplitude (3px)

    useEffect(() => {
        let animationFrame;

        const updatePhysics = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mx = mouseX.get();
            const my = mouseY.get();

            const dx = mx - centerX;
            const dy = my - centerY;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Interaction radius
            const radius = 80;

            if (dist < radius) {
                // Repulsion force
                const force = (1 - dist / radius) * 300; // Strong kick
                const angle = Math.atan2(dy, dx);

                const pushX = -Math.cos(angle) * force;
                const pushY = -Math.sin(angle) * force;

                x.set(pushX + (Math.random() - 0.5) * 50); // Add some chaos
                y.set(pushY + (Math.random() - 0.5) * 50);
                rotate.set((Math.random() - 0.5) * 360); // Spin wildy

                // Shatter effect
                setIsShattered(true);
            } else if (isShattered) {
                // If shattered, stay broken for a bit, then slowly heal if far away
                if (dist > 300) {
                    setIsShattered(false);
                }
            } else {
                // Idle floating
                const time = Date.now();
                const floatX = Math.sin(time * floatSpeed + floatOffset) * floatAmp;
                const floatY = Math.cos(time * floatSpeed * 1.3 + floatOffset) * floatAmp;

                x.set(floatX);
                y.set(floatY);
                rotate.set(Math.sin(time * floatSpeed * 2) * 5); // Subtle rotation
            }

            // Visual state based on shattered
            if (isShattered) {
                scale.set(0); // Shrink to nothing
                opacity.set(0); // Fade out
            } else {
                scale.set(1);
                opacity.set(0.4); // Base opacity
            }

            animationFrame = requestAnimationFrame(updatePhysics);
        };

        animationFrame = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(animationFrame);
    }, [isShattered, mouseX, mouseY, x, y, rotate, scale, opacity, floatSpeed, floatOffset]);

    return (
        <motion.span
            ref={ref}
            style={{
                x,
                y,
                rotate,
                scale,
                opacity,
                display: 'inline-block',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.9rem',
                color: 'white',
                textShadow: '0 0 5px rgba(100, 255, 218, 0.3)',
                whiteSpace: 'pre',
                filter: isShattered ? 'blur(4px)' : 'none', // Pixel/blur effect
            }}
        >
            {char}
        </motion.span>
    );
};

export default FloatingQuote;
