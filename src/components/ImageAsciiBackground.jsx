import React, { useEffect, useRef, useState } from 'react';
import bgImage from '../assets/bg-rei.jpg';
import bgMobile from '../assets/bg-mobile.jpg';

const ImageAsciiBackground = () => {
    const canvasRef = useRef(null);
    // 新增一個 ref 來存儲靜態背景
    const staticCanvasRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const gridRef = useRef([]);
    const starsRef = useRef([]);

    const isSmallScreen = window.innerWidth <= 1024;
    const [currentSrc, setCurrentSrc] = useState(isSmallScreen ? bgMobile : bgImage);

    // ... (Resize 和 Image Loading 邏輯保持不變) ...
    // Handle resize and image switching
    useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth <= 1024;
            const newSrc = small ? bgMobile : bgImage;
            if (newSrc !== currentSrc) {
                setCurrentSrc(newSrc);
                setImageLoaded(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentSrc]);

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

        // 創建離螢幕 Canvas
        if (!staticCanvasRef.current) {
            staticCanvasRef.current = document.createElement('canvas');
        }
        const staticCanvas = staticCanvasRef.current;
        const staticCtx = staticCanvas.getContext('2d', { alpha: false });

        let animationFrameId;

        // Configuration
        const fontSize = 5; // 可以在這裡嘗試調大一點，例如 10 或 12，對效能也有幫助
        const charSet = ' .:-=+*#%@';

        // 初始化滑鼠位置在螢幕外，避免一開始就高亮
        let mouseX = -1000;
        let mouseY = -1000;

        // Pre-calculate grid and stars
        const initGrid = () => {
            if (!imageRef.current) return;

            const w = window.innerWidth;
            const h = window.innerHeight;

            // 設定兩個 Canvas 的尺寸
            canvas.width = w;
            canvas.height = h;
            staticCanvas.width = w;
            staticCanvas.height = h;

            // ... (圖片比例計算與 getImageData 邏輯保持不變) ...
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
            offCtx.drawImage(
                img,
                0, 0, img.width, img.height,
                offsetX / fontSize, offsetY / fontSize, drawW / fontSize, drawH / fontSize
            );
            const imageData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

            const cols = Math.floor(w / fontSize);
            const rows = Math.floor(h / fontSize);
            const newGrid = [];

            // --- 預先繪製靜態背景 ---
            staticCtx.fillStyle = '#0b0c10';
            staticCtx.fillRect(0, 0, w, h);
            staticCtx.font = `${fontSize}px monospace`;
            staticCtx.textBaseline = 'top';
            staticCtx.fillStyle = `rgba(31, 40, 51, 0.05)`; // 固定底色，不參與動畫

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
                    const char = charSet[charIndex];

                    const x = i * fontSize;
                    const y = j * fontSize;

                    // 存入 grid 用於動態檢測
                    newGrid.push({ x, y, char, color: avg });

                    // 直接畫在靜態背景上
                    staticCtx.fillText(char, x, y);
                }
            }
            gridRef.current = newGrid;

            // Generate Stars (Stars can also be optimized, but let's keep them dynamic for now)
            // ... (Stars logic same as before) ...
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

        const handleResizeGrid = () => {
            initGrid();
        };
        window.addEventListener('resize', handleResizeGrid);

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        initGrid();

        // 限制 FPS 變數
        let lastTime = 0;
        const fpsInterval = 1000 / 30; // 限制在 30 FPS，對於背景特效來說足夠了

        const render = (time) => {
            animationFrameId = requestAnimationFrame((t) => render(t));

            // FPS Throttling
            const elapsed = time - lastTime;
            if (elapsed < fpsInterval) return;
            lastTime = time - (elapsed % fpsInterval);

            if (!ctx) return;

            // 1. 畫背景：直接拷貝靜態 Canvas，這比 fillRect + fillText 快幾萬倍
            ctx.drawImage(staticCanvas, 0, 0);

            ctx.font = `${fontSize}px monospace`;
            ctx.textBaseline = 'top';

            // 2. 只繪製滑鼠附近的動態字元
            const grid = gridRef.current;
            const len = grid.length;
            const isTouchDevice = window.innerWidth <= 1024;

            // 定義互動範圍 (平方值避免開根號)
            const interactionRadius = isTouchDevice ? 0 : 500;
            const interactionRadiusSq = interactionRadius * interactionRadius;

            // 如果是 Touch Device (手機/平板)，我們可以選擇只畫靜態背景，或者降低特效
            // 這裡假設手機版全屏稍微變亮，還是需要遍歷，但我們可以跳過部分點

            for (let i = 0; i < len; i++) {
                const cell = grid[i];

                // 優化：先算出距離平方
                const dx = cell.x - mouseX;
                const dy = cell.y - mouseY;
                const distSq = dx * dx + dy * dy;

                // 只有在互動範圍內的字元才進行重繪
                if (distSq < interactionRadiusSq || isTouchDevice) {
                    let opacity = 0;

                    if (isTouchDevice) {
                        opacity = 0.6; // 手機版固定亮度
                    } else {
                        // Desktop: Reveal on hover
                        const dist = Math.sqrt(distSq);
                        opacity = 1 - (dist / interactionRadius);
                        opacity = opacity * opacity * opacity;
                    }

                    if (opacity > 0.05) {
                        // 計算動態顏色 (這部分的數學計算保留，因為只對少量字元執行)
                        const speed = isTouchDevice ? 0.001 : 0.0005;
                        const waveX = Math.sin(cell.x * 0.005 + time * speed);
                        const waveY = Math.cos(cell.y * 0.005 + time * speed * 0.8);
                        const waveZ = Math.sin((cell.x + cell.y) * 0.002 + time * speed * 1.5);

                        const hueRange = isTouchDevice ? 40 : 30;
                        const hue = 170 + (waveX + waveY + waveZ) * (hueRange / 1.5);
                        const alpha = isTouchDevice ? opacity * 0.8 : opacity;

                        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
                        // 覆蓋繪製在靜態背景之上
                        ctx.fillText(cell.char, cell.x, cell.y);
                    }
                }
            }

            // 3. Draw Stars (Stars 數量少，可以全畫)
            const stars = starsRef.current;
            const starLen = stars.length;

            for (let i = 0; i < starLen; i++) {
                const star = stars[i];
                // ... (Stars rendering logic keeps same) ...
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