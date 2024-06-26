import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import favoritesReducer from "./features/favorites/favoriteSlicE.js"
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartSliceReducer from "./features/cart/cartSlice";

const initialFavorites = getFavoritesFromLocalStorage() || []
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
        cart:cartSliceReducer,
    },
    preloadedState:{
        favorites:initialFavorites
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});
setupListeners(store.dispatch);
export default store;