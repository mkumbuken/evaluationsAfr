import { useState } from 'react';

const SearchFilter = ({ 
  onSearch, 
  onFilterChange, 
  onClear, 
  properties,
  currentFilters,
  searchTerm
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // To extract unique values for filters from properties
  const uniqueListingTypes = [...new Set(properties.map(p => p.listing_type))].filter(Boolean);
  const uniqueDistricts = [...new Set(properties.map(p => p.location?.district))].filter(Boolean);
  const uniqueZones = [...new Set(properties.map(p => p.location?.zone_category))].filter(Boolean);
  const uniqueZonings = [...new Set(properties.map(p => p.location?.zoning))].filter(Boolean);
  
  const bedroomOptions = [1, 2, 3, 4, 5, '5+'];
  const priceRanges = [
    { label: 'Under MWK 500,000', value: '0-500000' },
    { label: 'MWK 500,000 - 1M', value: '500000-1000000' },
    { label: 'MWK 1M - 5M', value: '1000000-5000000' },
    { label: 'MWK 5M - 10M', value: '5000000-10000000' },
    { label: 'Over MWK 10M', value: '10000000-' }
  ];

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="toggle-advanced"
        >
          {showAdvanced ? 'Hide Filters' : 'Advanced Filters'}
        </button>
      </div>
      
      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Listing Type</label>
            <select
              value={currentFilters.listing_type || ''}
              onChange={(e) => onFilterChange('listing_type', e.target.value)}
            >
              <option value="">All Types</option>
              {uniqueListingTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>District</label>
            <select
              value={currentFilters.district || ''}
              onChange={(e) => onFilterChange('district', e.target.value)}
            >
              <option value="">All Districts</option>
              {uniqueDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Zone Category</label>
            <select
              value={currentFilters.zone_category || ''}
              onChange={(e) => onFilterChange('zone_category', e.target.value)}
            >
              <option value="">All Zones</option>
              {uniqueZones.map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Zoning</label>
            <select
              value={currentFilters.zoning || ''}
              onChange={(e) => onFilterChange('zoning', e.target.value)}
            >
              <option value="">All Zonings</option>
              {uniqueZonings.map(zoning => (
                <option key={zoning} value={zoning}>{zoning}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Bedrooms</label>
            <select
              value={currentFilters.bedrooms || ''}
              onChange={(e) => onFilterChange('bedrooms', e.target.value)}
            >
              <option value="">Any</option>
              {bedroomOptions.map(bed => (
                <option key={bed} value={bed}>{bed}+</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={currentFilters.price_range || ''}
              onChange={(e) => onFilterChange('price_range', e.target.value)}
            >
              <option value="">Any Price</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <button onClick={onClear} className="clear-filters">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;