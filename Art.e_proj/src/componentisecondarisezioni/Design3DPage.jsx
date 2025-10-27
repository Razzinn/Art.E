import React from 'react';
import './Design3DPage.css';

export default function Design3DPage() {
	return (
		<div className="design3d-hero">
			<div className="design3d-hero-slide">
				{/* video posizionato a sinistra */}
				<video
					className="design3d-video"
					src="/videosezionisingole/3dvideo.mp4"
					autoPlay
					loop
					muted
					playsInline
				/>
				<div className="design3d-content">
					<h1 className="design3d-title">STAMPA 3D</h1>
					<h2 className="design3d-subtitle">Dal prototipo all’oggetto finito: diamo forma all’immaginazione.</h2>
					<p className="design3d-description">
						La stampa 3D è il cuore di CREO. Realizziamo prototipi, gadget,
						accessori e componenti tecnici con precisione e materiali di qualità.
					</p>
					<p className="design3d-description-two">
						Utilizziamo tecnologie avanzate FDM e resin-based per garantire ottima resistenza,
						dettagli perfetti e finiture curate.
					</p>
					<p className="design3d-description-three">
						Collaboriamo con designer, aziende,
						artigiani e privati per sviluppare progetti personalizzati,
						dalla fase di modellazione 3D fino alla produzione finale.
					</p>
					<p className="design3d-description-four">
						Con la nostra esperienza, ogni idea può prendere vita,
						diventando un oggetto tangibile, funzionale e unico.
					</p>
					<p className="design3d-description-important">
						➡️ Portaci la tua idea, noi la rendiamo reale.
					</p>
				</div>
			</div>
		</div>
	);
}
