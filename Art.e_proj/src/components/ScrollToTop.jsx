import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure the new page content is rendered
    const timer = setTimeout(() => {
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      // Focus management for accessibility
      // Focus the main content or first heading on the new page
      const mainElement = document.querySelector('main') || 
                         document.querySelector('h1') || 
                         document.querySelector('[role="main"]') ||
                         document.body;
      
      if (mainElement) {
        mainElement.focus({ preventScroll: true });
      }
    }, 100);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;