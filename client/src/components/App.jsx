import "mapbox-gl/dist/mapbox-gl.css"
import { useState } from "react";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import LastComponent from "./Last";




function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 70,
    zoom: 3,
  });


  return(
    <div>
     {/* <Map
     container={"map"}
     projection={"globe"}
     mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
     initialViewState={{
      ...viewport
     }}
     mapStyle="mapbox://styles/devanshu17/clmdeb0rf01cm01pfad81d15a"
     style={{width:"100vw", height:"100vh"}}
     onViewportChange={handleViewportChange}
     >
     <NavigationControl position="top-right"/>
     <GeolocateControl position="top-left"/>

    <MapboxGeocoder
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onResult={handleGeocoderResult}
      position="top-left"
      trackProximity={true}
      placeholder="Search for a location"
    />
      
    </Map> */}

     {/* <MapWithGeocoder /> */}
     {/* <NewMap/> */}
     <LastComponent/>
     </div>   
  )
}
export default App


   {/* <input
        type="text"
        placeholder="Search for a location"
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>search</button> */}
    

    