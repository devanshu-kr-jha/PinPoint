import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'

const MapWithGeocoder = () => {
  // const [pins, setPins] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      projection: 'globe',
      style: 'mapbox://styles/devanshu17/clmdeb0rf01cm01pfad81d15a',
      center: [ 90, 15],
      zoom: 2.5,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
    });

    mapInstance.addControl(geolocate);

    mapInstance.addControl(new mapboxgl.NavigationControl());

    const getPins = async() => {
      try {
        const pinData = await(await axios.get("http://localhost:5000/api/pins"))?.data
        console.log(pinData);

        pinData?.map(p => {

          const popupContentId = `popup-content-${p._id}`;
          const marker = new mapboxgl.Marker({
            anchor: 'top-left',
            size: 'large'
          })
          .setLngLat([p.lon, p.lat])
          .setPopup( new mapboxgl.Popup({
            closeButton: true,
            maxWidth: "300px",
            closeOnClick: true
          }).setHTML('<h3>fakfa</h3>')
          )
          .addTo(mapInstance)

          // const popupContent = document.getElementById(popupContentId);

          // // Create HTML content based on the fetched data for this marker
          // const htmlContent = `
          //   <h3>${p.title}</h3>
          //   <p>${p.descr}</p>
          // `;

          // // Insert the HTML content into the popup
          // popupContent.innerHTML = htmlContent;

        })

      } catch (error) {
        console.log(error)
      }
     }
     getPins();

    // const marker = new mapboxgl.Marker({
    //   anchor: 'top-left',

    //   size: 'large'
    // })
    // .setLngLat([49.823368, 40.351376])
    // .setPopup( new mapboxgl.Popup({
    //   closeButton: true,
    //   maxWidth: "300px",
    //   closeOnClick: true
    // }).setHTML("<h3>Marker Popup</h3>"))
    // .addTo(mapInstance)

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!map || !searchQuery) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        map.flyTo({ center: [longitude, latitude], zoom: 12 });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
};

export default MapWithGeocoder;
