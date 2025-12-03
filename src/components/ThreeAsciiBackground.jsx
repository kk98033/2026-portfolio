import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import bgImage from '../assets/bg-rei.jpg';
import bgMobile from '../assets/bg-mobile.jpg';

const ThreeAsciiBackground = () => {
    const mountRef = useRef(null);

    // 根據裝置寬度決定初始圖片
    const isSmallScreen = window.innerWidth <= 1024;
    const currentSrc = isSmallScreen ? bgMobile : bgImage;

    // --- 定義常數，確保 Resize 前後數值一致 ---
    const FONT_SIZE_MOBILE = 5.0;  // 你設定的高解析度
    const FONT_SIZE_DESKTOP = 5.0;

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // --- 1. 初始化 Three.js 場景 ---
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: "high-performance"
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- 2. 生成 ASCII 字型貼圖 ---
        const createFontTexture = () => {
            const charSet = ' .:-=+*#%@';
            const fontSize = 64;
            const canvas = document.createElement('canvas');
            canvas.width = fontSize * charSet.length;
            canvas.height = fontSize;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            for (let i = 0; i < charSet.length; i++) {
                ctx.fillText(charSet[i], i * fontSize + fontSize / 2, fontSize / 2);
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            return { texture, charCount: charSet.length };
        };

        const { texture: fontTexture, charCount } = createFontTexture();

        // --- 3. 載入背景圖片 & 建立 Shader 材質 ---
        const loader = new THREE.TextureLoader();

        loader.load(currentSrc, (bgTexture) => {
            const imgAspect = bgTexture.image.width / bgTexture.image.height;

            const material = new THREE.ShaderMaterial({
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(-9999, -9999) },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uBgTexture: { value: bgTexture },
                    uFontTexture: { value: fontTexture },
                    uCharCount: { value: charCount },
                    // 修正：使用常數
                    uFontSize: { value: isSmallScreen ? FONT_SIZE_MOBILE : FONT_SIZE_DESKTOP },
                    uIsMobile: { value: isSmallScreen },
                    uImgAspect: { value: imgAspect }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float uTime;
                    uniform vec2 uMouse;
                    uniform vec2 uResolution;
                    uniform sampler2D uBgTexture;
                    uniform sampler2D uFontTexture;
                    uniform float uCharCount;
                    uniform float uFontSize;
                    uniform bool uIsMobile;
                    uniform float uImgAspect;
                    
                    varying vec2 vUv;

                    vec3 hsl2rgb(vec3 c) {
                        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
                        return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
                    }

                    void main() {
                        float screenAspect = uResolution.x / uResolution.y;
                        vec2 grid = vec2(uResolution.x / uFontSize, uResolution.y / uFontSize);
                        vec2 cellCoord = floor(vUv * grid);
                        vec2 cellUV = fract(vUv * grid);

                        vec2 sampleUV = (cellCoord + 0.5) / grid;
                        vec2 uv = sampleUV;

                        if (screenAspect > uImgAspect) {
                            float scale = uImgAspect / screenAspect;
                            uv.y = (uv.y - 0.5) * scale + 0.5;
                        } else {
                            float scale = screenAspect / uImgAspect;
                            uv.x = (uv.x - 0.5) * scale + 0.5;
                        }

                        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

                        vec4 color = texture2D(uBgTexture, uv);
                        float brightness = (color.r + color.g + color.b) / 3.0;
                        
                        if (brightness < 0.02) {
                             gl_FragColor = vec4(0.12, 0.16, 0.2, 0.05); 
                             return;
                        }

                        float charIdx = floor(brightness * (uCharCount - 0.01));
                        vec2 fontUV = vec2((cellUV.x + charIdx) / uCharCount, cellUV.y);
                        vec4 charColor = texture2D(uFontTexture, fontUV);

                        if (charColor.a < 0.5) discard;

                        vec2 cellPixelPos = (cellCoord + 0.5) * uFontSize;
                        vec2 mousePos = vec2(uMouse.x, uResolution.y - uMouse.y);
                        
                        float dist = distance(cellPixelPos, mousePos);
                        float maxDist = uIsMobile ? 300.0 : 500.0;
                        
                        float opacity = 0.0;
                        
                        if (uIsMobile) {
                            float interact = 1.0 - smoothstep(0.0, maxDist, dist);
                            opacity = 0.6 + interact * 0.4; 
                        } else {
                            float interact = 1.0 - smoothstep(0.0, maxDist, dist);
                            interact = pow(interact, 3.0);
                            opacity = 0.05 + interact; 
                        }

                        if (opacity > 0.1) {
                            float speed = uIsMobile ? 0.8 : 0.5;
                            float t = uTime * speed;
                            float wx = cellCoord.x * uFontSize;
                            float wy = cellCoord.y * uFontSize;

                            float waveX = sin(wx * 0.005 + t);
                            float waveY = cos(wy * 0.005 + t * 0.8);
                            float waveZ = sin((wx + wy) * 0.002 + t * 1.5);

                            float hueRange = uIsMobile ? 0.11 : 0.08;
                            float baseHue = 0.47; 
                            float hue = baseHue + (waveX + waveY + waveZ) * hueRange;
                            
                            vec3 waveColor = hsl2rgb(vec3(hue, 1.0, 0.7));
                            float alpha = uIsMobile ? opacity * 0.8 : opacity;
                            
                            gl_FragColor = vec4(waveColor, alpha);
                        } else {
                             float wave = sin(cellCoord.x * 0.1 + cellCoord.y * 0.1 + uTime * 2.0) * 0.5 + 0.5;
                             gl_FragColor = vec4(0.12, 0.16, 0.2, 0.05 * wave);
                        }
                    }
                `
            });

            const geometry = new THREE.PlaneGeometry(2, 2);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const clock = new THREE.Clock();

            const animate = () => {
                requestAnimationFrame(animate);
                material.uniforms.uTime.value = clock.getElapsedTime();
                renderer.render(scene, camera);
            };
            animate();

            // 用來記錄上一次的寬度，初始值設為目前的視窗寬度
            let lastWidth = window.innerWidth;

            const handleResize = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;

                // 關鍵修正：如果寬度沒有變（表示只是手機網址列伸縮），就直接忽略，不執行重繪
                if (w === lastWidth) return;

                // 更新記錄的寬度
                lastWidth = w;

                // 只有寬度變了（例如旋轉手機、電腦拉視窗）才執行下面的重置邏輯
                renderer.setSize(w, h);
                material.uniforms.uResolution.value.set(w, h);

                const mobile = w <= 1024;
                material.uniforms.uIsMobile.value = mobile;
                material.uniforms.uFontSize.value = mobile ? FONT_SIZE_MOBILE : FONT_SIZE_DESKTOP;
            };

            const handleMouseMove = (e) => {
                material.uniforms.uMouse.value.set(e.clientX, e.clientY);
            };

            const handleTouchMove = (e) => {
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    material.uniforms.uMouse.value.set(touch.clientX, touch.clientY);
                }
            };

            window.addEventListener('resize', handleResize);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);

            mesh.userData.cleanup = () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('touchmove', handleTouchMove);
                geometry.dispose();
                material.dispose();
                bgTexture.dispose();
                fontTexture.dispose();
            };
        });

        return () => {
            if (scene.children.length > 0) {
                scene.children[0].userData.cleanup && scene.children[0].userData.cleanup();
            }
            renderer.dispose();
            if (container) container.removeChild(renderer.domElement);
        };
    }, [currentSrc]);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                background: '#0b0c10',
                pointerEvents: 'none'
            }}
        />
    );
};

export default ThreeAsciiBackground;