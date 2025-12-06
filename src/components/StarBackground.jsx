import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // 清理容器
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const universe = new THREE.Group();
        scene.add(universe);

        // =========================================
        // 1. 背景星星 (保持原始大小 size: 0.005)
        // =========================================
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: '#66fcf1', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        universe.add(particlesMesh);

        // =========================================
        // 2. EVA End of Evangelion 彩蛋
        // =========================================

        // --- 繪製 EVA 初號機 (亮紫色) ---
        const getEvaTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 512;
            const ctx = canvas.getContext('2d');
            const cx = 256; const cy = 256;

            ctx.fillStyle = "#9b59b6"; // 亮紫色
            ctx.beginPath();
            ctx.moveTo(cx, cy - 80); ctx.lineTo(cx - 15, cy - 60); ctx.lineTo(cx + 15, cy - 60); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx - 20, cy - 60); ctx.lineTo(cx + 20, cy - 60); ctx.lineTo(cx + 5, cy + 100); ctx.lineTo(cx - 5, cy + 100); ctx.fill();

            ctx.beginPath(); ctx.moveTo(cx - 25, cy - 60); ctx.lineTo(cx - 60, cy - 90); ctx.lineTo(cx - 40, cy - 30); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cx + 25, cy - 60); ctx.lineTo(cx + 60, cy - 90); ctx.lineTo(cx + 40, cy - 30); ctx.fill();

            ctx.strokeStyle = "#145a32"; ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(cx - 40, cy - 40); ctx.lineTo(cx - 180, cy - 60);
            ctx.moveTo(cx + 40, cy - 40); ctx.lineTo(cx + 180, cy - 60);
            ctx.stroke();

            return new THREE.CanvasTexture(canvas);
        };

        // --- ★ 繪製朗基努斯之槍 (優化清晰版) ---
        const getSpearTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 160; // 加高畫布給曲線更多空間
            const ctx = canvas.getContext('2d');
            const cy = canvas.height / 2;

            // 定義關鍵點
            const startX = 40; const endX = 472;
            const cp1x = 180; const cp2x = 332;
            const marginY = 65; // 加大振幅讓曲線更飽滿

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // 1. 繪製底層較粗的暗紅色線條
            ctx.strokeStyle = "#641e16";
            ctx.lineWidth = 16;
            ctx.beginPath();
            ctx.moveTo(startX, cy); ctx.bezierCurveTo(cp1x, cy + marginY, cp2x, cy - marginY, endX, cy);
            ctx.moveTo(startX, cy); ctx.bezierCurveTo(cp1x, cy - marginY, cp2x, cy + marginY, endX, cy);
            ctx.stroke();

            // 2. 繪製上層較細、較亮的紅色線條，增加立體感和清晰度
            ctx.strokeStyle = "#922b21";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(startX, cy); ctx.bezierCurveTo(cp1x, cy + marginY, cp2x, cy - marginY, endX, cy);
            ctx.moveTo(startX, cy); ctx.bezierCurveTo(cp1x, cy - marginY, cp2x, cy + marginY, endX, cy);
            ctx.stroke();

            return new THREE.CanvasTexture(canvas);
        };

        const evaGroup = new THREE.Group();

        // EVA Mesh
        const evaGeometry = new THREE.PlaneGeometry(4, 4);
        const evaMaterial = new THREE.MeshBasicMaterial({
            map: getEvaTexture(), transparent: true, opacity: 0.5,
            side: THREE.DoubleSide, depthWrite: false, blending: THREE.NormalBlending
        });
        evaGroup.add(new THREE.Mesh(evaGeometry, evaMaterial));

        // Spear Mesh (保持較小尺寸)
        const spearGeometry = new THREE.PlaneGeometry(4, 1.25); // 稍微調整比例配合新畫布
        const spearMaterial = new THREE.MeshBasicMaterial({
            map: getSpearTexture(), transparent: true, opacity: 0.6, // 稍微提高一點透明度
            side: THREE.DoubleSide, depthWrite: false, blending: THREE.NormalBlending
        });
        const spearMesh = new THREE.Mesh(spearGeometry, spearMaterial);
        spearMesh.position.z = 0.5; spearMesh.position.y = 0.5;
        evaGroup.add(spearMesh);

        // 位置：極右、極深
        evaGroup.position.set(80, 40, -100);
        evaGroup.rotation.z = Math.PI / 6;
        evaGroup.rotation.y = -Math.PI / 3;

        universe.add(evaGroup);

        // =========================================
        // 3. 流星 (維持原樣)
        // =========================================
        const getShootingStarTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128; canvas.height = 8;
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 128, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.6)'); gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 8);
            return new THREE.CanvasTexture(canvas);
        };
        const shootingStar = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.02), new THREE.MeshBasicMaterial({ map: getShootingStarTexture(), transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
        shootingStar.visible = false;
        universe.add(shootingStar);

        let isShooting = false;
        const velocity = new THREE.Vector3();
        const launchShootingStar = () => {
            if (isShooting) return;
            isShooting = true; shootingStar.visible = true;
            const startPos = new THREE.Vector3().setFromSphericalCoords(10, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const targetPos = new THREE.Vector3().setFromSphericalCoords(3, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            shootingStar.position.copy(startPos);
            const direction = new THREE.Vector3().subVectors(targetPos, startPos).normalize();
            velocity.copy(direction).multiplyScalar(0.08);
            shootingStar.quaternion.setFromUnitVectors(new THREE.Vector3(-1, 0, 0), direction);
            shootingStar.scale.set(0.5 + Math.random(), 1, 1);
        };

        // --- 動畫 Loop ---
        let mouseX = 0; let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        const handleMouseMove = (e) => { mouseX = e.clientX - windowHalfX; mouseY = e.clientY - windowHalfY; };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            universe.rotation.y += 0.05 * (mouseX * 0.001 - universe.rotation.y);
            universe.rotation.x += 0.05 * (mouseY * 0.001 - universe.rotation.x);
            universe.rotation.z += 0.0005;

            evaGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.05;
            evaGroup.rotation.y += 0.0005;
            spearMesh.position.z = 0.5 + Math.sin(Date.now() * 0.001) * 0.05;

            if (isShooting) {
                shootingStar.position.add(velocity);
                if (shootingStar.position.lengthSq() > 250) { isShooting = false; shootingStar.visible = false; }
            } else if (Math.random() < 0.01) launchShootingStar();

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (container && renderer.domElement) container.removeChild(renderer.domElement);
            particlesGeometry.dispose(); particlesMaterial.dispose();
            evaGeometry.dispose(); evaMaterial.dispose(); if (evaMaterial.map) evaMaterial.map.dispose();
            spearGeometry.dispose(); spearMaterial.dispose(); if (spearMaterial.map) spearMaterial.map.dispose();
            shootingStar.geometry.dispose(); shootingStar.material.dispose(); if (shootingStar.material.map) shootingStar.material.map.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
    );
};

export default StarBackground;