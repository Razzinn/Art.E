/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import './Design3DPage.css';

export default function Design3DPage() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isVideoHovered, setIsVideoHovered] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const heroRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const rafRef = useRef(null);
	const contentControls = useAnimation();
	
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const shouldReduceMotion = useReducedMotion();

	// Optimize particle count based on device
	const particleCount = useMemo(() => {
		const isMobile = window.innerWidth < 768;
		const isLowEnd = navigator.hardwareConcurrency < 4;
		const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
		
		if (isMobile || isLowEnd || hasLowMemory) return 50;
		if (window.innerWidth < 1024) return 100;
		return 150;
	}, []);

	// Effetto Canvas con particelle 3D (ultra-ottimizzato)
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || shouldReduceMotion) return;
		
		const ctx = canvas.getContext('2d', { 
			alpha: false,
			desynchronized: true, // Migliora performance
			willReadFrequently: false
		});
		
		const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limita DPR per performance
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ctx.scale(dpr, dpr);

		const particles = [];
		
		class Particle {
			constructor() {
				this.reset();
				this.y = Math.random() * canvas.height / dpr;
				this.baseSize = Math.random() * 2 + 1;
			}
			
			reset() {
				this.x = Math.random() * canvas.width / dpr;
				this.y = -10;
				this.z = Math.random() * 1000;
				this.vx = (Math.random() - 0.5) * 0.4;
				this.vy = Math.random() * 0.4 + 0.2;
				this.opacity = Math.random() * 0.4 + 0.3;
				this.hue = Math.random() * 40 + 200;
			}
			
			update() {
				this.x += this.vx + mousePos.x * 0.015;
				this.y += this.vy + mousePos.y * 0.008;
				this.z -= 1.5;
				if (this.y > canvas.height / dpr || this.z < 0) this.reset();
				if (this.x < 0 || this.x > canvas.width / dpr) this.vx *= -1;
			}
			
			draw() {
				const scale = 1000 / (1000 - this.z);
				const x = (this.x - canvas.width / dpr / 2) * scale + canvas.width / dpr / 2;
				const y = (this.y - canvas.height / dpr / 2) * scale + canvas.height / dpr / 2;
				const size = this.baseSize * scale;
				
				ctx.globalAlpha = this.opacity * (1 - this.z / 1000);
				ctx.fillStyle = `hsl(${this.hue}, 80%, 60%)`;
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2);
				ctx.fill();
			}
		}
		
		for (let i = 0; i < particleCount; i++) particles.push(new Particle());
		
		let animationId;
		let lastTime = performance.now();
		const targetFPS = 60;
		const frameTime = 1000 / targetFPS;
		let frameCount = 0;
		
		const animate = (currentTime) => {
			const deltaTime = currentTime - lastTime;
			
			if (deltaTime >= frameTime) {
				ctx.fillStyle = 'rgba(10, 14, 26, 0.15)';
				ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
				
				// Draw particles without connections on mobile
				const drawConnections = window.innerWidth >= 1024 && frameCount % 2 === 0;
				
				particles.forEach((p, i) => {
					p.update();
					p.draw();
					
					if (drawConnections && i % 3 === 0) {
						particles.forEach((p2, j) => {
							if (i === j || j % 3 !== 0) return;
							const dx = p.x - p2.x;
							const dy = p.y - p2.y;
							const dist = Math.sqrt(dx * dx + dy * dy);
							if (dist < 80) {
								ctx.strokeStyle = `hsla(210, 70%, 60%, ${0.08 * (1 - dist / 80)})`;
								ctx.lineWidth = 0.5;
								ctx.beginPath();
								ctx.moveTo(p.x, p.y);
								ctx.lineTo(p2.x, p2.y);
								ctx.stroke();
							}
						});
					}
				});
				
				lastTime = currentTime - (deltaTime % frameTime);
				frameCount++;
			}
			
			animationId = requestAnimationFrame(animate);
		};
		
		animate(lastTime);
		
		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const dpr = Math.min(window.devicePixelRatio || 1, 2);
				canvas.width = window.innerWidth * dpr;
				canvas.height = window.innerHeight * dpr;
				canvas.style.width = window.innerWidth + 'px';
				canvas.style.height = window.innerHeight + 'px';
				ctx.scale(dpr, dpr);
			}, 200);
		};
		
		window.addEventListener('resize', handleResize, { passive: true });
		
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			clearTimeout(resizeTimeout);
		};
	}, [mousePos, particleCount, shouldReduceMotion]);

	// Mouse tracking ultra-ottimizzato con throttling
	const handleMouseMove = useCallback((e) => {
		if (rafRef.current) return;
		
		rafRef.current = requestAnimationFrame(() => {
			const x = (e.clientX / window.innerWidth - 0.5);
			const y = (e.clientY / window.innerHeight - 0.5);
			
			setMousePos({ x: x * 40, y: y * 40 });
			mouseX.set(x);
			mouseY.set(y);
			
			const slide = document.querySelector(".design3d-hero-slide");
			if (slide && window.innerWidth >= 768) {
				slide.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
			}
			
			rafRef.current = null;
		});
	}, [mouseX, mouseY]);
	
	const handleScroll = useCallback(() => {
		const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
		setScrollProgress(progress);
	}, []);
	
	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [handleMouseMove, handleScroll]);

	// Varianti animate ottimizzate
	const textVariants = useMemo(() => ({
		hidden: { 
			opacity: 0, 
			y: shouldReduceMotion ? 0 : 50, 
			rotateX: shouldReduceMotion ? 0 : -90 
		},
		visible: (i) => ({
			opacity: 1,
			y: 0,
			rotateX: 0,
			transition: { 
				delay: shouldReduceMotion ? 0 : i * 0.1, 
				duration: shouldReduceMotion ? 0.3 : 0.8, 
				ease: [0.22, 1, 0.36, 1] 
			}
		})
	}), [shouldReduceMotion]);

	// Video preload e lazy loading
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
			// Preload hint
			const link = document.createElement('link');
			link.rel = 'preload';
			link.as = 'video';
			link.href = '/videosezionisingole/3dvideo.mp4';
			document.head.appendChild(link);
		}
	}, []);

	// Pause animations when tab not visible
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden && videoRef.current) {
				videoRef.current.pause();
			} else if (videoRef.current) {
				videoRef.current.play();
			}
		};
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	}, []);

	return (
		<div className="design3d-hero" ref={heroRef}>
			<canvas ref={canvasRef} className="design3d-canvas" />
			<div className="design3d-hero-slide"></div>

			{/* Orbs con animazioni semplificate */}
			<div className="gradient-orbs">
				<motion.div 
					className="orb orb-1" 
					animate={shouldReduceMotion ? {} : { 
						x: [0, 80, 0], 
						y: [0, -80, 0] 
					}} 
					transition={{ 
						duration: 25, 
						repeat: Infinity, 
						ease: "linear",
						repeatType: "reverse"
					}} 
				/>
				<motion.div 
					className="orb orb-2" 
					animate={shouldReduceMotion ? {} : { 
						x: [0, -120, 0], 
						y: [0, 80, 0] 
					}} 
					transition={{ 
						duration: 30, 
						repeat: Infinity, 
						ease: "linear",
						repeatType: "reverse"
					}} 
				/>
				<motion.div 
					className="orb orb-3" 
					animate={shouldReduceMotion ? {} : { 
						x: [0, 60, 0], 
						y: [0, 120, 0] 
					}} 
					transition={{ 
						duration: 22, 
						repeat: Infinity, 
						ease: "linear",
						repeatType: "reverse"
					}} 
				/>
			</div>

			{!shouldReduceMotion && (
				<motion.div 
					className="scan-line" 
					animate={{ y: ["-100%", "200%"] }} 
					transition={{ 
						duration: 10, 
						repeat: Infinity, 
						ease: "linear" 
					}} 
				/>
			)}

			<motion.div className="design3d-content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
				<motion.div 
					className="design3d-content"
					style={{ transformStyle: "preserve-3d" }}
					whileHover={{ 
						scale: 1.01,
						transition: { duration: 0.3 }
					}}
				>
					<div className="holographic-overlay" />
					
					<motion.h1 className="design3d-title" custom={0} initial="hidden" animate="visible" variants={textVariants}>
						STAMPA 3D
					</motion.h1>

					<motion.h2 className="design3d-subtitle" custom={1} initial="hidden" animate="visible" variants={textVariants}>
						Dal prototipo all'oggetto finito: diamo forma all'immaginazione.
					</motion.h2>

					{[
						"La stampa 3D è il cuore di <strong>CREO</strong>. Realizziamo prototipi, gadget, accessori e componenti tecnici con precisione e materiali di qualità.",
						"Utilizziamo tecnologie avanzate per garantire ottima resistenza, dettagli perfetti e finiture curate.",
						"Collaboriamo con designer, aziende, artigiani e privati per sviluppare progetti personalizzati, dalla fase di modellazione 3D fino alla produzione finale.",
						"Con la nostra esperienza, ogni idea può prendere vita, diventando un oggetto tangibile, funzionale e unico."
					].map((text, i) => (
						<motion.p
							key={i}
							className={`design3d-description${i > 0 ? `-${['two', 'three', 'four'][i-1]}` : ''}`}
							custom={i + 2}
							initial="hidden"
							animate="visible"
							variants={textVariants}
							whileHover={{ 
								x: 15,
								color: "#e0f2fe",
								transition: { duration: 0.2 }
							}}
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					))}

					<motion.p
						className="design3d-description-important"
						custom={6}
						initial="hidden"
						animate="visible"
						variants={textVariants}
						whileHover={{ 
							scale: 1.08,
							x: 20,
							textShadow: "0 0 25px rgba(250, 204, 21, 0.8)",
							transition: { duration: 0.3 }
						}}
					>
						➡️ <strong>Portaci la tua idea</strong>, noi la rendiamo reale.
					</motion.p>

					<motion.div className="scroll-indicator" animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
						<div className="scroll-wheel" />
					</motion.div>
				</motion.div>

				{/* Video ottimizzato */}
				<motion.div
					className="design3d-video"
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
					whileHover={{ 
						scale: 1.02,
						transition: { duration: 0.4 }
					}}
					onHoverStart={() => setIsVideoHovered(true)}
					onHoverEnd={() => setIsVideoHovered(false)}
				>
					<motion.div className="video-container">
						<div className="holo-border holo-border-1" />
						{window.innerWidth >= 1024 && (
							<>
								<div className="holo-border holo-border-2" />
								<div className="holo-border holo-border-3" />
							</>
						)}
						<video 
							ref={videoRef} 
							className="design3d-video-player" 
							autoPlay 
							loop 
							muted 
							playsInline
							preload="metadata"
							poster="/videosezionisingole/3dvideo-poster.jpg"
						>
							<source src="/videosezionisingole/3dvideo.mp4" type="video/mp4" />
						</video>
					</motion.div>
				</motion.div>
			</motion.div>

			{/* Cursor solo su desktop */}
			{window.innerWidth >= 1024 && (
				<motion.div 
					className="custom-cursor-advanced" 
					animate={{ x: mousePos.x * 8, y: mousePos.y * 8 }} 
					transition={{ 
						type: "spring", 
						damping: 25, 
						stiffness: 200,
						mass: 0.5
					}}
				>
					<div className="cursor-ring" />
					<div className="cursor-dot" />
				</motion.div>
			)}

			<motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} />
		</div>
	);
}
