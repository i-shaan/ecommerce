import React from 'react'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa';
const FavoritesCount = () => {
    const favorites = useSelector(state=>state.favorites);
    const favoritesCount = favorites.length;
  return (
    <div className='absolute left-8 '>


        {favoritesCount > 0 && (
            <span className='rounded-full px-1 py-0 text-sm text-white bg-pink-500'>{favoritesCount}</span>
        )

        }
        </div>
  )
}
  


export default FavoritesCount