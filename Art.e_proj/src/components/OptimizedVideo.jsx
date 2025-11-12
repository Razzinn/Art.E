import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedVideo - Lazy loading video component with intersection observer
 * Loads video only when in viewport to reduce initial load time
 */
const OptimizedVideo = ({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none',
  controls = false,
  style = {},
  ...props
}) => {
    
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsInView(true);
            setHasLoaded(true);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [hasLoaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay={autoPlay && isInView}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      poster={poster}
      {...props}
    >
      {isInView && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

OptimizedVideo.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  preload: PropTypes.oneOf(['none', 'metadata', 'auto']),
  controls: PropTypes.bool,
  style: PropTypes.object,
};

export default OptimizedVideo;
