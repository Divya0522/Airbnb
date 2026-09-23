import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import { photoTourCategories, getAllPhotoTourPhotos } from '../../data/photoTourData';
import './PhotoTour.css';

/* Airbnb custom share icon (tray with arrow up) */
const ShareTrayIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="16" 
    height="16" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9m11-15v17m-7-10 7-7 7 7"/>
  </svg>
);

const PhotoTour = ({ 
  isOpen, 
  onClose, 
  onImageClick, 
  isSaved = false, 
  onShare, 
  onSave 
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(photoTourCategories[0]?.id || '');
  const containerRef = useRef(null);
  const sectionRefs = useRef({});

  // Flattened photos with globalIndex for Lightbox navigation
  const allPhotos = useMemo(() => getAllPhotoTourPhotos(), []);

  // Map category photos with their globalIndex
  const categoriesWithIndex = useMemo(() => {
    let globalCounter = 0;
    return photoTourCategories.map((cat) => {
      const photosWithIndex = cat.photos.map((photo) => {
        const item = {
          ...photo,
          categoryTitle: cat.title,
          globalIndex: globalCounter
        };
        globalCounter++;
        return item;
      });
      return {
        ...cat,
        photos: photosWithIndex
      };
    });
  }, []);

  // Lock body scroll when photo tour is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Track active category on scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop + 180;

      for (let i = categoriesWithIndex.length - 1; i >= 0; i--) {
        const cat = categoriesWithIndex[i];
        const sectionEl = sectionRefs.current[cat.id];
        if (sectionEl) {
          const offsetTop = sectionEl.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveCategoryId(cat.id);
            break;
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, categoriesWithIndex]);

  if (!isOpen) return null;

  const handleCategoryClick = (catId) => {
    setActiveCategoryId(catId);
    const targetEl = sectionRefs.current[catId];
    if (targetEl && containerRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      className="photo-tour" 
      ref={containerRef} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Photo tour"
    >
      {/* Sticky Header */}
      <header className="photo-tour__header">
        <div className="photo-tour__header-inner">
          <button 
            className="photo-tour__back-btn" 
            onClick={onClose}
            aria-label="Back to listing"
          >
            <ChevronLeft size={22} color="#222222" />
          </button>

          <h1 className="photo-tour__header-title">Photo tour</h1>

          <div className="photo-tour__header-actions">
            <button 
              className="photo-tour__action-icon-btn" 
              onClick={onShare}
              aria-label="Share this listing"
            >
              <ShareTrayIcon />
            </button>
            <button 
              className="photo-tour__action-icon-btn" 
              onClick={onSave}
              aria-label={isSaved ? "Saved to wishlist" : "Save to wishlist"}
            >
              <Heart 
                size={18} 
                fill={isSaved ? '#FF385C' : 'none'} 
                color={isSaved ? '#FF385C' : '#222222'} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="photo-tour__main">
        {/* Categories Thumbnail Navigation Cards */}
        <nav className="photo-tour__categories-nav" aria-label="Photo categories">
          <div className="photo-tour__categories-grid">
            {categoriesWithIndex.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`photo-tour__category-card ${isActive ? 'photo-tour__category-card--active' : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  aria-label={`Jump to ${cat.title}`}
                >
                  <div className="photo-tour__card-thumb-wrap">
                    <img 
                      src={cat.thumbnail} 
                      alt={cat.title} 
                      className="photo-tour__card-thumb" 
                    />
                  </div>
                  <span className="photo-tour__card-label">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Categorized Photo Sections */}
        <div className="photo-tour__sections-container">
          {categoriesWithIndex.map((cat) => (
            <section
              key={cat.id}
              id={`photo-section-${cat.id}`}
              ref={(el) => (sectionRefs.current[cat.id] = el)}
              className="photo-tour__category-section"
            >
              {/* Left Column: Title and Amenities Subtitle */}
              <div className="photo-tour__category-left">
                <h2 className="photo-tour__category-title">{cat.title}</h2>
                {cat.subtitle && (
                  <p className="photo-tour__category-subtitle">{cat.subtitle}</p>
                )}
              </div>

              {/* Right Column: Photos Grid */}
              <div className="photo-tour__category-right">
                <div className="photo-tour__photos-grid">
                  {cat.photos.map((photo, pIdx) => {
                    const isMain = pIdx === 0;
                    const isLastAndAlone = !isMain && pIdx === cat.photos.length - 1 && (cat.photos.length - 1) % 2 !== 0;
                    const isFullWidth = isMain || isLastAndAlone;
                    return (
                      <div
                        key={photo.id || pIdx}
                        className={`photo-tour__photo-card ${isMain ? 'photo-tour__photo-card--main' : ''} ${isFullWidth ? 'photo-tour__photo-card--full' : ''}`}
                        onClick={() => onImageClick && onImageClick(photo.globalIndex, allPhotos)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            onImageClick && onImageClick(photo.globalIndex, allPhotos);
                          }
                        }}
                        aria-label={`View photo ${photo.globalIndex + 1} of ${cat.title}`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          loading={pIdx === 0 ? 'eager' : 'lazy'}
                          className="photo-tour__photo-img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PhotoTour;
