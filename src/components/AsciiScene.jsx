import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const AsciiScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // ASCII Effect
        // Characters: ' .:-+*=%@#'
        // High-tech feel: maybe more binary or structural? ' .`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
        // Let's stick to a cleaner set for minimalism: ' .:-+*=%@#'
        const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
        effect.setSize(window.innerWidth, window.innerHeight);
        effect.domElement.style.color = 'var(--accent-color)';
        effect.domElement.style.backgroundColor = 'var(--bg-color)';
        effect.domElement.style.position = 'absolute';
        effect.domElement.style.top = '0';
        effect.domElement.style.left = '0';
        effect.domElement.style.zIndex = '-1'; // Behind content

        if (currentMount) {
            currentMount.appendChild(effect.domElement);
        }

        // Geometry
        const geometry = new THREE.IcosahedronGeometry(2.5, 1);
        const material = new THREE.MeshPhongMaterial({ flatShading: true });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Lights
        const pointLight1 = new THREE.PointLight(0xffffff, 1);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) / 100;
            mouseY = (event.clientY - window.innerHeight / 2) / 100;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            targetRotationX = mouseY * 0.5;
            targetRotationY = mouseX * 0.5;

            sphere.rotation.x += 0.05 * (targetRotationX - sphere.rotation.x);
            sphere.rotation.y += 0.05 * (targetRotationY - sphere.rotation.y);

            // Constant rotation
            sphere.rotation.y += 0.005;
            sphere.rotation.x += 0.002;

            effect.render(scene, camera);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            effect.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && effect.domElement) {
                currentMount.removeChild(effect.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default AsciiScene;
