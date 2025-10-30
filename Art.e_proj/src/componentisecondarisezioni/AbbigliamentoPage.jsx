/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./AbbigliamentoPage.css";

export default function AbbigliamentoPage() {
  useEffect(() => {
    const hero = document.querySelector(".abbigliamento-hero");
    const slide = document.querySelector(".abbigliamento-hero-slide");

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
	<div className="abbigliamento-hero">
		<div className="abbigliamento-hero-slide">
			<motion.div
				className="abbigliamento-content-wrapper"
				initial={{ opacity: 0, y: 40, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
			>
				<motion.div
					className="abbigliamento-video"
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<video
						className="abbigliamento-video-player"
						autoPlay
						loop
						muted
						playsInline
					>
						<source src="/videosezionisingole/abbigliamentopersonalizzato.mp4" type="video/mp4" />
					</video>
				</motion.div>

				<div className="abbigliamento-content">
					<motion.h1
						className="abbigliamento-title"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
					>
						Abbigliamento Personalizzato
					</motion.h1>

					<motion.h2
						className="abbigliamento-subtitle"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						Distinguiti con ciò che indossi.
					</motion.h2>

					<motion.p
						className="abbigliamento-description"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.7 }}
					>
						Con <strong>CREO</strong> puoi trasformare un semplice capo in un mezzo di espressione o promozione unica.
						Personalizziamo T-shirt, felpe, cappellini e abbigliamento da lavoro con stampe di alta qualità e materiali selezionati.
					</motion.p>

					<motion.p
						className="abbigliamento-description-two"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.9 }}
					>
						Che tu voglia creare divise aziendali professionali, merchandising per eventi o regali personalizzati,
						<em> curiamo ogni dettaglio</em>: dalla grafica alla stampa finale.
						Grazie a tecniche moderne di stampa – come DTF, serigrafia o termostampa – garantiamo
						<strong> colori brillanti, durata e comfort</strong> su ogni prodotto.
					</motion.p>

					<motion.p
						className="abbigliamento-description-important"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.1 }}
					>
						➡️ Mostra la tua identità. <span>Indossa le tue idee.</span>
					</motion.p>
				</div>
			</motion.div>
		</div>
	</div>
  );
}
