import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const filteredProducts = products.slice(0, 4);
  return (
    <div className="lg:block xl:block md:block relative h-[40rem]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[vw] lg:w-[40rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {filteredProducts.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
           
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="relative">
                <div className="absolute top-[50%]  text-white p-2">
                  {/* Display text above the image */}
                  
                </div>
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover h-[40rem]"
                />
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
