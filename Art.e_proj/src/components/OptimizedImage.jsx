import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente per immagini ottimizzate con lazy loading e performance migliorate
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onLoad,
  onError,
  placeholder = 'blur',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Se l'immagine è già caricata
    if (img.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  // Genera placeholder basato su dimensioni
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Crect width='${width || 400}' height='${height || 300}' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  return (
    <div 
      className={`optimized-image-wrapper ${className}`}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        ...(width && { width }),
        ...(height && { height })
      }}
    >
      {/* Placeholder durante il caricamento */}
      {!isLoaded && !error && placeholder === 'blur' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${placeholderSvg}")`,
            backgroundSize: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      )}

      {/* Immagine principale */}
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          fetchpriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block',
            width: '100%',
            height: 'auto'
          }}
          {...props}
        />
      )}

      {/* Fallback in caso di errore */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            fontSize: '14px'
          }}
        >
          Immagine non disponibile
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
  fetchPriority: PropTypes.oneOf(['high', 'low', 'auto']),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  placeholder: PropTypes.oneOf(['blur', 'none'])
};

export default OptimizedImage;
