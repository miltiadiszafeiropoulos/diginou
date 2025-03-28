import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon paths for webpack compatibility
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Mapping of transliterated city names to Greek names for better geocoding
const cityNameMap = {
  "elefsina": "Ελευσίνα",
  "athens": "Αθήνα",
  // Add more mappings as needed
};

const StoreMap = ({ address, city, region }) => {
  const [position, setPosition] = useState(null);
  const [zoom, setZoom] = useState(15); // Default zoom for exact location
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExactLocation, setIsExactLocation] = useState(false);

  useEffect(() => {
    // Convert city name to Greek if it exists in the map
    const greekCity = cityNameMap[city.toLowerCase()] || city;

    // Define address queries with increasing generality
    const fullAddress = `${address}, ${greekCity}, ${region}, Greece`;
    const cityRegionAddress = `${greekCity}, ${region}, Greece`;
    const cityCountryAddress = `${greekCity}, Greece`;

    // Function to geocode a query using Nominatim API
    const tryGeocode = (query) => {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&email=yourname@example.com`;
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const result = data[0];
            return [parseFloat(result.lat), parseFloat(result.lon)];
          }
          return null;
        })
        .catch((err) => {
          console.error("Geocoding error:", err);
          throw err;
        });
    };

    // Attempt geocoding with fallback logic
    tryGeocode(fullAddress)
      .then((pos) => {
        if (pos) {
          setPosition(pos);
          setIsExactLocation(true);
          setZoom(15); // Exact location zoom
          setLoading(false);
        } else {
          // Fallback to city and region
          tryGeocode(cityRegionAddress)
            .then((pos) => {
              if (pos) {
                setPosition(pos);
                setIsExactLocation(false);
                setZoom(10); // City-level zoom
                setLoading(false);
              } else {
                // Fallback to city and country
                tryGeocode(cityCountryAddress)
                  .then((pos) => {
                    if (pos) {
                      setPosition(pos);
                      setIsExactLocation(false);
                      setZoom(10); // City-level zoom
                      setLoading(false);
                    } else {
                      setError("Location not found.");
                      setLoading(false);
                    }
                  })
                  .catch(() => {
                    setError("Geocoding error.");
                    setLoading(false);
                  });
              }
            })
            .catch(() => {
              setError("Geocoding error.");
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setError("Geocoding error.");
        setLoading(false);
      });
  }, [address, city, region]);

  // Display loading state
  if (loading) {
    return <p>Loading map...</p>;
  }

  // Display error state
  if (error) {
    return <p>{error}</p>;
  }

  // Render the map with a marker
  return (
    <div style={{ height: '300px', width: '100%', marginBottom: '1rem' }}>
      {position && (
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {isExactLocation
                ? `${address}, ${city}`
                : `Approximate location: ${city}`}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default StoreMap;