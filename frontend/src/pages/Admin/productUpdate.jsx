import React from 'react'

import {
 useUpdateProductMutation,useDeleteProductMutation
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { useGetProductByIdQuery } from '../../redux/api/productApiSlice';
import { useUploadProductImageMutation } from '../../redux/api/productApiSlice';
import AdminMenu from "./AdminList";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "react-toastify";
const productUpdate = () => {
    const params = useParams();
    const { data: categories = [] } = useFetchCategoriesQuery();
    const { data: productData } = useGetProductByIdQuery(params._id);
    const [image, setImage] = useState(productData?.image || "");
    const [name, setname] = useState(productData?.name || "");
    const [description, setdescription] = useState(
      productData?.description || ""
    );
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [price, setprice] = useState(productData?.price || "");
    const [category, setcategory] = useState(productData?.category || "");
    const [quantity, setquantity] = useState(productData?.quantity || "");
    const [brand, setbrand] = useState(productData?.brand || "");
    const [stock, setstock] = useState(productData?.countInStock|| 0);
    const [uploadProductImage] = useUploadProductImageMutation();


  console.log(name,description,price);
    // hook
    const navigate = useNavigate();
    useEffect(() => {
        if (productData && productData._id) {
          setname(productData.name);
          setdescription(productData.description);
          setprice(productData.price);
          setcategory(productData.category?._id);
          setquantity(productData.quantity);
          setbrand(productData.brand);
          setImage(productData.image);
          setstock(productData.countInStock);
        }
      }, [productData]);
      const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success("Item added successfully", {
            
            autoClose: 2000,
          });
          setImage(res.image);
        } catch (err) {
          toast.success("Item added successfully", {
           
            autoClose: 2000,
          });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("name", name);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("category", category);
          formData.append("quantity", quantity);
          formData.append("brand", brand);
          formData.append("countInStock", stock);
          const data = await updateProduct({ productId: params._id, formData });
    
          if (data?.error) {
            toast.error(data.error, {

              autoClose: 2000,
            });
          } else {
            toast.success(`Product successfully updated`, {
                 
              autoClose: 2000,
            });
            navigate("/admin/allproducts");
          }
        } catch (err) {
          console.log(err);
          toast.error("Product update failed. Try again.", {
       
            autoClose: 2000,
          });
        }
      };

    
      const handleDelete = async () => {
        try {
          let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
    
          const { data } = await deleteProduct(params._id);
          toast.success(`"${data.name}" is deleted`, {

            autoClose: 2000,
          });
          navigate("/admin/allproducts");
        } catch (err) {
          console.log(err);
          toast.error("Delete failed. Try again.", {

            autoClose: 2000,
          });
        }
      };

  return (

     <div className=" bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] px-[9rem] py-[1rem] ml-[4%]">


    
<div className="">

  <div className="flex flex-col flex-wrap">
    <div className="flex">
    <div className="text-white font-extrabold text-5xl mb-[3rem]">
      Create Product
    </div>
    <AdminMenu/>
    </div>

    {image && (
      <div className="text-center">
        <img
          src={image}
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
          value={price}
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
          className="mt-1 p-2 border-2 rounded w-[30rem] bg-blue-200 bg-blue-200  bg-sl hover:border-pink-500  focus:border-pink-500 outline-none"
          placeholder="Enter Stock Quantity"
          value={stock}
          
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
          value={category}

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
    
              <div className="flex mb-4 gap-8 justify-between">
              <button
                  onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-gradient-to-br from-purple-500 to-pink-400 ransform transition duration-300 hover:scale-105  w-[20vw]"
              >
                Update
              </button>
              <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-gradient-to-br from-purple-500 to-pink-400 ransform transition duration-300 hover:scale-105  w-[20vw]"
                >
                  Delete
                </button>
            </div>
  </div>
</div>


</div>


  )
}

export default productUpdate