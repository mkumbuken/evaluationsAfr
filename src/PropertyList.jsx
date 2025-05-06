import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyListItem from './PropertyListItem';
import SearchFilter from './SearchFilter';

const PropertyList = ({ properties, loading, error, onRefresh }) => {
  const [viewMode, setViewMode] = useState('card');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    listing_type: '',
    district: '',
    zone_category: '',
    zoning: '',
    bedrooms: '',
    price_range: ''
  });

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    let result = [...properties];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(property => {
        const title = property.title?.toLowerCase() || '';
        const description = property.description?.toLowerCase() || '';
        const area = property.location?.area?.toLowerCase() || '';
        const district = property.location?.district?.toLowerCase() || '';
        
        return (
          title.includes(term) || 
          description.includes(term) ||
          area.includes(term) ||
          district.includes(term)
        );
      });
    }
    
    // Apply other filters
    if (filters.listing_type) {
      result = result.filter(property => property.listing_type === filters.listing_type);
    }
    
    if (filters.district) {
      result = result.filter(property => property.location?.district === filters.district);
    }
    
    if (filters.zone_category) {
      result = result.filter(property => property.location?.zone_category === filters.zone_category);
    }
    
    if (filters.zoning) {
      result = result.filter(property => property.location?.zoning === filters.zoning);
    }
    
    if (filters.bedrooms) {
      const bedNum = parseInt(filters.bedrooms);
      if (!isNaN(bedNum)) {
        result = result.filter(property => {
          const propertyBeds = parseInt(property.no_rooms) || 0;
          return filters.bedrooms === '5+' 
            ? propertyBeds >= 5 
            : propertyBeds === bedNum;
        });
      }
    }
    
    if (filters.price_range) {
      const [min, max] = filters.price_range.split('-').map(Number);
      result = result.filter(property => {
        const price = property.price || 0;
        return (
          (isNaN(min) || price >= min) && 
          (isNaN(max) || price <= max)
        );
      });
    }
    
    setFilteredProperties(result);
  }, [searchTerm, filters, properties]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      listing_type: '',
      district: '',
      zone_category: '',
      zoning: '',
      bedrooms: '',
      price_range: ''
    });
  };

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h2>Property Listings ({filteredProperties.length})</h2>
        <div className="view-toggle">
          <button 
            onClick={() => setViewMode('card')} 
            className={viewMode === 'card' ? 'active' : ''}
          >
            Card View
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={viewMode === 'list' ? 'active' : ''}
          >
            List View
          </button>
        </div>
        <button onClick={onRefresh} className="refresh-button">
          Refresh
        </button>
      </div>
      
      <SearchFilter 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange} 
        onClear={clearFilters}
        properties={properties}
        currentFilters={filters}
        searchTerm={searchTerm}
      />
      
      {loading && <div className="loading">Loading properties...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <>
          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties match your search criteria.</p>
              <button onClick={clearFilters}>Clear all filters</button>
            </div>
          ) : (
            <div className={`property-list ${viewMode}`}>
              {filteredProperties.map(property => (
                viewMode === 'card' ? (
                  <PropertyCard key={property.id} property={property} />
                ) : (
                  <PropertyListItem key={property.id} property={property} />
                )
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyList;