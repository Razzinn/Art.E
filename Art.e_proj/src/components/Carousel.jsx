import React, { useEffect, useMemo, useState } from 'react'
import './Carousel.css'

const SLIDE_MS = 2600

// Export the current slide index for other components to use
export const useCarouselIndex = () => {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const handleCarouselChange = (event) => {
      setIndex(event.detail.index)
    }
    
    window.addEventListener('carousel-change', handleCarouselChange)
    return () => window.removeEventListener('carousel-change', handleCarouselChange)
  }, [])
  
  return index
}

export default function Carousel() {
  const slides = useMemo(() => ([
    { 
      id: 'dressing',
      background: '/hero-imgs/dressing_background.jpg', 
      object: '/hero-imgs/dressing.png',
      alt: 'Dressing', 
      text: 'Capi personalizzabili', 
      pos: 'right',
      colors: ['#7DD3C0', '#B794F6', '#FBB040'] // Green aqua → purple → orange gradient for dressing
    },
    { 
      id: '3dprint',
      background: '/hero-imgs/3Dprint_background.jpg', 
      object: '/hero-imgs/3Dprint.png',
      alt: '3D Print', 
      text: 'Creazione di oggetti 3D', 
      pos: 'left',
      colors: ['#F8C8C8', '#F5B7B7', '#F2A6A6'] // Pale pink gradient for 3D print
    },
    { 
      id: 'computer',
      background: '/hero-imgs/computer_background.png', 
      object: '/hero-imgs/computer.png',
      alt: 'Computer', 
      text: 'Progettazione e Sviluppo siti web e applicazioni per pc e mobile', 
      pos: 'left',
      colors: ['#8A2BE2'] // Deep purple/violet tones from computer background
    },
    { 
      id: 'baby',
      background: '/hero-imgs/baby_background.jpeg', 
      object: '/hero-imgs/baby.png',
      alt: 'Baby', 
      text: 'Fai uno scherzo ai tuoi amici', 
      pos: 'center',
      colors: ['#1A4A66', '#2E5D7A', '#426F8C'] // Darker blue gradient matching baby background bottom edge
    },
  ]), [])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        const newIndex = (i + 1) % slides.length
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('carousel-change', {
          detail: { index: newIndex, slide: slides[newIndex] }
        }))
        return newIndex
      })
    }, SLIDE_MS)
    
    // Dispatch initial event
    window.dispatchEvent(new CustomEvent('carousel-change', {
      detail: { index: 0, slide: slides[0] }
    }))
    
    return () => clearInterval(id)
  }, [slides])

  return (
    <section className="carousel" aria-roledescription="carousel">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`slide ${i === index ? 'active' : ''}`}
          data-id={s.id}
          role="group"
          aria-label={`${i + 1} di ${slides.length}`}
        >
          {/* Background layer */}
          <div 
            className="slide-background"
            style={{ backgroundImage: `url(${s.background})` }}
          />
          
          {/* Foreground object layer with animation */}
          <div className="slide-object">
            <img 
              src={s.object} 
              alt={s.alt}
              className={`object-image ${i === index ? 'animate-in' : ''}`}
            />
          </div>
          
          {/* Text overlay */}
          <div className={`overlay ${s.pos}`}>
            <h2>{s.text}</h2>
          </div>
        </div>
      ))}
    </section>
  )
}
