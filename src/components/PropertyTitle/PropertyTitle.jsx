import { Share, Heart } from 'lucide-react';
import './PropertyTitle.css';

const PropertyTitle = ({ title, isSaved, onShare, onSave }) => {
  return (
    <div className="property-title">
      <h1>{title}</h1>
      <div className="property-title__actions">
        <button 
          className="property-title__action-btn"
          onClick={onShare}
          aria-label="Share this listing"
        >
          <Share size={16} />
          <u>Share</u>
        </button>
        <button 
          className="property-title__action-btn"
          onClick={onSave}
          aria-label={isSaved ? "Saved to wishlist" : "Save to wishlist"}
        >
          <Heart 
            size={16} 
            fill={isSaved ? '#FF385C' : 'none'} 
            color={isSaved ? '#FF385C' : '#222222'} 
          />
          <u>{isSaved ? 'Saved' : 'Save'}</u>
        </button>
      </div>
    </div>
  );
};

export default PropertyTitle;
