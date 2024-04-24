import React from "react";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import AdminMenu from "./AdminList";
const AllProduct = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  const productCount = products?.length ?? "No";

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-500 h-full pl-[6%] pt-[3%] pb-[2%] pr-[2%]">
        <AdminMenu/>
      <div className="flex flex-col">
        <div className="text-5xl text-white font-bold mb-[2rem]">
          All products ({productCount})
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4 w-full">
          {products.map((product) => (
            <div
              key={product._id}
              className="h-[30vh] bg-gray-800   text-white "
            >
              <button
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block overflow-hidden"
              >
                <div className="flex">
                  <div>
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="h-[30vh] w-[20rem] object-cover"
                    />
                  </div>

                  <div className="flex flex-col text-start px-[1rem] py-[2rem] gap-2">
                    <div>{product.name}</div>
                    <div className="text-gray-400 text-xs">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </div>
                    <div className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {product?.description?.substring(0, 160)}...
                    </div>
                    <div className=" text-gray-400 flex justify-between text-start ">
                      <div>
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex  px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                      <div className="text-white">Price : ${product.price}</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
