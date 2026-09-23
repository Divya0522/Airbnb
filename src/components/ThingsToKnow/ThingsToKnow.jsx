import React, { useState } from 'react';
import './ThingsToKnow.css';
import { X } from 'lucide-react';

/* User-provided Cancellation Policy SVG */
const CancellationCalendarIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="m12 0v2h8v-2h2v2h6c1.1045695 0 2 .8954305 2 2v21c0 2.7614237-2.2385763 5-5 5h-18c-2.76142375 0-5-2.2385763-5-5v-21c0-1.1045695.8954305-2 2-2h6v-2zm16 12h-24v13c0 1.6568542 1.34314575 3 3 3h18c1.6568542 0 3-1.3431458 3-3zm-8.2071068 2.2928932 1.4142136 1.4142136-3.7921068 3.7928932 3.7921068 3.7928932-1.4142136 1.4142136-3.7928932-3.7921068-3.7928932 3.7921068-1.4142136-1.4142136 3.7921068-3.7928932-3.7921068-3.7928932 1.4142136-1.4142136 3.7928932 3.7921068zm-9.7928932-10.2928932h-6v6h24v-6h-6v2h-2v-2h-8v2h-2z" />
  </svg>
);

/* User-provided House Rules Key SVG */
const HouseRulesKeyIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
  </svg>
);

/* User-provided Safety & Property Shield SVG */
const SafetyShieldIcon = () => (
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

const ThingsToKnow = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="things-to-know-section" aria-label="Things to know">
      <hr className="divider divider--full things-divider" />
      
      <h2 className="things-to-know-title">Things to know</h2>

      <div className="things-to-know-grid">
        
        {/* Col 1: Cancellation policy */}
        <div className="things-col">
          <div className="things-col-icon">
            <CancellationCalendarIcon />
          </div>
          <h3 className="things-col-heading">Cancellation policy</h3>
          <p className="things-col-text">
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p className="things-col-text things-col-subtext">
            Review this host's full policy for details.
          </p>
          <button 
            className="things-learn-more-btn"
            onClick={() => setActiveModal('cancellation')}
          >
            Learn more
          </button>
        </div>

        {/* Col 2: House rules */}
        <div className="things-col">
          <div className="things-col-icon">
            <HouseRulesKeyIcon />
          </div>
          <h3 className="things-col-heading">House rules</h3>
          <p className="things-col-item">Check-in after 2:00 pm</p>
          <p className="things-col-item">Checkout before 11:00 am</p>
          <p className="things-col-item">3 guests maximum</p>
          <button 
            className="things-learn-more-btn"
            onClick={() => setActiveModal('house_rules')}
          >
            Learn more
          </button>
        </div>

        {/* Col 3: Safety & property */}
        <div className="things-col">
          <div className="things-col-icon">
            <SafetyShieldIcon />
          </div>
          <h3 className="things-col-heading">Safety & property</h3>
          <p className="things-col-item">Carbon monoxide alarm not reported</p>
          <p className="things-col-item">Smoke alarm not reported</p>
          <p className="things-col-item">Exterior security cameras on property</p>
          <button 
            className="things-learn-more-btn"
            onClick={() => setActiveModal('safety')}
          >
            Learn more
          </button>
        </div>

      </div>

      {/* Modal for Learn more */}
      {activeModal && (
        <div className="things-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="things-modal-content" onClick={e => e.stopPropagation()}>
            <div className="things-modal-header">
              <button 
                className="things-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="things-modal-body">
              {activeModal === 'cancellation' && (
                <div>
                  <h3 className="things-modal-title">Cancellation policy</h3>
                  <p className="things-modal-p">
                    <strong>Before 17 Oct:</strong> Full refund: Get back 100% of what you paid.
                  </p>
                  <p className="things-modal-p">
                    <strong>17 Oct – 18 Oct:</strong> Partial refund: Get back 50% of every night, plus the cleaning fee.
                  </p>
                  <p className="things-modal-p">
                    <strong>After 18 Oct:</strong> Non-refundable.
                  </p>
                </div>
              )}

              {activeModal === 'house_rules' && (
                <div>
                  <h3 className="things-modal-title">House rules</h3>
                  <p className="things-modal-p">You'll be staying in someone's home, so please treat it with care and respect.</p>
                  <ul className="things-modal-list">
                    <li>Check-in: After 2:00 pm</li>
                    <li>Checkout: Before 11:00 am</li>
                    <li>Self check-in with building staff</li>
                    <li>No smoking inside the apartment</li>
                    <li>No parties or events</li>
                    <li>Pets allowed with prior approval</li>
                  </ul>
                </div>
              )}

              {activeModal === 'safety' && (
                <div>
                  <h3 className="things-modal-title">Safety & property</h3>
                  <p className="things-modal-p">Avoid surprises by reviewing these important safety details about this listing:</p>
                  <ul className="things-modal-list">
                    <li>Carbon monoxide alarm: Not reported by host</li>
                    <li>Smoke alarm: Not reported by host</li>
                    <li>Exterior security cameras on property: Located at entrance gates and building corridors for security purposes.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ThingsToKnow;
