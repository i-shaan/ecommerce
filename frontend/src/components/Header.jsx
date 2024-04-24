import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice.js";
import ProductCarousel from "../pages/Products/ProductCarousel";
import TopProduct from "../pages/Products/TopProduct.jsx";
import Loader from "./Loader";
import Cart2 from "../../public/Cartimg.jpg";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex bg-black h-auto ml-[4%] ">
        <div className="bg-gradient-to-br from-gray-900 to-gray-500  w-[70%] sm-[100%] flex flex-col justify-center h-auto ">
          <div className="text-white font-serif italic absolute  text-center">
            <div className="text-6xl">Urban</div>
            <div className="text-6xl">Cart</div>
          </div>
          <img src={Cart2} className="h-full object-cover" />
        </div>
       
        <ProductCarousel className='w-[40%]' />
      </div>
    </>
  );
};

export default Header;
