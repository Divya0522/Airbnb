import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './PropertyNav.css';

const PropertyNav = ({ price, nights, rating, reviewCount, onReserveClick }) => {
  const [activeTab, setActiveTab] = useState('photos');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Visible as soon as user scrolls past header (scrolling the hero section),
      // and remains visible all the way down until the bottom/footer of the page
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollY > 80);

      // Update active tab on scroll with navbar height offset
      const navOffset = 180;
      const locationEl = document.getElementById('location');
      const reviewsEl = document.getElementById('reviews');
      const amenitiesEl = document.getElementById('amenities');

      if (locationEl && locationEl.getBoundingClientRect().top <= navOffset) {
        setActiveTab('location');
      } else if (reviewsEl && reviewsEl.getBoundingClientRect().top <= navOffset) {
        setActiveTab('reviews');
      } else if (amenitiesEl && amenitiesEl.getBoundingClientRect().top <= navOffset) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    if (tabName === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -74; // 64px navbar height + 10px breathing room
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`property-nav ${isSticky ? 'property-nav--sticky' : ''}`} 
      aria-label="Property navigation"
    >
      <div className="property-nav__container">
        
        {/* Left Navigation Tabs */}
        <div className="property-nav__tabs">
          <button 
            className={`property-nav__tab ${activeTab === 'photos' ? 'property-nav__tab--active' : ''}`}
            onClick={() => scrollToSection('photos', 'photos')}
          >
            <span className="property-nav__tab-label">Photos</span>
          </button>
          <button 
            className={`property-nav__tab ${activeTab === 'amenities' ? 'property-nav__tab--active' : ''}`}
            onClick={() => scrollToSection('amenities', 'amenities')}
          >
            <span className="property-nav__tab-label">Amenities</span>
          </button>
          <button 
            className={`property-nav__tab ${activeTab === 'reviews' ? 'property-nav__tab--active' : ''}`}
            onClick={() => scrollToSection('reviews', 'reviews')}
          >
            <span className="property-nav__tab-label">Reviews</span>
          </button>
          <button 
            className={`property-nav__tab ${activeTab === 'location' ? 'property-nav__tab--active' : ''}`}
            onClick={() => scrollToSection('location', 'location')}
          >
            <span className="property-nav__tab-label">Location</span>
          </button>
        </div>

        {/* Right Summary: Price, Rating & Reserve Button */}
        <div className="property-nav__right">
          <div className="property-nav__price-block">
            <div className="property-nav__price">
              <span className="price-bold">{price}</span>
              <span className="price-label"> for {nights} nights</span>
            </div>
            <div className="property-nav__rating">
              <Star size={11} fill="#222" color="#222" />
              <span className="rating-score">{rating}</span>
              <span className="rating-dot">·</span>
              <u className="review-link">{reviewCount} reviews</u>
            </div>
          </div>
          <button 
            className="property-nav__reserve-btn"
            onClick={onReserveClick}
          >
            Reserve
          </button>
        </div>

      </div>
    </nav>
  );
};

export default PropertyNav;
