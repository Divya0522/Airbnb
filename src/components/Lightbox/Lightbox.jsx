import React, { useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Lightbox.css';

/* 9-dot grid icon (3x3 dots) matching reference */
const NineDotsIcon = () => (
  <svg 
    viewBox="0 0 16 16" 
    width="18" 
    height="18" 
    fill="currentColor" 
    aria-hidden="true"
    className="lightbox__dots-icon"
  >
    <circle cx="2.5" cy="2.5" r="1.3" />
    <circle cx="8" cy="2.5" r="1.3" />
    <circle cx="13.5" cy="2.5" r="1.3" />
    <circle cx="2.5" cy="8" r="1.3" />
    <circle cx="8" cy="8" r="1.3" />
    <circle cx="13.5" cy="8" r="1.3" />
    <circle cx="2.5" cy="13.5" r="1.3" />
    <circle cx="8" cy="13.5" r="1.3" />
    <circle cx="13.5" cy="13.5" r="1.3" />
  </svg>
);

const Lightbox = ({ 
  images = [], 
  isOpen, 
  currentIndex = 0, 
  onClose, 
  onPrev, 
  onNext 
}) => {
  const lightboxRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) onPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < images.length - 1) onNext();
        break;
      default:
        break;
    }
  }, [onClose, onPrev, onNext, currentIndex, images.length]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.classList.add('no-scroll');
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => lightboxRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('no-scroll');
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images[currentIndex]) return null;

  const image = images[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  // Title from category or metadata
  const title = image.categoryTitle || image.category || 'Photo gallery';

  return (
    <div
      className="lightbox"
      ref={lightboxRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${images.length}: ${title}`}
    >
      {/* Top Header Bar */}
      <header className="lightbox__header">
        {/* 9-dot grid button to return to photo tour */}
        <button
          className="lightbox__dots-btn"
          onClick={onClose}
          aria-label="Return to photo tour"
          title="Return to photo tour"
        >
          <NineDotsIcon />
        </button>

        {/* Category Title in Center */}
        <h2 className="lightbox__title">{title}</h2>

        {/* Counter and Cancel (X) button on Right */}
        <div className="lightbox__right-actions">
          <span className="lightbox__counter">
            {currentIndex + 1} of {images.length}
          </span>
          <button
            className="lightbox__close-btn"
            onClick={onClose}
            aria-label="Close viewer"
            title="Close"
          >
            <X size={20} color="#222222" />
          </button>
        </div>
      </header>

      {/* Main Image Body with Navigation */}
      <div className="lightbox__body">
        {/* Previous Button */}
        {!isFirst && (
          <button
            className="lightbox__nav-btn lightbox__nav-btn--prev"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} color="#222222" />
          </button>
        )}

        {/* Central Display Photo */}
        <div className="lightbox__image-wrap">
          <img
            key={currentIndex}
            src={image.url}
            alt={image.alt || `${title} photo ${currentIndex + 1}`}
            className="lightbox__img"
          />
        </div>

        {/* Next Button */}
        {!isLast && (
          <button
            className="lightbox__nav-btn lightbox__nav-btn--next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={20} color="#222222" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
