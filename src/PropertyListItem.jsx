const PropertyListItem = ({ property }) => {
    const location = property.location || {};
    const coverPhoto = property.cover_photo || {};
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-MW', {
        style: 'currency',
        currency: 'MWK'
      }).format(price);
    };
  
    return (
      <div className="property-list-item">
        <div className="item-image">
          {coverPhoto.url ? (
            <img src={coverPhoto.url} alt={coverPhoto.description || 'Property'} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>
        
        <div className="item-details">
          <div className="item-header">
            <h3>{property.title || 'No Title'}</h3>
            <span className="price">{formatPrice(property.price)}</span>
          </div>
          
          <p className="location">
            {location.area || 'N/A'}, {location.district || 'N/A'} - {location.zone_category || 'N/A'} ({location.zoning || 'N/A'})
          </p>
          
          <div className="item-meta">
            <span><strong>Type:</strong> {property.listing_type || 'N/A'}</span>
            <span><strong>Bed:</strong> {property.no_rooms || 'N/A'}</span>
            <span><strong>Bath:</strong> {property.no_of_bathrooms || 'N/A'}</span>
            <span><strong>Built:</strong> {property.year_built || 'N/A'}</span>
            <span><strong>Size:</strong> {property.building_size || 'N/A'} {property.bulding_size_unit || 'sqm'}</span>
          </div>
          
          <div className="item-description">
            <p>{property.description ? `${property.description.substring(0, 150)}...` : 'No description available'}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PropertyListItem;