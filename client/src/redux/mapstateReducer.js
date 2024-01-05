import { createSlice } from "@reduxjs/toolkit"

export const mapStateReducer = createSlice({
    name: 'mapState',
    initialState: {
        viewState: {
            longitude: 70,
            latitude: 20,
            zoom: 3.5,
            bearing: 0,
            pitch: 0
        }
    },
    reducers: {
        setViewState: (state, action) => {
            return {
                ...state,
                viewState: action.payload
            }
        },
        setGeoState: (state, action) => {
            const {longitude, latitude} = action.payload
            state.viewState.longitude = longitude;
            state.viewState.latitude = latitude;
            state.viewState.zoom = 12
        },
        setBearing: (state, action) => {
            state.viewState.bearing = action.payload;
        },
        setPitch: (state, action) => {
            state.viewState.pitch = action.payload;
        },
}
})

export const { setViewState, setGeoState,setBearing, setPitch } = mapStateReducer.actions
export default mapStateReducer.reducer
