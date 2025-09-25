import React, { useEffect, useMemo, useState } from 'react'
import './Carousel.css'

const SLIDE_MS = 2600

export default function Carousel() {
  const slides = useMemo(() => ([
    { src: '/hero-imgs/hero1.jpg', alt: 'Hero 1', text: 'Progettazione 3D', pos: 'left' },
    { src: '/hero-imgs/hero2.jpg', alt: 'Hero 2', text: 'Aigliamento personalizzato', pos: 'right' },
    { src: '/hero-imgs/hero3.jpg', alt: 'Hero 3', text: 'Web development/design', pos: 'left' },
    { src: '/hero-imgs/hero4.jpg', alt: 'Hero 4', text: 'Prank service', pos: 'center' },
  ]), [])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className="carousel" aria-roledescription="carousel">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`slide ${i === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.src})` }}
          role="group"
          aria-label={`${i + 1} di ${slides.length}`}
        >
          <div className={`overlay ${s.pos}`}>
            <h2>{s.text}</h2>
          </div>
        </div>
      ))}
    </section>
  )
}
