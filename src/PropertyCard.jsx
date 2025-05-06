import { useState } from 'react';

const PropertyCard = ({ property }) => {
  const [showMore, setShowMore] = useState(false);

  // Helper function to parse attributes
  const parseAttributes = () => {
    try {
      if (!property.attributes) return [];
      const parsed = JSON.parse(property.attributes);
      return parsed.attributes || [];
    } catch (e) {
      return [];
    }
  };

  const attributes = parseAttributes();
  const location = property.location || {};
  const agent = property.agent || {};
  const coverPhoto = property.cover_photo || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK'
    }).format(price);
  };

  return (
    <div className="property-card">
      <div className="property-image">
        {coverPhoto.url ? (
          <img src={coverPhoto.url} alt={coverPhoto.description || 'Property'} />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      
      <div className="property-details">
        {/* <h3>{property.title || 'No Title'}</h3> */}
        
        <div className="property-location">
          <p><strong>Location:</strong> {location.area || 'N/A'}, {location.district || 'N/A'}</p>
          <p><strong>Zone:</strong> {location.zone_category || 'N/A'} ({location.zoning || 'N/A'})</p>
        </div>
        
        <div className="property-meta">
          <span><strong>Type:</strong> {property.listing_type || 'N/A'}</span>
          <span><strong>Price:</strong> {formatPrice(property.price)}</span>
          <span><strong>Bedrooms:</strong> {property.no_rooms || 'N/A'}</span>
          <span><strong>Bathrooms:</strong> {property.no_of_bathrooms || 'N/A'}</span>
          <span><strong>Built:</strong> {property.year_built || 'N/A'}</span>
          <span><strong>Size:</strong> {property.building_size || 'N/A'} {property.bulding_size_unit || 'sqm'}</span>
        </div>
        
        <div className="property-description">
          <p>{property.description || 'No description available'}</p>
        </div>
        
        {attributes.length > 0 && (
          <div className="property-attributes">
            <h4>Features:</h4>
            <div className="attributes-grid">
              {attributes.slice(0, showMore ? attributes.length : 6).map((attr, index) => (
                <span key={index} className="attribute-tag">{attr.name}</span>
              ))}
            </div>
            {attributes.length > 6 && (
              <button 
                onClick={() => setShowMore(!showMore)} 
                className="show-more-btn"
              >
                {showMore ? 'Show Less' : 'Show More...'}
              </button>
            )}
          </div>
        )}
        
        <div className="property-agent">
          {agent.user && (
            <p><strong>Agent:</strong> {agent.user.name || 'N/A'}</p>
          )}
          {agent.phone && (
            <p><strong>Contact:</strong> {agent.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;