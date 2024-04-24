import React from 'react'
import Header from './components/Header.jsx'
import { useGetTopProductsQuery } from './redux/api/productApiSlice.js'
import Loader from './components/Loader.jsx'
import Message from "./components/Message.jsx"
import {Link,useParams} from 'react-router-dom'
import TopProduct from './pages/Products/TopProduct.jsx'

const Home = () => {
    const {keyword} = useParams();
    const {data,isLoading,error} =  useGetTopProductsQuery();
    // console.log(data);
  return (
    <>
    <div className='bg-gradient-to-br from-black to-gray-500 '>
    {!keyword? <Header/> :null}
    {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.error}
        </Message>
      ) : (       
        <div className='justify-center ml-[4%]'>
        <div className='text-[2rem] text-white ml-[2.5%] py-4'>Top Products</div>
        <div className="md:grid grid-cols-2 gap-[2%] lg:grid-cols-3 sm:grid grid-cols-1">
        {data.map((product) => (
          <div key={product._id}>
            <TopProduct product={product} />
          </div>
        )
        )}
      </div>
      </div>
      
      )}
    </div>
    </>
    
  )
}

export default Home