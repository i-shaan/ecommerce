import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import TopProduct from './TopProduct'
import Ratings from './Ratings'
import Loader from '../Loader/loader'
import { useAllProductsQuery} from '../../redux/api/productApiSlice'

const ProductTabs = ({loadingProductReview,userInfo,submitHandler,rating,setRating,comment,setComment,product}) => {
    const {data,isLoading} = useAllProductsQuery();
    const[active,setActive] = useState(1);
    if(isLoading){
        return <Loader/>;
    }
    const handleTabClick =(e)=>{
        setActive(e);
    }
    
  return (
    <>
    <div className='flex flex-col ml-[4%]'>
        <div className='flex gap-[5rem] mb-[2rem] '>
            <div className={`text-gray-100 cursor-pointer text-3xl  ${active===1? "font-bold underline" :""} `} onClick={()=> handleTabClick(1)}>
                Write Your Review
            </div>
            <div className={`text-gray-100 cursor-pointer text-3xl  ${active===2? "font-bold underline" :""} `} onClick={()=> handleTabClick(2)}>
                All reviews
            </div>
            
        </div>
        <section>
        {active === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {active === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

            <div className='grid grid-cols-2 gap-2'>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-400 p-4 rounded-lg  sm:ml-[0rem] xl:w-[40rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-black">{review.name}</strong>
                    <p className="text-black">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4 text-white">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>


    </div>
    <div className='flex flex-col gap-3 '>

           <h2 className="text-4xl text-white my-5 font-semibold ml-[4%] ">Related Products</h2>    
           
    <section className=" flex flex-wrap">
      {!data ? (
        <Loader />
      ) : (
 
        data.map((product) => (
            <div key={product._id}>
              <TopProduct product={product} />
            </div>
        ))
      )}
    </section>


    </div>
    </>
  )
}

export default ProductTabs