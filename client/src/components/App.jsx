/**
 * Import necessary components and libraries
 */
import Map, {
  NavigationControl,
  GeolocateControl,
  Marker,
  Popup,
} from "react-map-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setViewState } from "../redux/mapstateReducer.js";
import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/Last.css";

import SearchBox from "./Searchbox.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import Switch from "@mui/material/Switch";
import axios from "axios";

/**
 * Define toast notification functions
 */
const pinAddSuccess = () => {
  toast.success("Added Pin!");
};

const userNotLoggedIn = () => {
  toast.warning("Login to account to set pins!");
};

const userLoggedOut = (userS) => {
  toast.warning("Logout from " + userS);
};

const pinAddFailure = () => {
  toast.error("Couldn't add pin! Please fill all the required information");
};

const pinDelSuccess = () => {
  toast.success("Successfully deleted pin");
};

/**
 * Define the MapInterface component
 */
const MapInterface = () => {
  /**
   * Get the current view state and dispatch function from Redux
   */
  const viewState = useSelector((state) => state.viewState);
  const dispatch = useDispatch();
  const mapRef = useRef();

  /**
   * Initialize state variables
   */
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [descr, setDescr] = useState(null);
  const [rating, setRating] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [satStyle, setSatStyle] = useState(false);

  /**
   * Get all pins from the database on initial render
   */
  useEffect(() => {
    getPins();
  }, []);

  /**
   * Function to get all pins from the database
   */
  const getPins = async () => {
    try {
      const response = await axios.get("/api/pins", {withCredentials: true});
      const pinData = response?.data;
      setPins(pinData);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Function to handle marker click
   */
  const handleMarkerClicked = (id) => {
    setCurrentPlaceId(id);
  };

  /**
   * Function to handle add click
   */
  const handleAddClick = (e) => {
    setNewPlace({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    });
  };

  /**
   * Function to handle pin submission
   */
  const handlePinsubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title: title,
      rating: rating,
      lat: newPlace.lat,
      lon: newPlace.lng,
      descr: descr,
    };
    try {
      if (!currentUser) {
        userNotLoggedIn();
      } else {
        const response = await axios.post("/api/pins", newPin, {withCredentials: true});
        setPins([...pins, response.data]);
        pinAddSuccess();
        setRating(1);
        setDescr(null);
        setTitle(null);
      }
    } catch (error) {
      pinAddFailure();
    }
  };

  /**
   * Function to handle logout
   */
  const handleLogout = async () => {
    await axios.get("/api/logout");

    userLoggedOut(currentUser);
    setCurrentUser(null);
  };

  /**
   * Function to handle map move
   */
  const onMove = useCallback((evt) => {
    dispatch(setViewState(evt.viewState));
  });

  /**
   * Function to handle pin deletion
   */
  const handleDropPin = async (pid) => {
    const pin_id = pid;
    try {
      await axios.delete(`/api/pins?pin_id=${pin_id}`);
      pinDelSuccess();
      getPins();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchBox mapRef={mapRef} />
      <Map
        {...viewState}
        container={"map"}
        projection={"globe"}
        onMove={(e) => dispatch(setViewState(e.viewState))}
        mapStyle={
          satStyle
            ? import.meta.env.VITE_MAPBOX_STYLE2
            : import.meta.env.VITE_MAPBOX_STYLE
        }
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onDblClick={handleAddClick}
        ref={mapRef}
      >
        <ToastContainer position="top-left" theme="dark" />

        <NavigationControl showCompass={false} position="top-right" />

        <GeolocateControl position="top-right" />

        {
          /* Mark pins on the Map by iterating over pins[] */
          Array.isArray(pins) && pins.map((p) => (
            <>
              <Marker
                key={p._id}
                longitude={p.lon}
                latitude={p.lat}
                anchor="center"
              >
                <LocationOnIcon
                  onClick={() => handleMarkerClicked(p._id)}
                  className="icon"
                  style={{
                    fontSize: viewState.zoom * 15,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                  }}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  longitude={p.lon}
                  latitude={p.lat}
                  closeOnClick={false}
                  closeOnMove={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="descr">{p.descr}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<StarIcon className="star" />)}
                    </div>
                    <label>Information</label>
                    <div className="info">
                      <span className="username">
                        Created by <b>{p.username}</b>
                      </span>
                      <span className="date">{format(p.createdAt)}</span>
                    </div>
                    {currentUser === p.username && (
                      <button
                        className="delete_pin"
                        onClick={() => handleDropPin(p._id)}
                      >
                        Delete Pin
                      </button>
                    )}
                  </div>
                </Popup>
              )}
            </>
          ))
        }
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div className="input_details_container">
              <form onSubmit={handlePinsubmit}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter titile.."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place"
                  onChange={(e) => setDescr(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add a Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>

      <div className="footer">
        <div className="footer-down">
          <Switch
            sx={{ position: "absolute", ml: 80 }}
            color="warning"
            onChange={() => setSatStyle(!satStyle)}
          />
          {currentUser ? (
            <button className="button logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button
                className="button login"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className="button register"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
};

export default MapInterface;
