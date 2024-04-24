import React from "react";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import AdminMenu from "./AdminList";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [brand, setbrand] = useState("");
  const [stock, setstock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [uploadProdImg] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProdImg(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className=" bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] px-[9rem] py-[1rem] ml-[4%]">


    
        <div className="">

          <div className="flex flex-col flex-wrap">
            <div className="flex">
            <div className="text-white font-extrabold text-5xl mb-[3rem]">
              Create Product
            </div>
            <AdminMenu/>
            </div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}
            <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-10 hover:bg-purple-300 hover:text-black transition delay-300">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}

                className={!image ? "hidden" : "text-white"} 
                
              />
            </label>
          </div>
            <div className="flex mb-4 gap-8 justify-between ">

              <div className="">
                <label
                  htmlFor="name"
                  className="block text-m font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border-2 rounded w-[30rem] bg-blue-200   bg-sl hover:border-pink-500   focus:border-pink-500 outline-none"
                  placeholder="Enter name of the product"
                  value={name}
                  required
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="">
                <label
                  htmlFor="price"
                  className="block text-m font-medium text-white "
                >
                  Price
                </label>
                <input
                  type="number"
                  id="name"
                  className="mt-1 p-2 border-2 rounded w-[30rem] bg-blue-200    bg-sl hover:border-pink-500 focus:border-pink-500 outline-none"
                  placeholder="Enter Price"
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mb-4 gap-8 justify-between">
              <div className="">
                <label
                  htmlFor="quantity"
                  className="block text-m font-medium text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="mt-1 p-2 border-2 rounded w-[30rem] bg-blue-200   bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
                  placeholder="Enter Quantity"
                  value={quantity}
                  required
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-m font-medium text-white "
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="mt-1 p-2 border-2 rounded w-[30rem] bg-blue-200  bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
                  placeholder="Enter Brand"
                  value={brand}
                  required
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="description"
                className="block text-m font-medium text-white "
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                className="mt-1 p-2 border-2 rounded w-[50vw] bg-blue-200  lg:w-[100%] h-[10vh] bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
                placeholder="Enter description"
                value={description}
                required
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="flex mb-4 gap-8 justify-between">
              <div>
                <label
                  htmlFor="instock"
                  className="block text-m font-medium text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="instock"
                  className="mt-1 p-2 border-2 rounded w-[30rem]bg-blue-200 bg-blue-200  bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
                  placeholder="Enter Stock Quantity"
                  value={stock}
                  required
                  onChange={(e) => setstock(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-m font-medium text-white "
                >
                  Category
                </label>
                <select
                  id="brand"
                  className="mt-1 p-2 border-2 rounded w-[30rem] h-[2.7rem] bg-blue-200  bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
                  placeholder="Choose Category"
                  onChange={(e) => setcategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                  onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-gradient-to-br from-purple-500 to-pink-400 ransform transition duration-300 hover:scale-105  w-[20vw]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
 
   
      </div>
    </>
  );
};

export default ProductList;
