import React, { useState } from 'react';
import './MoreStays.css';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import s1 from '../../assets/s1.jpeg';
import s2 from '../../assets/s2.jpeg';
import s3 from '../../assets/s3.jpeg';
import s4 from '../../assets/s4.jpeg';
import s5 from '../../assets/s5.jpeg';
import s6 from '../../assets/s6.jpeg';

const pagesData = [
  // Page 1 (1 / 2)
  [
    {
      id: 1,
      title: 'Beautiful Studio with a view to die for',
      price: '₹23,600',
      rating: 4.91,
      image: s1
    },
    {
      id: 2,
      title: 'NAQAB - 1bhk with private pool',
      price: '₹42,218',
      rating: 4.95,
      image: s2
    },
    {
      id: 3,
      title: 'Greentique Luxury Flat with plunge pool, Calangute',
      price: '₹44,506',
      rating: 4.94,
      image: s3
    },
    {
      id: 4,
      title: 'The Tropical Studio | 5 mins to Beach',
      price: '₹22,824',
      rating: 4.96,
      image: s4
    },
    {
      id: 5,
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: '₹39,942',
      rating: 4.95,
      image: s5
    }
  ],
  // Page 2 (2 / 2)
  [
    {
      id: 6,
      title: 'The Tropical Studio | 5 mins to Beach',
      price: '₹22,824',
      rating: 4.96,
      image: s4
    },
    {
      id: 7,
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: '₹39,942',
      rating: 4.95,
      image: s5
    },
    {
      id: 8,
      title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
      price: '₹45,648',
      rating: 5.0,
      image: s6
    },
    {
      id: 9,
      title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
      price: '₹48,786',
      rating: 4.93,
      image: s2
    },
    {
      id: 10,
      title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
      price: '₹22,824',
      rating: 4.92,
      image: s4
    }
  ]
];

const MoreStays = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pagesData.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <section className="more-stays-section" aria-label="More stays nearby">
      <hr className="divider divider--full more-stays-divider" />

      {/* Header: Title on Left, Pagination Controls on Right */}
      <div className="more-stays-header">
        <h2 className="more-stays-title">More stays nearby</h2>

        <div className="more-stays-pagination">
          <span className="pagination-counter">
            {currentPage + 1} / {pagesData.length}
          </span>
          
          <button 
            className="pagination-arrow-btn"
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous stays"
          >
            <ChevronLeft size={16} color="#222" />
          </button>

          <button 
            className="pagination-arrow-btn"
            onClick={handleNext}
            disabled={currentPage === pagesData.length - 1}
            aria-label="Next stays"
          >
            <ChevronRight size={16} color="#222" />
          </button>
        </div>
      </div>

      {/* 5-Card Stays Grid */}
      <div className="more-stays-grid">
        {pagesData[currentPage].map((stay) => (
          <div key={stay.id} className="stay-card">
            <div className="stay-card-image-wrap">
              <img 
                src={stay.image} 
                alt={stay.title} 
                className="stay-card-image"
              />
            </div>
            
            <h3 className="stay-card-title" title={stay.title}>
              {stay.title}
            </h3>

            <div className="stay-card-meta">
              <span className="stay-card-price">{stay.price}</span>
              <span className="stay-card-rating">
                <Star size={12} fill="#222222" color="#222222" />
                <span>{stay.rating.toFixed(2).replace(/\.00$/, '.0')}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default MoreStays;
