import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../Loader/loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
          refetch();
          toast.success("Review created successfully");
        } catch (error) {
          toast.error(error?.data || error.message);
        }
      };
      const addToCartHandler = () => {
        console.log("hello");
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
      };
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-500 min-h-screen xl:ml-[4%]">
        <Link to="/" className="text-white hover:underline ">
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
<div className="flex items-between h-[90vh] mt-[2rem] mx-[5%] gap-5  flex-col md:flex-row">

              <div className="h-[50vh]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] md:h-[65vh] h-[50vh] "
                />
              </div>
              <div className="flex flex-col justify-between ">
                <h2 className="text-2xl text-white font-semibold font-serif">
                  {product.name}
                </h2>
                <p className="mt-[4rem] md:w-[45rem] text-gray-300">
                  {product.description}
                </p>
                <p className="text-6xl font-semibold text-white my-[2rem] ">
                  $ {product.price}
                </p>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-white gap-2">
                      <FaStore className="text-gray-300" />
                      Brand : {product.brand}
                    </div>
                    <div className="flex items-center text-white gap-2">
                      <FaClock className="text-gray-300" />
                      Added : {moment(product.createdAt).fromNow()}
                    </div>
                    <div className="flex items-center text-white gap-2">
                      <FaStar className="text-gray-300" />
                      Reviews : {product.numReviews}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-white gap-2">
                      <FaStore className="text-gray-300" />
                      Ratings : {rating}
                    </div>
                    <div className="flex items-center text-white gap-2">
                      <FaShoppingCart className="text-gray-300" />
                      Quantity: {product.quantity}
                    </div>
                    <div className="flex items-center text-white gap-2">
                      <FaBox className="text-gray-300" />
                      In Stock : {product.countInStock}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setqty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button  onClick={addToCartHandler}  className="bg-pink-500 rounded-xl p-2 m-2 text-gray-200 hover:bg-pink-700" >Add to Cart</button>

              </div>

              </div>
              </div>
              <div className="mt-[3rem] flex flex-wrap items-center justify-between ">

                    <ProductTabs
                    loadingProductReview ={loadingProductReview}
                    userInfo={userInfo}
                    submitHandler = {submitHandler}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    product={product}
                    />
                </div>
         

          </>

        )}
    </div>
    </>
  );
};

export default ProductDetails;
