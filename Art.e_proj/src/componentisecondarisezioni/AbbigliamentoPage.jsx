/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import "./AbbigliamentoPage.css";

export default function AbbigliamentoPage() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [fabricParticles, setFabricParticles] = useState([]);
	const [stitchNodes, setStitchNodes] = useState([]);
	const [silkShimmers, setSilkShimmers] = useState([]);
	const containerRef = useRef(null);
	const rafRef = useRef(null);
	const smoothMouseX = useSpring(0, { stiffness: 150, damping: 30 });
	const smoothMouseY = useSpring(0, { stiffness: 150, damping: 30 });
	const shouldReduceMotion = useReducedMotion();
	const videoRef = useRef(null);

	// Optimize counts with better device detection
	const threadCount = useMemo(() => {
		if (shouldReduceMotion) return 0;
		const isMobile = window.innerWidth < 768;
		const isLowEnd = navigator.hardwareConcurrency < 4;
		const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

		if (isMobile || isLowEnd || hasLowMemory) return 20;
		if (window.innerWidth < 1024) return 35;
		return 50;
	}, [shouldReduceMotion]);

	const nodeCount = useMemo(() => {
		if (shouldReduceMotion) return 0;
		const isMobile = window.innerWidth < 768;
		return isMobile ? 3 : 6;
	}, [shouldReduceMotion]);

	useEffect(() => {
		if (threadCount === 0) {
			setFabricParticles([]);
			setStitchNodes([]);
			setSilkShimmers([]);
			return;
		}

		// Fili tessili
		const threads = Array.from({ length: threadCount }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			delay: Math.random() * 10,
			thickness: Math.random() > 0.7 ? 3 : 2,
			color: Math.random() > 0.5 ? "gold" : "silver",
		}));
		setFabricParticles(threads);

		// Nodi cucitura
		const nodes = Array.from({ length: nodeCount }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 2,
		}));
		setStitchNodes(nodes);

		// Shimmer seta
		const shimmers = Array.from({ length: 4 }, (_, i) => ({
			id: i,
			delay: i * 1.5,
		}));
		setSilkShimmers(shimmers);
	}, [threadCount, nodeCount]);

	// Optimize mouse tracking with RAF
	const handleMouseMove = useCallback(
		(e) => {
			if (rafRef.current) return;

			rafRef.current = requestAnimationFrame(() => {
				const x = e.clientX / window.innerWidth - 0.5;
				const y = e.clientY / window.innerHeight - 0.5;

				setMousePos({ x: x * 25, y: y * 25 });
				smoothMouseX.set(x);
				smoothMouseY.set(y);

				const slide = document.querySelector(".abbigliamento-hero-slide");
				if (slide && window.innerWidth >= 768) {
					slide.style.transform = `scale(1.06) translate(${x * 12}px, ${y * 12}px)`;
				}

				rafRef.current = null;
			});
		},
		[smoothMouseX, smoothMouseY]
	);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [handleMouseMove]);

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
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, []);

	return (
		<div className="abbigliamento-hero" ref={containerRef}>
			{/* Sfondo originale con parallax */}
			<div className="abbigliamento-hero-slide"></div>

			{/* Pattern tessile luxury */}
			<div className="fabric-pattern-luxury"></div>

			{/* Effetti con reduced motion check */}
			{!shouldReduceMotion && fabricParticles.length > 0 && (
				<div className="fabric-threads">
					{fabricParticles.map((thread) => (
						<motion.div
							key={thread.id}
							className={`fabric-thread ${
								thread.color === "gold" ? "thread-gold" : "thread-silver"
							}`}
							style={{
								left: `${thread.x}%`,
								width: `${thread.thickness}px`,
								willChange: "transform, opacity",
							}}
							initial={{ y: "-5%", opacity: 0 }}
							animate={{
								y: "110%",
								opacity: [0, 0.8, 0],
							}}
							transition={{
								duration: 8 + Math.random() * 2,
								repeat: Infinity,
								delay: thread.delay,
								ease: "linear",
							}}
						/>
					))}
				</div>
			)}

			{/* Altri layer con conditional rendering */}
			{!shouldReduceMotion && (
				<>
					{silkShimmers.length > 0 && (
						<div className="silk-shimmer-layer">
							{silkShimmers.map((shimmer) => (
								<motion.div
									key={shimmer.id}
									className="silk-shimmer-wave"
									initial={{ x: "-100%", opacity: 0 }}
									animate={{ 
										x: ["0%", "200%"],
										opacity: [0, 0.6, 0.6, 0]
									}}
									transition={{ 
										duration: 12,
										repeat: Infinity,
										delay: shimmer.delay,
										ease: "linear"
									}}
								/>
							))}
						</div>
					)}
					{stitchNodes.length > 0 && (
						<div className="stitch-nodes-layer">
							{stitchNodes.map((node) => (
								<motion.div
									key={node.id}
									className="stitch-node-decorative"
									style={{
										left: `${node.x}%`,
										top: `${node.y}%`
									}}
									animate={{
										scale: [1, 1.4, 1],
										rotate: [0, 180, 360],
										opacity: [0.4, 1, 0.4]
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										delay: node.delay,
										ease: "easeInOut"
									}}
								/>
							))}
						</div>
					)}
					<div className="fabric-waves-elegant">
						<motion.div
							className="fabric-wave-elegant wave-1"
							animate={{
								x: ["-100%", "100%"],
								opacity: [0, 0.5, 0.5, 0]
							}}
							transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
						/>
						<motion.div
							className="fabric-wave-elegant wave-2"
							animate={{
								x: ["100%", "-100%"],
								opacity: [0, 0.4, 0.4, 0]
							}}
							transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
						/>
						<motion.div
							className="fabric-wave-elegant wave-3"
							animate={{
								x: ["-100%", "100%"],
								opacity: [0, 0.3, 0.3, 0]
							}}
							transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
						/>
					</div>
				</>
			)}

			{/* Orbs gradient moda luxury */}
			<div className="gradient-orbs-fashion-luxury">
				<motion.div 
					className="orb-fashion-lux orb-fashion-lux-1"
					animate={{
						x: [0, 100, 0],
						y: [0, -70, 0]
					}}
					transition={{ duration: 24, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
				<motion.div 
					className="orb-fashion-lux orb-fashion-lux-2"
					animate={{
						x: [0, -80, 0],
						y: [0, 60, 0]
					}}
					transition={{ duration: 28, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
			</div>

			<motion.div
				className="abbigliamento-content-wrapper"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<motion.div
					className="abbigliamento-video"
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					whileHover={{ 
						scale: 1.01,
						transition: { duration: 0.3 }
					}}
				>
					<div className="fabric-frame-luxury">
						<div className="frame-corner-stitch corner-tl"></div>
						<div className="frame-corner-stitch corner-br"></div>
						{window.innerWidth >= 1024 && (
							<>
								<div className="frame-button-deco button-tl"></div>
								<div className="frame-button-deco button-br"></div>
							</>
						)}
					</div>
					
					<motion.div
						className="fabric-aura"
						animate={{
							rotate: [0, 360]
						}}
						transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
					/>

					<video
						ref={videoRef}
						className="abbigliamento-video-player"
						autoPlay
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src="/videosezionisingole/abbigliamentopersonalizzato.mp4" type="video/mp4" />
					</video>
				</motion.div>

				<motion.div
					className="abbigliamento-content"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<motion.h1
						className="abbigliamento-title"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<span className="title-line">Abbigliamento Personalizzato</span>
						<motion.div 
							className="title-underline"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
						/>
					</motion.h1>

					<motion.h2
						className="abbigliamento-subtitle"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.1, delay: 0.9 }}
					>
						Distinguiti con ciò che indossi.
					</motion.h2>

					<motion.p
						className="abbigliamento-description"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.1 }}
					>
						Con <strong>CREO</strong> puoi trasformare un semplice capo in un
						mezzo di espressione o promozione unica. Personalizziamo T-shirt,
						felpe, cappellini e abbigliamento da lavoro con stampe di alta
						qualità e materiali selezionati.
					</motion.p>

					<motion.p
						className="abbigliamento-description-two"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.3 }}
					>
						Che tu voglia creare divise aziendali professionali, merchandising
						per eventi o regali personalizzati,
						<em> curiamo ogni dettaglio</em>: dalla grafica alla stampa finale.
						Grazie a tecniche moderne di stampa – come <strong>DTF</strong>, <strong>serigrafia</strong> o{" "}
						<strong>termostampa</strong> – garantiamo
						<strong> colori brillanti, durata e comfort</strong> su ogni
						prodotto.
					</motion.p>

					<motion.div
						className="abbigliamento-cta"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.5 }}
					>
						<span className="cta-text">Mostra la tua identità.</span>
						<span className="cta-highlight">Indossa le tue idee.</span>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
