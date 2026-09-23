import React, { useState } from 'react';
import './HostSection.css';
import hostAvatar from '../../assets/host.jpeg';

const BalloonIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="26" 
    height="26" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    <path d="M12 2a6 6 0 0 0-6 6c0 4 6 8 6 8s6-4 6-8a6 6 0 0 0-6-6z" />
    <path d="M12 16l-1 2h2z" />
    <path d="M12 18v4" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="26" 
    height="26" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

/* User-provided Protection Shield SVG */
const ShieldIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z" />
  </svg>
);

const VerifiedCheckIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="12" 
    height="12" 
    fill="none" 
    stroke="#ffffff" 
    strokeWidth="3.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const coHostsData = [
  {
    col: 1,
    hosts: [
      { 
        name: 'Sharath', 
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80' 
      },
      { 
        name: 'Simran', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80' 
      },
      { 
        name: 'Shruti', 
        initial: 'S', 
        bg: '#FCE4EC', 
        color: '#D81B60' 
      }
    ]
  },
  {
    col: 2,
    hosts: [
      { 
        name: 'Aman Dev Pahwa', 
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80' 
      },
      { 
        name: 'Pallavi', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' 
      },
      { 
        name: 'Amisha', 
        initial: 'A', 
        bg: '#E3F2FD', 
        color: '#1976D2' 
      }
    ]
  },
  {
    col: 3,
    hosts: [
      { 
        name: 'Maria Karen Priyanka', 
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80' 
      },
      { 
        name: 'Sanyukta', 
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80' 
      }
    ]
  }
];

const HostSection = () => {
  const [isNeighbourhoodExpanded, setIsNeighbourhoodExpanded] = useState(false);

  return (
    <div className="host-section-wrapper">
      
      {/* 1. Neighbourhood Highlights (Under Map) */}
      <div className="neighbourhood-section">
        <p className="exact-location-note">
          Exact location will be provided after booking.
        </p>

        <h3 className="neighbourhood-title">Neighbourhood highlights</h3>
        
        <p className="neighbourhood-desc">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
          {isNeighbourhoodExpanded && (
            <span>
              {' '}The vibrant Candolim beach is just 5 minutes away, featuring water sports, beach shacks, and famous sunset views. Top dining spots such as Fisherman's Cove, Calamari, and local bakeries are within walking distance, making it an ideal holiday hub.
            </span>
          )}
        </p>

        <button 
          className="neighbourhood-show-more"
          onClick={() => setIsNeighbourhoodExpanded(!isNeighbourhoodExpanded)}
        >
          <u>{isNeighbourhoodExpanded ? 'Show less' : 'Show more'}</u>
          <span className="chevron">&gt;</span>
        </button>
      </div>

      <hr className="divider divider--full host-divider" />

      {/* 2. Meet your host Section */}
      <div className="meet-host-section">
        <h2 className="meet-host-title">Meet your host</h2>

        <div className="meet-host-content">
          
          {/* Left Column: White Host Profile Card + Trivia */}
          <div className="meet-host-left">
            <div className="host-profile-card">
              
              {/* Card Left: Avatar + Name + Host */}
              <div className="host-card-left">
                <div className="host-avatar-container">
                  <img 
                    src={hostAvatar} 
                    alt="Mirashya Homes Host" 
                    className="host-card-avatar"
                  />
                  <div className="host-verified-badge" title="Verified Host">
                    <VerifiedCheckIcon />
                  </div>
                </div>
                <h3 className="host-card-name">Mirashya<br />Homes</h3>
                <span className="host-card-role">Host</span>
              </div>

              {/* Card Right: 3 Stats with horizontal dividers */}
              <div className="host-card-stats">
                
                <div className="host-stat-item">
                  <span className="host-stat-value">1,463</span>
                  <span className="host-stat-label">Reviews</span>
                </div>

                <div className="host-stat-divider" />

                <div className="host-stat-item">
                  <span className="host-stat-value">
                    4.68<span className="host-star">★</span>
                  </span>
                  <span className="host-stat-label">Rating</span>
                </div>

                <div className="host-stat-divider" />

                <div className="host-stat-item">
                  <span className="host-stat-value">2</span>
                  <span className="host-stat-label">Years hosting</span>
                </div>

              </div>

            </div>

            {/* Host Trivia */}
            <div className="host-trivia-list">
              <div className="host-trivia-row">
                <BalloonIcon />
                <span>Born in the 80s</span>
              </div>
              <div className="host-trivia-row">
                <GraduationCapIcon />
                <span>Where I went to school: NICMAR GOA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Co-Hosts + Host details */}
          <div className="meet-host-right">
            
            {/* Co-Hosts */}
            <div className="co-hosts-block">
              <h3 className="co-hosts-title">Co-Hosts</h3>
              
              <div className="co-hosts-grid">
                {coHostsData.map((colGroup) => (
                  <div key={colGroup.col} className="co-hosts-col">
                    {colGroup.hosts.map((cohost, idx) => (
                      <div key={idx} className="co-host-item">
                        {cohost.avatar ? (
                          <img 
                            src={cohost.avatar} 
                            alt={cohost.name} 
                            className="co-host-avatar"
                          />
                        ) : (
                          <div 
                            className="co-host-initial-avatar"
                            style={{ backgroundColor: cohost.bg, color: cohost.color }}
                          >
                            {cohost.initial}
                          </div>
                        )}
                        <span className="co-host-name">{cohost.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Host details */}
            <div className="host-details-block">
              <h3 className="host-details-title">Host details</h3>
              <p className="host-detail-line">Response rate: 100%</p>
              <p className="host-detail-line">Responds within an hour</p>

              <button className="message-host-btn">
                Message host
              </button>

              <div className="host-payment-protection">
                <ShieldIcon />
                <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default HostSection;
