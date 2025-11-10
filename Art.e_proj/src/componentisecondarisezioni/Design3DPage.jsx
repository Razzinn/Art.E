/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import './Design3DPage.css';

export default function Design3DPage() {
	const { t, isLoading } = useTranslation();
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isVideoHovered, setIsVideoHovered] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const heroRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const contentControls = useAnimation();
	const animationFrameRef = useRef();
	
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Ottimizzazione: Configurazione particelle ultra-leggera
	const particleConfig = useMemo(() => ({
		count: 50, // Ulteriormente ridotto da 80
		connectionDistance: 80, // Ridotto da 100
		updateInterval: 32, // Ridotto a 30fps per performance migliori
		maxConnections: 3 // Limite massimo connessioni per particella
	}), []);

	// Effetto Canvas super-ottimizzato con particelle 3D
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		// Ottimizzazione aggressiva: Risoluzione fissa per prestazioni
		const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
		canvas.width = window.innerWidth * pixelRatio;
		canvas.height = window.innerHeight * pixelRatio;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ctx.scale(pixelRatio, pixelRatio);

		// Ottimizzazione: Pre-calcolo colori e gradient
		const baseColors = [
			'hsla(210, 60%, 50%, 0.8)',
			'hsla(220, 70%, 60%, 0.7)',
			'hsla(200, 50%, 40%, 0.6)'
		];

		const particles = [];
		let lastUpdateTime = 0;
		
		class Particle {
			constructor() {
				this.reset();
				this.y = Math.random() * canvas.height / pixelRatio;
				this.baseSize = Math.random() * 1.5 + 0.3; // Ulteriormente ridotto
			}
			
			reset() {
				this.x = Math.random() * canvas.width / pixelRatio;
				this.y = -10;
				this.z = Math.random() * 600; // Ridotto range Z
				this.vx = (Math.random() - 0.5) * 0.2; // Ridotta velocità
				this.vy = Math.random() * 0.25 + 0.1;
				this.opacity = Math.random() * 0.3 + 0.15; // Ridotta opacità
				this.hue = Math.random() * 30 + 200; // Ridotto range colori
				this.colorIndex = Math.floor(Math.random() * baseColors.length);
			}
			
			update() {
				// Ottimizzazione: Mouse influence ulteriormente ridotto
				this.x += this.vx + mousePos.x * 0.005;
				this.y += this.vy + mousePos.y * 0.002;
				this.z -= 1;
				if (this.y > canvas.height / pixelRatio || this.z < 0) this.reset();
				if (this.x < 0 || this.x > canvas.width / pixelRatio) this.vx *= -1;
			}
			
			draw() {
				const scale = 600 / (600 - this.z);
				const x = (this.x - canvas.width / pixelRatio / 2) * scale + canvas.width / pixelRatio / 2;
				const y = (this.y - canvas.height / pixelRatio / 2) * scale + canvas.height / pixelRatio / 2;
				const size = this.baseSize * scale;
				
				// Ottimizzazione: Colori pre-calcolati
				ctx.save();
				ctx.globalAlpha = this.opacity * (1 - this.z / 600);
				ctx.fillStyle = baseColors[this.colorIndex];
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			}
		}
		
		for (let i = 0; i < particleConfig.count; i++) particles.push(new Particle());
		
		let lastTime = 0;
		const animate = (currentTime) => {
			// Ottimizzazione: Throttling degli update più aggressivo
			if (currentTime - lastTime < particleConfig.updateInterval) {
				animationFrameRef.current = requestAnimationFrame(animate);
				return;
			}
			lastTime = currentTime;

			// Ottimizzazione: Clear più efficiente
			ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
			ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
			
			// Ottimizzazione: Update particelle ogni 2 frame
			if (currentTime - lastUpdateTime > particleConfig.updateInterval) {
				particles.forEach(p => p.update());
				lastUpdateTime = currentTime;
			}
			
			// Draw sempre per fluidità visiva
			particles.forEach(p => p.draw());

			// Ottimizzazione: Connessioni ultra-semplificate - solo ogni 5 frame
			if (Math.floor(currentTime / 160) % 5 === 0) {
				let connectionCount = 0;
				for (let i = 0; i < particles.length && connectionCount < 15; i += 3) {
					for (let j = i + 3; j < particles.length && connectionCount < 15; j += 3) {
						const dx = particles[i].x - particles[j].x;
						const dy = particles[i].y - particles[j].y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < particleConfig.connectionDistance) {
							ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 * (1 - dist / particleConfig.connectionDistance)})`;
							ctx.lineWidth = 0.2;
							ctx.beginPath();
							ctx.moveTo(particles[i].x, particles[i].y);
							ctx.lineTo(particles[j].x, particles[j].y);
							ctx.stroke();
							connectionCount++;
						}
					}
				}
			}
			animationFrameRef.current = requestAnimationFrame(animate);
		};
		
		animationFrameRef.current = requestAnimationFrame(animate);
		
		const handleResize = () => {
			const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
			canvas.width = window.innerWidth * pixelRatio;
			canvas.height = window.innerHeight * pixelRatio;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			ctx.scale(pixelRatio, pixelRatio);
		};
		window.addEventListener('resize', handleResize);
		
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			window.removeEventListener('resize', handleResize);
		};
	}, [mousePos, particleConfig]);

	// Mouse e scroll tracking ottimizzato con throttling
	useEffect(() => {
		let mouseMoveTimeout;
		let scrollTimeout;
		
		const handleMouseMove = (e) => {
			// Ottimizzazione: Throttling del mouse tracking
			if (mouseMoveTimeout) return;
			mouseMoveTimeout = setTimeout(() => {
				const x = (e.clientX / window.innerWidth - 0.5);
				const y = (e.clientY / window.innerHeight - 0.5);
				setMousePos({ x: x * 30, y: y * 30 }); // Ridotto moltiplicatore
				mouseX.set(x);
				mouseY.set(y);
				
				// Ottimizzazione: Transform più leggero
				const slide = document.querySelector(".design3d-hero-slide");
				if (slide) {
					slide.style.transform = `scale(1.05) translate3d(${x * 15}px, ${y * 15}px, 0) rotateY(${x * 1}deg)`;
				}
				mouseMoveTimeout = null;
			}, 16); // ~60fps
		};
		
		const handleScroll = () => {
			// Ottimizzazione: Throttling dello scroll
			if (scrollTimeout) return;
			scrollTimeout = setTimeout(() => {
				const progress = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
				setScrollProgress(progress);
				scrollTimeout = null;
			}, 16);
		};
		
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
			if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
			if (scrollTimeout) clearTimeout(scrollTimeout);
		};
	}, [mouseX, mouseY]);

	// Animazioni ultra-ottimizzate
	const textVariants = useMemo(() => ({
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
		})
	}), []);

	// Varianti container ottimizzate
	const containerVariants = useMemo(() => ({
		hidden: { opacity: 0 },
		visible: { 
			opacity: 1,
			transition: { 
				duration: 0.6,
				staggerChildren: 0.1,
				ease: "easeOut"
			}
		}
	}), []);

	return (
		<div className="design3d-hero" ref={heroRef}>
			<canvas ref={canvasRef} className="design3d-canvas" />
			<div className="design3d-hero-slide"></div>

			{/* Ottimizzazione: Orbs ultra-semplificati */}
			<div className="gradient-orbs">
				<motion.div 
					className="orb orb-1" 
					animate={{ x: [0, 30, 0], y: [0, -30, 0] }} 
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
				/>
				<motion.div 
					className="orb orb-2" 
					animate={{ x: [0, -45, 0], y: [0, 30, 0] }} 
					transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
				/>
			</div>

			{/* Ottimizzazione: Scan line disabilitata per performance */}
			{/* <motion.div 
				className="scan-line" 
				animate={{ y: ["-100%", "200%"] }} 
				transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
			/> */}

			<motion.div 
				className="design3d-content-wrapper" 
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Box ultra-ottimizzato con animazioni semplificate */}
				<motion.div 
					className="design3d-content"
					whileHover={{ 
						scale: 1.005,
						transition: { duration: 0.2 }
					}}
				>
					<div className="holographic-overlay" />
					
					<motion.h1 className="design3d-title" variants={textVariants}>
						{t('pages.design3d.title')}
					</motion.h1>

					<motion.h2 className="design3d-subtitle" variants={textVariants}>
						{t('pages.design3d.subtitle')}
					</motion.h2>

					{[
						t('pages.design3d.description1'),
						t('pages.design3d.description2'),
						t('pages.design3d.description3'),
						t('pages.design3d.description4')
					].map((text, i) => (
						<motion.p
							key={i}
							className={`design3d-description${i > 0 ? `-${['two', 'three', 'four'][i-1]}` : ''}`}
							variants={textVariants}
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					))}

					<motion.div
						className="design3d-description-important"
						variants={textVariants}
						whileHover={{ 
							scale: 1.01,
							transition: { duration: 0.15 }
						}}
					>
						<Link 
							to="/servizi/3d-design-stampa-3d"
							style={{
								color: 'inherit',
								textDecoration: 'none',
								display: 'block',
								width: '100%'
							}}
						>
							<span dangerouslySetInnerHTML={{ __html: t('pages.design3d.cta') }} />
						</Link>
					</motion.div>

					{/* Scroll indicator semplificato */}
					<motion.div 
						className="scroll-indicator" 
						animate={{ y: [0, 5, 0] }} 
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					>
						<div className="scroll-wheel" />
					</motion.div>
				</motion.div>

				{/* Video ultra-ottimizzato */}
				<motion.div
					className="design3d-video"
					variants={textVariants}
					whileHover={{ 
						scale: 1.008,
						transition: { duration: 0.2 }
					}}
					onHoverStart={() => setIsVideoHovered(true)}
					onHoverEnd={() => setIsVideoHovered(false)}
					style={{ transformStyle: "preserve-3d" }}
				>
					<div className="video-container">
						<div className="holo-border holo-border-1" />
						<div className="holo-border holo-border-2" />
						
						{/* Ottimizzazione: Glow ring semplificato */}
						<motion.div
							className="video-glow-ring"
							animate={{
								scale: isVideoHovered ? 1.1 : 1,
								opacity: isVideoHovered ? 0.6 : 0.2
							}}
							transition={{ duration: 0.5 }}
						/>
						
						{/* Video ottimizzato con preload metadata */}
						<video 
							ref={videoRef} 
							className="design3d-video-player" 
							autoPlay 
							loop 
							muted 
							playsInline
							preload="metadata"
							style={{
								filter: isVideoHovered ? 'brightness(1.05)' : 'brightness(1)',
								transition: 'filter 0.2s ease'
							}}>
							<source src="/videosezionisingole/3dvideo.mp4" type="video/mp4" />
							Il tuo browser non supporta i video HTML5.
						</video>
						
						{/* Reflection ultra-semplificata */}
						<div className="video-reflection" style={{ opacity: 0.1 }} />
					</div>
				</motion.div>
			</motion.div>

			{/* Cursor semplificato - disabilitato per performance */}
			{/* <motion.div 
				className="custom-cursor-advanced" 
				animate={{ x: mousePos.x * 3, y: mousePos.y * 3 }} 
				transition={{ type: "spring", damping: 30, stiffness: 300 }}
			>
				<div className="cursor-ring" />
				<div className="cursor-dot" />
			</motion.div> */}

			{/* Progress bar ultra-ottimizzata */}
			<div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
		</div>
	);
}
