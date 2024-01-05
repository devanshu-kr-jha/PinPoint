import { configureStore } from "@reduxjs/toolkit";
import mapStateReducer from "./mapstateReducer";

export default configureStore({
    reducer: mapStateReducer
})

