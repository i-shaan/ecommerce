import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "./redux/features/cart/cartSlice";
import { removeFromCart } from "./redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div className="md:ml-[4%] bg-gradient-to-br from-gray-900 to-gray-500 h-[100%]">
      {cartItems.length === 0 ? (
        <div className="text-white">Your cart is empty , go to shop</div>
      ) : (
        <>
        
        <div className="p-[3%] flex flex-col gap-4 ">
            <div className="text-white flex   text-4xl font-semibold mb-2 gap-3">
              <FaShoppingCart />
              <div className="">Your Cart ({cartItems.length})</div>
            </div>
            {cartItems.map((item) => (
              <div key={item._id} className="flex w-[40rem] h-[15rem]  border-2 border-white justify-between pr-2 bg-gradient-to-br from-gray-900 to-gray-500 ">
                <div className="">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white justify-center w-[40%] flex flex-col gap-2  ">
                  <div className="font-semibold text-2xl">{item.name}</div>
                  <div className="text-gray-300">{item.brand}</div>
                  {item.countInStock < 5 ? (
                    <>
                      <div className="text-red-500">
                        Hurry only {item.countInStock} left
                      </div>
                      <div className="flex justify-between">
                      <div className="text-white text-semibold text-2xl">
                        $ {item.price}
                      </div>
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                          className="p-2 w-[4rem] rounded-lg text-black"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      </div>
                     
                    </>
                  ) : (
                    <> 
                                          <div className="text-green-500">
                        In stock
                      </div>
                      <div key={item._id} className="flex justify-between">
                        <div className="text-white text-semibold text-2xl">
                          $ {item.price}
                        </div>
                        <div className="two">
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                            className="p-2 w-[4rem] rounded-lg text-black"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        
          <div className="mt-8 w-[40rem] px-[3%]">
                <div className="p-4 rounded-lg">
                  <h2 className=" mb-2 text-white text-4xl font-semibold">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold text-white">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg "
                    disabled={cartItems.length === 0}
                    // onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
         
       
        

        </>
      )}
    </div>
  );
};

export default Cart;
