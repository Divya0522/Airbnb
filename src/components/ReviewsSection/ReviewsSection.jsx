import React, { useState, useRef, useEffect } from 'react';
import './ReviewsSection.css';
import laurelLeft from '../../assets/laurel-left-review.png';
import laurelRight from '../../assets/laurel-right-review.png';
import { Star, X, Search } from 'lucide-react';

/* User-provided exact Cleanliness Spray Bottle SVG */
const CleanlinessSprayIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '32px', width: '32px', fill: 'currentColor' }}
  >
    <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z" />
  </svg>
);

/* Accuracy Icon: Checkmark circle */
const AccuracyCircleIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="32" 
    height="32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'block' }}
  >
    <circle cx="16" cy="16" r="13" />
    <path d="M10.5 16l3.8 3.8 7.2-7.2" />
  </svg>
);

/* Check-in Key Icon matching screenshot */
const CheckInKeyIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="32" 
    height="32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'block' }}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16l11 11" />
    <path d="M23 19l2 2" />
    <path d="M20 22l2 2" />
  </svg>
);

/* Communication Speech Bubble Icon */
const CommunicationChatIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="32" 
    height="32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'block' }}
  >
    <path d="M26 6H6a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h4v4l5-4h11a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3z" />
  </svg>
);

/* Location Folded Map Icon */
const LocationMapIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="32" 
    height="32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'block' }}
  >
    <path d="M3 8l8-4 10 4 8-4v19l-8 4-10-4-8 4V8z" />
    <path d="M11 4v19" />
    <path d="M21 8v19" />
  </svg>
);

/* Value Price Tag Icon */
const ValuePriceTagIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    width="32" 
    height="32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'block' }}
  >
    <path d="M28.5 15.5L16.5 27.5a2 2 0 0 1-2.83 0L3 16.83a2 2 0 0 1-.59-1.41V4.5a2 2 0 0 1 2-2h10.92a2 2 0 0 1 1.41.59L28.5 15.5z" />
    <circle cx="8.5" cy="8.5" r="2.2" fill="currentColor" />
  </svg>
);

const topicPillsData = [
  { id: 'comfort', label: 'Comfort', count: 6, emoji: '🛋️' },
  { id: 'accuracy', label: 'Accuracy', count: 5, emoji: '🎯' },
  { id: 'hottub', label: 'Hot tub', count: 5, emoji: '🛁' },
  { id: 'condition', label: 'Condition', count: 4, emoji: '🧼' },
  { id: 'hospitality', label: 'Hospitality', count: 8, emoji: '🎁' },
  { id: 'cleanliness', label: 'Cleanliness', count: 4, emoji: '🧽' },
  { id: 'amenities', label: 'Amenities', count: 2, emoji: '☕' },
  { id: 'decor', label: 'Decor', count: 2, emoji: '🖼️' },
  { id: 'indoor', label: 'Indoor spaces', count: 2, emoji: '🏠' },
  { id: 'location', label: 'Location', count: 2, emoji: '📍' },
];

const sampleReviews = [
  {
    id: 1,
    name: 'Amit',
    initial: 'A',
    avatarBg: '#E8CA98',
    avatar: null,
    duration: '2 months on Airbnb',
    rating: 5,
    date: 'October 2023',
    stayType: 'Stayed with kids',
    text: 'Mirashya’s place in Candolim was an absolute delight! The private jacuzzi was exceptional and spotlessly clean. The apartment is beautifully furnished with high-speed internet that made working remotely effortless. Walking distance to great restaurants and the beach. Would definitely love to stay here again!',
    tags: ['comfort', 'hottub', 'cleanliness', 'location']
  },
  {
    id: 2,
    name: 'Aheesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80',
    duration: '3 years on Airbnb',
    rating: 5,
    date: 'September 2023',
    stayType: 'Stayed a few nights',
    text: 'Amazing stay! The property is exactly as described and shown in the photos. The jacuzzi on the balcony was super relaxing after exploring Goa. Check-in was very smooth with the building staff, and Mirashya was always reachable within minutes. Highly recommended for couples!',
    tags: ['accuracy', 'hottub', 'hospitality']
  },
  {
    id: 3,
    name: 'Priya',
    initial: 'P',
    avatarBg: '#D4AF37',
    avatar: null,
    duration: '5 years on Airbnb',
    rating: 5,
    date: 'September 2023',
    stayType: 'Stayed with a friend',
    text: 'Super cozy and peaceful place in a prime location. The apartment was pristine, the bed was very comfortable, and having a dedicated workspace with fast WiFi was great. The pool in the society is well maintained. Thank you for wonderful hospitality!',
    tags: ['comfort', 'cleanliness', 'hospitality', 'amenities']
  },
  {
    id: 4,
    name: 'Rahul',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80',
    duration: '1 year on Airbnb',
    rating: 5,
    date: 'August 2023',
    stayType: 'Stayed with partner',
    text: 'Had a wonderful time here. The jacuzzi was clean, heated well, and private. Air conditioning was powerful, which was a blessing. Candolim beach is just 5-7 minutes away. Mirashya was a great host who gave wonderful local food recommendations.',
    tags: ['hottub', 'condition', 'hospitality', 'location']
  },
  {
    id: 5,
    name: 'Tanya',
    initial: 'T',
    avatarBg: '#B4846C',
    avatar: null,
    duration: '4 years on Airbnb',
    rating: 5,
    date: 'August 2023',
    stayType: 'Stayed overnight',
    text: 'A hidden gem in Candolim! The decor is tastefully done with lovely cane furniture and warm lighting. The place felt like home right away. The kitchen is fully equipped if you want to cook a quick meal. Truly 5-star experience!',
    tags: ['decor', 'indoor', 'condition', 'amenities']
  },
  {
    id: 6,
    name: 'Michael',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80',
    duration: '6 years on Airbnb',
    rating: 5,
    date: 'July 2023',
    stayType: 'Stayed with partner',
    text: 'Outstanding stay. The jacuzzi experience was top notch. Safe and quiet neighborhood with 24/7 security. Clean linens, strong shower pressure, and good AC. One of the best stays we had in North Goa.',
    tags: ['comfort', 'cleanliness', 'hottub']
  }
];

