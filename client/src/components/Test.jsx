import Map,{ GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import ReactMapGL from 'react-map-gl';
import { useRef, useState } from "react";
import axios from "axios"
import "mapbox-gl/dist/mapbox-gl.css"
import { easeCircleInOut, easeCubicInOut } from "d3-ease"


const NewMap = () => {

  const [viewport, setViewport] = useState({
    longitude: 70,
    latitude: 20,
    zoom: 3,
    // transitionDuration: 500,
    // transitionInterpolator: new ReactMapGL.BezierInterpolator()
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([]);


  const handleSearch = async () => {
    if(!searchQuery) return;
    const AccessToken = import.meta.env.VITE_MAPBOX_TOKEN
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${AccessToken}`
      )

      const results = response?.data?.features
      // setSearchResult(results)

      if( results.length > 0){
        const [longitude, latitude] = results[0].center
        setViewport({...viewport, 
          longitude, 
          latitude, 
          zoom: 12,
          transitionDuration: 500,
          transitionEasing: easeCircleInOut
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  return(
   <div>
    <div>
      <input
      type="text"
      placeholder="Enter search text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    <Map
    container={'map'}
    projection={'globe'}
    mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    {...viewport}
    onMove={newViewport => setViewport(newViewport)}
    // initialViewState={viewport}
    mapStyle="mapbox://styles/devanshu17/clmdeb0rf01cm01pfad81d15a"
    style={{width:"100vw", height:"100vh"}}
    // onViewportChange={newViewport => setViewport(newViewport)}
    >

      <NavigationControl position="top-right" />
      <GeolocateControl position="top-left" />

      {/* <Marker 
       key={result.id}
       latitude={searchResult.center[1]}
       longitude={searchResult.center[0]}
      
      /> */}

    </Map>
   </div>
  )
};

export default  NewMap
