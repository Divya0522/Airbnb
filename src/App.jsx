import { useState } from 'react';
import Header from './components/Header/Header';
import PropertyNav from './components/PropertyNav/PropertyNav';
import PropertyTitle from './components/PropertyTitle/PropertyTitle';
import ImageGallery from './components/ImageGallery/ImageGallery';
import PhotoTour from './components/PhotoTour/PhotoTour';
import Lightbox from './components/Lightbox/Lightbox';
import ListingDetails from './components/ListingDetails/ListingDetails';
import Toast from './components/Toast/Toast';
import { propertyData } from './data/propertyData';
import './App.css';

function App() {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0, images: propertyData.images });
  const [toastMessage, setToastMessage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    showToast('Link copied to clipboard');
  };

  const handleSaveToggle = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    showToast(nextSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  const handleReserveClick = () => {
    handleScrollToBooking();
    showToast("You won't be charged yet");
  };

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const handleClosePhotoTour = () => {
    setIsPhotoTourOpen(false);
  };

  const handleOpenLightbox = (index, customImages = null) => {
    setLightboxState({ 
      isOpen: true, 
      index, 
      images: customImages || propertyData.images 
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrev = () => {
    setLightboxState((prev) => ({
      ...prev,
      index: Math.max(0, prev.index - 1)
    }));
  };

  const handleLightboxNext = () => {
    setLightboxState((prev) => {
      const activeImgs = prev.images || propertyData.images;
      return {
        ...prev,
        index: Math.min(activeImgs.length - 1, prev.index + 1)
      };
    });
  };

  const handleScrollToBooking = () => {
    const el = document.getElementById('booking-sidebar');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* Global Navbar (State 1: Relative at top of page) */}
      <Header />
      
      {/* Hero Section: Title and Gallery */}
      <div className="hero-section">
        <div className="content-container">
          <PropertyTitle 
            title={propertyData.title} 
            isSaved={isSaved}
            onShare={handleShare}
            onSave={handleSaveToggle}
          />
          <div id="photos">
            {propertyData.images && propertyData.images.length > 0 && (
              <ImageGallery 
                images={propertyData.images}
                onShowAllPhotos={handleOpenPhotoTour}
                onImageClick={handleOpenLightbox}
              />
            )}
          </div>
        </div>
      </div>

      {/* Sticky Property Navigation (State 2: Sticky at top: 0 when scrolled past hero section) */}
      <PropertyNav 
        price={propertyData.price}
        nights={propertyData.nights}
        rating={propertyData.rating}
        reviewCount={propertyData.reviewCount}
        onReserveClick={handleReserveClick}
      />

      {/* Main Details and Booking Section */}
      <div className="details-section">
        <div className="content-container">
          <ListingDetails 
            title={propertyData.title}
            subtitle={propertyData.subtitle}
            host={propertyData.host}
            details={propertyData.details}
            price={propertyData.price}
            nights={propertyData.nights}
            checkIn={propertyData.checkIn}
            checkOut={propertyData.checkOut}
            freeCancellationDate={propertyData.freeCancellationDate}
            rating={propertyData.rating}
            reviewCount={propertyData.reviewCount}
            description={propertyData.description}
            highlights={propertyData.highlights}
            amenities={propertyData.amenities}
            onReserveClick={() => showToast("You won't be charged yet")}
          />
        </div>
      </div>

      {/* Fullscreen Categorized Photo Tour Modal */}
      <PhotoTour 
        isOpen={isPhotoTourOpen}
        onClose={handleClosePhotoTour}
        onImageClick={handleOpenLightbox}
        isSaved={isSaved}
        onShare={handleShare}
        onSave={handleSaveToggle}
      />

      {/* Lightbox Single Photo Carousel Modal */}
      <Lightbox 
        isOpen={lightboxState.isOpen}
        images={lightboxState.images || propertyData.images}
        currentIndex={lightboxState.index}
        onClose={handleCloseLightbox}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />

      {/* Bottom Center Toast Notification */}
      <Toast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />
    </div>
  );
}

export default App;
