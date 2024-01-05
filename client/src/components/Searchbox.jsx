import React, { useEffect, useState, useSyncExternalStore } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setViewState } from '../redux/mapstateReducer';
import { setGeoState } from '../redux/mapstateReducer';
import axios from "axios"
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import "../styles/searchBox.css"

const SearchBox = ({mapRef}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [apiData, setApiData] = useState([])
  const [dataFlag, setDataFlag] = useState(false)
  const viewState = useSelector((state)=> state.viewState)
  const dispatch = useDispatch()
  const [suggestionFlag, setSuggestionFlag] = useState(true)

  useEffect(() =>{
    (async() => {
      if(!searchQuery) {
        setDataFlag(false)
        return;
      }
      setDataFlag(true)
      const AccessToken = import.meta.env.VITE_MAPBOX_TOKEN
      try {
      const response =  await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${AccessToken}`
      )

      const results = response.data.features
      if( results.length > 0){
        setApiData(results)
      }
    }
      catch(error) {
        console.log(error)
      }
    })()
    

  },[searchQuery])

  const handleSearch = async () => {
    if(!searchQuery) return;
    const AccessToken = import.meta.env.VITE_MAPBOX_TOKEN
    setDataFlag(false)
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${AccessToken}`
      )

      const results = response?.data?.features
      // setSearchResult(results)

      if( results.length > 0){
        const [longitude, latitude] = results[0].center
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 12, duration: 5000 });
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchText = async (sPlace) => {
    setSuggestionFlag(false)
    setSearchQuery(sPlace)
    handleSearch();
  }

  return (
    <> 
    <div className="gbox">
    <div className='searchContainer'>
      <div className='inputWrapper'>
        <div className="searchIcon">
            <SearchIcon className='searchIcon' onClick={handleSearch} />
        </div>
          <input
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={(e)=> setSearchQuery(e.target.value)}
          onClick={() => setSuggestionFlag(true)}
          />
        
      </div>
    </div>
    { dataFlag && suggestionFlag &&
    <div className='d1'>
      <div className="d2">
        {
        apiData.map((d)=>(
                <p key={d._id} onClick={() => handleSearchText(d.place_name)}>{d.place_name}</p>
        ))
        }
      </div>
    </div>
    }
    </div>
    </>
  );
};

 // dispatch(setGeoState({longitude, latitude}))

export default SearchBox;