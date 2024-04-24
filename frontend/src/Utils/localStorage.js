import { productApiSlice } from "../redux/api/productApiSlice";

export const getFavoritesFromLocalStorage = () =>{
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON?JSON.parse(favoritesJSON):[];

}
export const addFavoritetoLocalStorage =(product) =>{
    const favorites =getFavoritesFromLocalStorage();
    if(!favorites.some((p)=>p._id===product._id)){
        favorites.push(product);
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }
}
export const removeFavoritesfromLocalStorage=(productId)=>{
   const favorites =getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter((product)=>product._id !== productId );
    localStorage.setItem("favorites",JSON.stringify(updateFavorites))
}