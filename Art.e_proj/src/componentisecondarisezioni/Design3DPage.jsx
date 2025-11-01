/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import './Design3DPage.css';

export default function Design3DPage() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isVideoHovered, setIsVideoHovered] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const heroRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const contentControls = useAnimation();
	
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Effetto Canvas con particelle 3D
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles = [];
		const particleCount = 150;
		
		class Particle {
			constructor() {
				this.reset();
				this.y = Math.random() * canvas.height;
				this.baseSize = Math.random() * 3 + 1;
			}
			
			reset() {
				this.x = Math.random() * canvas.width;
				this.y = -10;
				this.z = Math.random() * 1000;
				this.vx = (Math.random() - 0.5) * 0.5;
				this.vy = Math.random() * 0.5 + 0.2;
				this.opacity = Math.random() * 0.5 + 0.3;
				this.hue = Math.random() * 60 + 200;
			}
			
			update() {
				this.x += this.vx + mousePos.x * 0.02;
				this.y += this.vy + mousePos.y * 0.01;
				this.z -= 2;
				if (this.y > canvas.height || this.z < 0) this.reset();
				if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
			}
			
			draw() {
				const scale = 1000 / (1000 - this.z);
				const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
				const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
				const size = this.baseSize * scale;
				
				ctx.save();
				ctx.globalAlpha = this.opacity * (1 - this.z / 1000);
				const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
				gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.8)`);
				gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.4)`);
				gradient.addColorStop(1, `hsla(${this.hue}, 60%, 40%, 0)`);
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(x, y, size * 3, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			}
		}
		
		for (let i = 0; i < particleCount; i++) particles.push(new Particle());
		
		let animationId;
		const animate = () => {
			ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			particles.forEach((p, i) => {
				p.update();
				p.draw();
				particles.forEach((p2, j) => {
					if (i === j) return;
					const dx = p.x - p2.x;
					const dy = p.y - p2.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						ctx.strokeStyle = `hsla(210, 70%, 60%, ${0.15 * (1 - dist / 120)})`;
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.stroke();
					}
				});
			});
			animationId = requestAnimationFrame(animate);
		};
		
		animate();
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);
		
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
		};
	}, [mousePos]);

	// Mouse e scroll tracking
	useEffect(() => {
		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth - 0.5);
			const y = (e.clientY / window.innerHeight - 0.5);
			setMousePos({ x: x * 50, y: y * 50 });
			mouseX.set(x);
			mouseY.set(y);
			const slide = document.querySelector(".design3d-hero-slide");
			if (slide) slide.style.transform = `scale(1.1) translate(${x * 30}px, ${y * 30}px) rotate(${x * 2}deg)`;
		};
		const handleScroll = () => {
			const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
			setScrollProgress(progress);
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [mouseX, mouseY]);

	// Testo animato
	const textVariants = {
		hidden: { opacity: 0, y: 50, rotateX: -90 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			rotateX: 0,
			transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
		})
	};

	return (
		<div className="design3d-hero" ref={heroRef}>
			<canvas ref={canvasRef} className="design3d-canvas" />
			<div className="design3d-hero-slide"></div>

			<div className="gradient-orbs">
				<motion.div className="orb orb-1" animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
				<motion.div className="orb orb-2" animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
				<motion.div className="orb orb-3" animate={{ x: [0, 80, 0], y: [0, 150, 0], scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
			</div>

			<motion.div className="scan-line" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />

			<motion.div className="design3d-content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
				{/* ✅ Box fisso, nessun movimento con mouse */}
				<motion.div 
					className="design3d-content"
					style={{ transformStyle: "preserve-3d" }}
					whileHover={{ 
						scale: 1.02,
						boxShadow: "0 30px 90px rgba(59, 130, 246, 0.4)"
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
						"Utilizziamo tecnologie avanzate <strong>FDM</strong> e <strong>resin-based</strong> per garantire ottima resistenza, dettagli perfetti e finiture curate.",
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

				{/* Video */}
				<motion.div
					className="design3d-video"
					initial={{ opacity: 0, x: 100, rotateY: -30 }}
					animate={{ opacity: 1, x: 0, rotateY: 0 }}
					transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ 
						scale: 1.05,
						rotateY: 5,
						transition: { duration: 0.4 }
					}}
					onHoverStart={() => setIsVideoHovered(true)}
					onHoverEnd={() => setIsVideoHovered(false)}
					style={{ transformStyle: "preserve-3d" }}
				>
					<motion.div
						className="video-container"
						animate={{ rotateY: isVideoHovered ? [0, 2, 0, -2, 0] : 0 }}
						transition={{ duration: 4, repeat: isVideoHovered ? Infinity : 0 }}
					>
						<div className="holo-border holo-border-1" />
						<div className="holo-border holo-border-2" />
						<div className="holo-border holo-border-3" />
						<motion.div
							className="video-glow-ring"
							animate={{
								scale: isVideoHovered ? [1, 1.15, 1] : 1,
								opacity: isVideoHovered ? [0.3, 0.7, 0.3] : 0.2
							}}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<video ref={videoRef} className="design3d-video-player" autoPlay loop muted playsInline>
							<source src="/videosezionisingole/3dvideo.mp4" type="video/mp4" />
							Il tuo browser non supporta i video HTML5.
						</video>
						<motion.div className="video-reflection" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} />
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.div className="custom-cursor-advanced" animate={{ x: mousePos.x * 10, y: mousePos.y * 10 }} transition={{ type: "spring", damping: 20, stiffness: 300 }}>
				<div className="cursor-ring" />
				<div className="cursor-dot" />
			</motion.div>

			<motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} />
		</div>
	);
}
