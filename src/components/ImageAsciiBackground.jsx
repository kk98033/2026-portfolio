import React, { useEffect, useRef, useState } from 'react';
import bgImage from '../assets/bg-rei.jpg';
import bgMobile from '../assets/bg-mobile.jpg';

const ImageAsciiBackground = () => {
    const canvasRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const gridRef = useRef([]);
    const starsRef = useRef([]);

    // Track current image source to avoid unnecessary reloads
    // Use 1024px to include tablets (iPad Portrait is 768, Landscape 1024)
    const isSmallScreen = window.innerWidth <= 1024;
    const [currentSrc, setCurrentSrc] = useState(isSmallScreen ? bgMobile : bgImage);

    // Handle resize and image switching
    useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth <= 1024;
            const newSrc = small ? bgMobile : bgImage;
            if (newSrc !== currentSrc) {
                setCurrentSrc(newSrc);
                setImageLoaded(false); // Reset loaded state to trigger reload
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentSrc]);

    // Load image whenever source changes
    useEffect(() => {
        const img = new Image();
        img.src = currentSrc;
        img.onload = () => {
            imageRef.current = img;
            setImageLoaded(true);
        };
    }, [currentSrc]);

    useEffect(() => {
        if (!imageLoaded || !canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        let animationFrameId;

        // Configuration
        const fontSize = 8;
        const charSet = ' .:-=+*#%@';

        let mouseX = -1000;
        let mouseY = -1000;

        // Pre-calculate grid and stars
        const initGrid = () => {
            if (!imageRef.current) return;

            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;

            const img = imageRef.current;
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW, drawH, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawW = w;
                drawH = w / imgRatio;
                offsetX = 0;
                offsetY = (h - drawH) / 2;
            } else {
                drawH = h;
                drawW = h * imgRatio;
                offsetX = (w - drawW) / 2;
                offsetY = 0;
            }

            const offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = Math.ceil(w / fontSize);
            offscreenCanvas.height = Math.ceil(h / fontSize);
            const offCtx = offscreenCanvas.getContext('2d');

            offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

            // Use calculated dimensions to maintain aspect ratio (cover)
            // Scale down by fontSize to match offscreen canvas resolution
            offCtx.drawImage(
                img,
                0, 0, img.width, img.height,
                offsetX / fontSize, offsetY / fontSize, drawW / fontSize, drawH / fontSize
            );

            const imageData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

            const cols = Math.floor(w / fontSize);
            const rows = Math.floor(h / fontSize);
            const newGrid = [];

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const pixelIndex = (j * offscreenCanvas.width + i) * 4;
                    const r = imageData[pixelIndex];
                    const g = imageData[pixelIndex + 1];
                    const b = imageData[pixelIndex + 2];
                    const a = imageData[pixelIndex + 3];

                    if (a < 20) continue;

                    const avg = (r + g + b) / 3;
                    const charIndex = Math.floor((avg / 255) * (charSet.length - 1));

                    newGrid.push({
                        x: i * fontSize,
                        y: j * fontSize,
                        char: charSet[charIndex],
                        color: avg
                    });
                }
            }
            gridRef.current = newGrid;

            // Generate Stars
            const newStars = [];
            const starCount = 150;
            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 2 + 1,
                    phase: Math.random() * Math.PI * 2
                });
            }
            starsRef.current = newStars;
        };

        // Re-init grid on resize (separate from image switch)
        const handleResizeGrid = () => {
            initGrid();
        };
        window.addEventListener('resize', handleResizeGrid);

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Initial build
        initGrid();

        const render = (time) => {
            if (!ctx) return;

            // Clear main canvas
            ctx.fillStyle = '#0b0c10';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;
            ctx.textBaseline = 'top';

            // 1. Draw ASCII Grid
            const grid = gridRef.current;
            const len = grid.length;
            // Check breakpoint in render loop for responsiveness
            const isTouchDevice = window.innerWidth <= 1024;

            for (let i = 0; i < len; i++) {
                const cell = grid[i];

                let opacity = 0;

                if (isTouchDevice) {
                    // Mobile/Tablet: Always visible, brighter as requested
                    opacity = 0.6;
                } else {
                    // Desktop: Reveal on hover
                    const dx = cell.x - mouseX;
                    const dy = cell.y - mouseY;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 500;
                    const maxDistSq = maxDist * maxDist;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        opacity = 1 - (dist / maxDist);
                        opacity = opacity * opacity * opacity;
                    }
                }

                const baseOpacity = 0.05;
                const finalOpacity = opacity > baseOpacity ? opacity : baseOpacity;

                if (finalOpacity < 0.01) continue;

                const wave = Math.sin(cell.x * 0.01 + cell.y * 0.01 + time * 0.002) * 0.5 + 0.5;

                if (opacity > 0.1) {
                    // Animated Gradient Color
                    // "Wavy random" effect: Combine sine/cos waves on X and Y with different frequencies
                    const speed = isTouchDevice ? 0.001 : 0.0005; // Slower, more subtle

                    // Create an organic wave pattern
                    const waveX = Math.sin(cell.x * 0.005 + time * speed);
                    const waveY = Math.cos(cell.y * 0.005 + time * speed * 0.8);
                    const waveZ = Math.sin((cell.x + cell.y) * 0.002 + time * speed * 1.5);

                    const hueRange = isTouchDevice ? 40 : 30;
                    // Combine waves for a "random" drifting look
                    const hue = 170 + (waveX + waveY + waveZ) * (hueRange / 1.5);

                    // Mobile/Tablet gets brighter color (0.8 multiplier)
                    const alpha = isTouchDevice ? finalOpacity * 0.8 : finalOpacity;

                    ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
                } else {
                    ctx.fillStyle = `rgba(31, 40, 51, ${baseOpacity * wave})`;
                }

                ctx.fillText(cell.char, cell.x, cell.y);
            }

            // 2. Draw Stars (Repelled by Mouse)
            const stars = starsRef.current;
            const starLen = stars.length;

            for (let i = 0; i < starLen; i++) {
                const star = stars[i];
                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const distSq = dx * dx + dy * dy;
                const maxDist = 200;
                const maxDistSq = maxDist * maxDist;

                let repelX = 0;
                let repelY = 0;

                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / maxDist) * 50;
                    const angle = Math.atan2(dy, dx);
                    repelX = Math.cos(angle) * force;
                    repelY = Math.sin(angle) * force;
                }

                const twinkle = Math.sin(time * 0.003 + star.phase) * 0.5 + 0.5;
                const alpha = 0.3 + twinkle * 0.7;

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(star.x + repelX, star.y + repelY, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame((t) => render(t));
        };

        animationFrameId = requestAnimationFrame((t) => render(t));

        return () => {
            window.removeEventListener('resize', handleResizeGrid);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [imageLoaded]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: '#0b0c10'
            }}
        />
    );
};

export default ImageAsciiBackground;