const ReviewsSection = ({ rating = 4.95, reviewCount = 19 }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleWheel = (e) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftPos.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos.current - walk;
    checkScroll();
  };

  const filteredReviews = selectedTopic
    ? sampleReviews.filter(r => r.tags.includes(selectedTopic))
    : sampleReviews;

  return (
    <section className="reviews-section-wrapper" aria-label="Customer Reviews">
      
      {/* 1. Laurel Big Score Header */}
      <div className="reviews-hero-header">
        <div className="reviews-score-laurel-row">
          <img 
            src={laurelLeft} 
            alt="Left laurel branch" 
            className="reviews-laurel-img" 
          />
          <span className="reviews-giant-score">{rating}</span>
          <img 
            src={laurelRight} 
            alt="Right laurel branch" 
            className="reviews-laurel-img" 
          />
        </div>

        <h2 className="reviews-guest-fav-badge">Guest favourite</h2>
        <p className="reviews-guest-fav-sub">
          This home is a guest favourite based on ratings, reviews and<br />
          reliability
        </p>
        <button 
          className="reviews-how-it-works-btn" 
          onClick={() => setIsAllReviewsModalOpen(true)}
        >
          How reviews work
        </button>
      </div>

      {/* 2. Rating Breakdown Columns with Vertical Dividers */}
      <div className="reviews-breakdown-row">
        
        {/* Col 1: Overall rating */}
        <div className="reviews-breakdown-col reviews-breakdown-col--overall">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Overall rating</span>
          </div>
          <div className="overall-bars-list">
            {[
              { level: 5, pct: 95 },
              { level: 4, pct: 5 },
              { level: 3, pct: 0 },
              { level: 2, pct: 0 },
              { level: 1, pct: 0 },
            ].map(row => (
              <div key={row.level} className="overall-bar-row">
                <span className="overall-bar-level">{row.level}</span>
                <div className="overall-bar-track">
                  <div 
                    className="overall-bar-fill" 
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Cleanliness */}
        <div className="reviews-breakdown-col">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Cleanliness</span>
            <span className="breakdown-col-score">5.0</span>
          </div>
          <div className="breakdown-col-icon">
            <CleanlinessSprayIcon />
          </div>
        </div>

        {/* Col 3: Accuracy */}
        <div className="reviews-breakdown-col">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Accuracy</span>
            <span className="breakdown-col-score">5.0</span>
          </div>
          <div className="breakdown-col-icon">
            <AccuracyCircleIcon />
          </div>
        </div>

        {/* Col 4: Check-in */}
        <div className="reviews-breakdown-col">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Check-in</span>
            <span className="breakdown-col-score">5.0</span>
          </div>
          <div className="breakdown-col-icon">
            <CheckInKeyIcon />
          </div>
        </div>

        {/* Col 5: Communication */}
        <div className="reviews-breakdown-col">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Communication</span>
            <span className="breakdown-col-score">5.0</span>
          </div>
          <div className="breakdown-col-icon">
            <CommunicationChatIcon />
          </div>
        </div>

        {/* Col 6: Location */}
        <div className="reviews-breakdown-col">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Location</span>
            <span className="breakdown-col-score">4.8</span>
          </div>
          <div className="breakdown-col-icon">
            <LocationMapIcon />
          </div>
        </div>

        {/* Col 7: Value */}
        <div className="reviews-breakdown-col reviews-breakdown-col--last">
          <div className="breakdown-col-top">
            <span className="breakdown-col-title">Value</span>
            <span className="breakdown-col-score">4.8</span>
          </div>
          <div className="breakdown-col-icon">
            <ValuePriceTagIcon />
          </div>
        </div>

      </div>

      {/* 3. Horizontally Scrollable Filter Pills with Blur/Fade Effect */}
      <div className="reviews-pills-wrapper">
        {canScrollLeft && <div className="reviews-pills-fade reviews-pills-fade--left" />}

        <div 
          className="reviews-pills-scroll" 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          {topicPillsData.map(pill => (
            <button
              key={pill.id}
              className={`review-topic-pill ${selectedTopic === pill.id ? 'review-topic-pill--active' : ''}`}
              onClick={() => setSelectedTopic(selectedTopic === pill.id ? null : pill.id)}
            >
              <span className="pill-emoji">{pill.emoji}</span>
              <span className="pill-label">{pill.label}</span>
              <span className="pill-count">{pill.count}</span>
            </button>
          ))}
        </div>

        {canScrollRight && <div className="reviews-pills-fade reviews-pills-fade--right" />}
      </div>

      {/* 4. 2-Column Reviews Grid */}
      <div className="reviews-cards-grid">
        {filteredReviews.map(rev => (
          <div key={rev.id} className="review-card-item">
            
            {/* Reviewer Header */}
            <div className="review-card-header">
              {rev.avatar ? (
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="review-author-avatar" 
                />
              ) : (
                <div 
                  className="review-author-initial" 
                  style={{ backgroundColor: rev.avatarBg || '#E8CA98' }}
                >
                  {rev.initial}
                </div>
              )}
              <div className="review-author-meta">
                <span className="review-author-name">{rev.name}</span>
                <span className="review-author-sub">{rev.duration}</span>
              </div>
            </div>

            {/* Stars & Date */}
            <div className="review-card-rating-row">
              <div className="review-stars-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={11} fill="#222222" color="#222222" />
                ))}
              </div>
              <span className="review-meta-dot">·</span>
              <span className="review-date-text">{rev.date}</span>
              {rev.stayType && (
                <>
                  <span className="review-meta-dot">·</span>
                  <span className="review-stay-type">{rev.stayType}</span>
                </>
              )}
            </div>

            {/* Review Text */}
            <p className="review-card-content">{rev.text}</p>
          </div>
        ))}
      </div>

      {/* 5. Show All Reviews Button */}
      <div className="reviews-show-all-row">
        <button 
          className="reviews-show-all-btn"
          onClick={() => setIsAllReviewsModalOpen(true)}
        >
          Show all {reviewCount} reviews
        </button>
      </div>

      {/* All Reviews Modal */}
      {isAllReviewsModalOpen && (
        <div className="reviews-modal-backdrop" onClick={() => setIsAllReviewsModalOpen(false)}>
          <div className="reviews-modal-window" onClick={e => e.stopPropagation()}>
            <div className="reviews-modal-header">
              <button 
                className="reviews-modal-close-btn" 
                onClick={() => setIsAllReviewsModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
              <div className="reviews-modal-title">
                <Star size={18} fill="#222" color="#222" />
                <span>{rating} · {reviewCount} reviews</span>
              </div>
            </div>

            <div className="reviews-modal-body">
              {/* Search Bar */}
              <div className="reviews-modal-search">
                <Search size={18} color="#717171" />
                <input 
                  type="text" 
                  placeholder="Search reviews" 
                  value={modalSearch}
                  onChange={e => setModalSearch(e.target.value)}
                />
                {modalSearch && (
                  <button onClick={() => setModalSearch('')} className="search-clear-btn">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Modal Reviews List */}
              <div className="reviews-modal-list">
                {sampleReviews
                  .filter(r => 
                    r.text.toLowerCase().includes(modalSearch.toLowerCase()) ||
                    r.name.toLowerCase().includes(modalSearch.toLowerCase())
                  )
                  .map(rev => (
                    <div key={rev.id} className="reviews-modal-item">
                      <div className="review-card-header">
                        {rev.avatar ? (
                          <img src={rev.avatar} alt={rev.name} className="review-author-avatar" />
                        ) : (
                          <div className="review-author-initial" style={{ backgroundColor: rev.avatarBg || '#E8CA98' }}>
                            {rev.initial}
                          </div>
                        )}
                        <div className="review-author-meta">
                          <span className="review-author-name">{rev.name}</span>
                          <span className="review-author-sub">{rev.duration}</span>
                        </div>
                      </div>
                      <div className="review-card-rating-row">
                        <div className="review-stars-row">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={11} fill="#222222" color="#222222" />
                          ))}
                        </div>
                        <span className="review-meta-dot">·</span>
                        <span className="review-date-text">{rev.date}</span>
                      </div>
                      <p className="review-card-content">{rev.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ReviewsSection;
