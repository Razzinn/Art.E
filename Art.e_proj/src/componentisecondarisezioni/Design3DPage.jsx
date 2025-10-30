/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Design3DPage.css';

export default function Design3DPage() {
	useEffect(() => {
		const hero = document.querySelector(".design3d-hero");
		const slide = document.querySelector(".design3d-hero-slide");

		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 20;
			const y = (e.clientY / window.innerHeight - 0.5) * 20;
			slide.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
			hero.style.backgroundPosition = `${50 + x / 3}% ${50 + y / 3}%`;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="design3d-hero">
			<div className="design3d-hero-slide"></div>

			<motion.div
				className="design3d-content-wrapper"
				initial={{ opacity: 0, y: 40, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
			>
				{/* --- BOX TESTO --- */}
				<div className="design3d-content">
					<motion.h1
						className="design3d-title"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
					>
						STAMPA 3D
					</motion.h1>

					<motion.h2
						className="design3d-subtitle"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						Dal prototipo all'oggetto finito: diamo forma all'immaginazione.
					</motion.h2>

					<motion.p
						className="design3d-description"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.7 }}
					>
						La stampa 3D è il cuore di <strong>CREO</strong>. Realizziamo prototipi,
						gadget, accessori e componenti tecnici con precisione e materiali di qualità.
					</motion.p>

					<motion.p
						className="design3d-description-two"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.9 }}
					>
						Utilizziamo tecnologie avanzate <strong>FDM</strong> e <strong>resin-based</strong> 
						per garantire ottima resistenza, dettagli perfetti e finiture curate.
					</motion.p>

					<motion.p
						className="design3d-description-three"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.1 }}
					>
						Collaboriamo con designer, aziende, artigiani e privati per sviluppare
						progetti personalizzati, dalla fase di modellazione 3D fino alla produzione finale.
					</motion.p>

					<motion.p
						className="design3d-description-four"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.3 }}
					>
						Con la nostra esperienza, ogni idea può prendere vita, diventando un oggetto
						tangibile, funzionale e unico.
					</motion.p>

					<motion.p
						className="design3d-description-important"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.5 }}
					>
						➡️ <strong>Portaci la tua idea</strong>, noi la rendiamo reale.
					</motion.p>
				</div>

				{/* --- VIDEO A DESTRA --- */}
				<motion.div
					className="design3d-video"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.8 }}
				>
					<video
						className="design3d-video-player"
						autoPlay
						loop
						muted
						playsInline
					>
						<source src="/videosezionisingole/3dvideo.mp4" type="video/mp4" />
						Il tuo browser non supporta i video HTML5.
					</video>
				</motion.div>
			</motion.div>
		</div>
	);
}
