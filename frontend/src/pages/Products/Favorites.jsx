import React from 'react';
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlicE";
import TopProduct from './TopProduct';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-500 min-h-screen xl:ml-[4%]">
      {/* Apply background color to entire screen */}
      <h1 className="font-bold ml-[2rem] text-white p-3 text-5xl">Favorite Products</h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <TopProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
