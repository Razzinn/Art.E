/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./WebAppDesignPage.css";

export default function WebAppDesignPage() {
	const [digitalParticles, setDigitalParticles] = useState([]);
	const [dataPackets, setDataPackets] = useState([]);
	const [circuitNodes, setCircuitNodes] = useState([]);
	const rafRef = useRef(null);
	const videoRef = useRef(null);

	const shouldReduceMotion = useReducedMotion();

	// Optimize counts with better detection
	const particleCounts = useMemo(() => {
		if (shouldReduceMotion) return { binary: 0, packets: 0, nodes: 0 };
		
		const isMobile = window.innerWidth < 768;
		const isLowEnd = navigator.hardwareConcurrency < 4;
		const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
		
		if (isMobile || isLowEnd || hasLowMemory) {
			return { binary: 25, packets: 12, nodes: 5 };
		}
		if (window.innerWidth < 1024) {
			return { binary: 50, packets: 20, nodes: 8 };
		}
		return { binary: 70, packets: 30, nodes: 10 };
	}, [shouldReduceMotion]);

	useEffect(() => {
		if (particleCounts.binary === 0) {
			setDigitalParticles([]);
			setDataPackets([]);
			setCircuitNodes([]);
			return;
		}
		
		// Binary rain particles
		const particles = Array.from({ length: particleCounts.binary }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			delay: Math.random() * 5,
			code: ['0', '1', '{', '}', '<', '>', '/', '\\', '[', ']', '(', ')'][Math.floor(Math.random() * 12)]
		}));
		setDigitalParticles(particles);

		// Data packets
		const packets = Array.from({ length: particleCounts.packets }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 3
		}));
		setDataPackets(packets);

		// Circuit nodes
		const nodes = Array.from({ length: particleCounts.nodes }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 1.5
		}));
		setCircuitNodes(nodes);
	}, [particleCounts]);

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
		<div className="webapp-hero">
			<div className="webapp-hero-slide"></div>

			{/* Binary rain ridotto */}
			{!shouldReduceMotion && digitalParticles.length > 0 && (
				<div className="digital-particles">
					{digitalParticles.map(particle => (
						<motion.div
							key={particle.id}
							className="digital-particle"
							style={{ 
								left: particle.x + "%",
								willChange: 'transform, opacity'
							}}
							initial={{ 
								y: "-5%",
								opacity: 0.9
							}}
							animate={{ 
								y: "110%",
								opacity: [0.9, 1, 0]
							}}
							transition={{ 
								duration: 2 + Math.random() * 1,
								repeat: Infinity,
								delay: particle.delay,
								ease: "linear"
							}}
						>
							{particle.code}
						</motion.div>
					))}
				</div>
			)}

			<div className="digital-grid"></div>

			{/* Circuit ridotto */}
			{!shouldReduceMotion && circuitNodes.length > 0 && window.innerWidth >= 1024 && (
				<div className="circuit-lines">
					{circuitNodes.slice(0, 5).map((node) => (
						<motion.div
							key={node.id}
							className="circuit-node"
							style={{
								left: node.x + "%",
								top: node.y + "%",
								willChange: 'transform'
							}}
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.6, 1, 0.6]
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: node.delay,
								ease: "linear"
							}}
						/>
					))}
				</div>
			)}

			{/* Orbs lineari */}
			<div className="gradient-orbs-tech">
				<motion.div 
					className="orb-tech orb-tech-1"
					animate={{
						x: [0, 70, 0],
						y: [0, -50, 0]
					}}
					transition={{ duration: 22, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
				<motion.div 
					className="orb-tech orb-tech-2"
					animate={{
						x: [0, -60, 0],
						y: [0, 45, 0]
					}}
					transition={{ duration: 26, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
				/>
			</div>

			{!shouldReduceMotion && (
				<motion.div
					className="scan-line-tech"
					animate={{ y: ["-100%", "200%"] }}
					transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
				/>
			)}

			<motion.div
				className="webapp-content-wrapper"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<motion.div
					className="webapp-video"
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					whileHover={{ 
						scale: 1.01,
						transition: { duration: 0.3 }
					}}
				>
					<div className="digital-frame">
						<div className="frame-corner frame-corner-tl"></div>
						<div className="frame-corner frame-corner-br"></div>
					</div>
					
					<motion.div
						className="digital-aura"
						animate={{
							rotate: [0, 360]
						}}
						transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
					/>

					<video
						ref={videoRef}
						className="webapp-video-player"
						autoPlay
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src="/videosezionisingole/webapp.mp4" type="video/mp4" />
					</video>
				</motion.div>

				<motion.div
					className="webapp-content"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<motion.h1
						className="webapp-title"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
					>
						<span className="title-line">Web & App Design</span>
						<motion.div 
							className="title-underline"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
						/>
					</motion.h1>

					<motion.h2
						className="webapp-subtitle"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.1, delay: 0.9 }}
					>
						Costruiamo esperienze digitali che lasciano il segno.
					</motion.h2>

					<motion.p
						className="webapp-description"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.1 }}
					>
						In un mondo sempre più connesso, la tua presenza online è la chiave
						per farti conoscere, vendere e crescere. In <strong>CREO</strong>{" "}
						realizziamo siti web moderni, <em>responsive</em> e <strong>ottimizzati SEO</strong>, pensati
						per attirare e convertire i tuoi visitatori.
					</motion.p>

					<motion.p
						className="webapp-description-two"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.3 }}
					>
						Dalla vetrina aziendale all'<strong>e-commerce</strong>, fino ad arrivare allo
						sviluppo di <em>app personalizzate</em>, il nostro obiettivo è tradurre la
						tua idea in una piattaforma <strong>funzionale</strong>, <strong>sicura</strong> e dal design curato
						nei minimi dettagli.
					</motion.p>

					<motion.p
						className="webapp-description-three"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.5 }}
					>
						Offriamo <strong>soluzioni su misura</strong> per aziende, freelance e start-up,
						garantendo <em>assistenza</em>, <em>aggiornamenti</em> e <strong>scalabilità</strong> nel tempo.
					</motion.p>

					<motion.div
						className="webapp-cta"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.7 }}
					>
						<span className="cta-text">Non limitarti a essere online.</span>
						<span className="cta-highlight">Fatti notare, con stile.</span>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
