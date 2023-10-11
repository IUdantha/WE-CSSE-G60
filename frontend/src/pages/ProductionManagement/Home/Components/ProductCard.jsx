import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
const ProductCard = (props) => {
  const product = props.product;

  return (
    <div className="">
      <div className="bg-white rounded-2xl w-[350px] h-[350px]">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-[270px] rounded-t-2xl items-center object-cover"
        />
        <div className="flex felx-row justify-between items-center p-4">
          <div className="flex flex-col">
            <h1>
              <Link to={`/product-management/single-product/${product._id}`}>
                <strong>
                  {product.productName}({product.weight})
                </strong>
              </Link>
            </h1>
            <p>{product.productCode}</p>
          </div>
          <div className="">
            <Link to={`/product-management/single-product/${product._id}`}>
              <button className="btn btn-accent text-white">
                <p>View More</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
