import React from 'react'
import { Link } from "react-router-dom";

import HeartIcon from './HeartIcon';
const TopProduct = ({product}) => {
    
 
    return (
        <div className="w-[25rem] ml-[2rem] h-[25rem] p-3 ">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-[20rem] w-[25rem] rounded"
            />
            <HeartIcon product={product} />
          </div>
    
          <div className="p-4">
            <Link to={`/product/${product._id}`}>
              <h2 className="flex justify-between items-center">
                <div className='text-white'>{product.name}</div>
                <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                  ${product.price}
                </span>
              </h2>
            </Link>
          </div>
        </div>
      );
}

export default TopProduct