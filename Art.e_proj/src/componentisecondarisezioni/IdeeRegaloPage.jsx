/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import './IdeeRegaloPage.css';

export default function IdeeRegaloPage() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [lightParticles, setLightParticles] = useState([]);
	const [diamondSparkles, setDiamondSparkles] = useState([]);
	const containerRef = useRef(null);
	const rafRef = useRef(null);
	const { scrollYProgress } = useScroll();
	
	const smoothMouseX = useSpring(0, { stiffness: 150, damping: 30 });
	const smoothMouseY = useSpring(0, { stiffness: 150, damping: 30 });
	const shouldReduceMotion = useReducedMotion();

	// Optimize particle counts with device detection
	const particleCounts = useMemo(() => {
		const isMobile = window.innerWidth < 768;
		const isLowEnd = navigator.hardwareConcurrency < 4;
		const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
		
		if (shouldReduceMotion) return { confetti: 0, sparkles: 0 };
		if (isMobile || isLowEnd || hasLowMemory) return { confetti: 15, sparkles: 8 };
		if (window.innerWidth < 1024) return { confetti: 25, sparkles: 12 };
		return { confetti: 40, sparkles: 20 };
	}, [shouldReduceMotion]);

	useEffect(() => {
		if (particleCounts.confetti === 0) {
			setLightParticles([]);
			setDiamondSparkles([]);
			return;
		}
		
		// Confetti particles
		const particles = Array.from({ length: particleCounts.confetti }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: -10,
			delay: Math.random() * 8,
			shape: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)],
			size: Math.random() * 4 + 4,
			rotation: Math.random() * 360
		}));
		setLightParticles(particles);

		// Diamond sparkles
		const sparkles = Array.from({ length: particleCounts.sparkles }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 3
		}));
		setDiamondSparkles(sparkles);
	}, [particleCounts]);

	// Mouse handler con throttling migliorato
	const handleMouseMove = useCallback((e) => {
		if (rafRef.current) return;
		
		rafRef.current = requestAnimationFrame(() => {
			const x = (e.clientX / window.innerWidth - 0.5);
			const y = (e.clientY / window.innerHeight - 0.5);

			setMousePos({ x: x * 25, y: y * 25 });
			smoothMouseX.set(x);
			smoothMouseY.set(y);

			const slide = document.querySelector(".ideeregalo-hero-slide");
			if (slide && window.innerWidth >= 768) {
				slide.style.transform = `scale(1.08) translate(${x * 20}px, ${y * 20}px)`;
			}
			
			rafRef.current = null;
		});
	}, [smoothMouseX, smoothMouseY]);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [handleMouseMove]);

	// Video optimization
	const videoRef = useRef(null);
	
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
		}
	}, []);

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
		<div className="ideeregalo-hero" ref={containerRef}>
			<div className="ideeregalo-hero-slide"></div>

			{/* Confetti ridotti */}
			{!shouldReduceMotion && lightParticles.length > 0 && (
				<div className="light-particles">
					{lightParticles.map((particle) => (
						<motion.div
							key={particle.id}
							className="light-particle"
							style={{
								width: particle.size + 'px',
								height: particle.size + 'px',
								borderRadius: particle.shape === 'circle' ? '50%' : '2px',
								willChange: 'transform, opacity'
							}}
							initial={{ 
								x: particle.x + "%",
								y: "-5%",
								scale: 0
							}}
							animate={{ 
								y: "110%",
								scale: [0, 1, 0.8],
								opacity: [0, 1, 0]
							}}
							transition={{ 
								duration: 4 + Math.random() * 2,
								repeat: Infinity,
								delay: particle.delay,
								ease: "linear"
							}}
						/>
					))}
				</div>
			)}

			{/* Ribbon semplificato */}
			{!shouldReduceMotion && window.innerWidth >= 768 && (
				<div className="ribbon-glows">
					<div className="ribbon-line ribbon-diagonal-1"></div>
					<div className="ribbon-line ribbon-diagonal-2"></div>
				</div>
			)}

			{/* Orbs con animazioni lineari */}
			<div className="gradient-orbs-idee">
				<motion.div 
					className="orb-idee orb-1"
					animate={{
						x: [0, 80, 0],
						y: [0, -60, 0]
					}}
					transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
				<motion.div 
					className="orb-idee orb-2"
					animate={{
						x: [0, -70, 0],
						y: [0, 55, 0]
					}}
					transition={{ duration: 28, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
			</div>

			<motion.div
				className="ideeregalo-content-wrapper"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<motion.div
					className="ideeregalo-video"
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					whileHover={{ 
						scale: 1.01,
						transition: { duration: 0.3 }
					}}
				>
					<div className="luxury-frame">
						<div className="frame-edge frame-edge-tl"></div>
						<div className="frame-edge frame-edge-br"></div>
					</div>
					
					<div className="video-aura" />
					
					<video
						ref={videoRef}
						className="ideeregalo-video-player"
						autoPlay
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src="/videosezionisingole/ideeregalo.mp4" type="video/mp4" />
					</video>
				</motion.div>

				<motion.div 
					className="ideeregalo-content"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<motion.h1
						className="ideeregalo-title"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<span className="title-line">Idee Regalo</span>
						<motion.div 
							className="title-underline"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
						/>
					</motion.h1>

					<motion.h2
						className="ideeregalo-subtitle"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.1, delay: 0.9 }}
					>
						Regala qualcosa che non esiste da nessun'altra parte.
					</motion.h2>

					<motion.p
						className="ideeregalo-description"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.1 }}
					>
						Le nostre idee regalo sono create per sorprendere.
						Da oggetti decorativi a creazioni personalizzate stampate in 3D,
						ogni articolo nasce per trasmettere <strong>emozione</strong>, <em>originalità</em> e attenzione al dettaglio.
						Perfette per compleanni, anniversari, festività o eventi aziendali, le nostre proposte uniscono creatività e tecnologia.
					</motion.p>

					<motion.p
						className="ideeregalo-description-two"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.3 }}
					>
						Puoi scegliere tra <strong>design già pronti</strong> o richiedere la <em>creazione su misura</em>,
						trasformando un'idea in un regalo unico e irripetibile.
					</motion.p>

					<motion.div
						className="ideeregalo-cta"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.5 }}
					>
						<span className="cta-text">Non regalare qualcosa di comune.</span>
						<span className="cta-highlight">Crea un ricordo che resta.</span>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
