import './ImageGallery.css';

/* 3 by 3 dots grid SVG icon matching Airbnb reference */
const DotsGridIcon = () => (
  <svg 
    viewBox="0 0 16 16" 
    width="16" 
    height="16" 
    fill="currentColor" 
    aria-hidden="true"
    className="dots-grid-icon"
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

const ImageGallery = ({ images, onShowAllPhotos, onImageClick }) => {
  const galleryImages = images?.slice(0, 5) || [];
  
  return (
    <div className="image-gallery">
      {galleryImages.map((image, index) => (
        <button
          key={image.id || index}
          className={`image-gallery__tile image-gallery__tile--${index}`}
          onClick={() => onImageClick && onImageClick(index)}
          aria-label={`View photo ${index + 1}: ${image.alt || 'Property image'}`}
        >
          <img
            src={image.url}
            alt={image.alt || 'Property image'}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </button>
      ))}
      <button
        className="image-gallery__show-all"
        onClick={onShowAllPhotos}
      >
        <DotsGridIcon />
        Show all photos
      </button>
    </div>
  );
};

export default ImageGallery;
