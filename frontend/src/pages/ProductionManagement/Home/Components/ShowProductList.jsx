import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import Swal from 'sweetalert2';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
function ShowProductList() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin-portal/product-management')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log('Error from ProductList');
        if (err.response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Unauthorized',
            text: err.response.data.message
          });
        } else if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Not Logged In',
            text: err.response.data.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong...',
            text: err.response.data.message
          });
        }
      });
  }, []);

  const productList =
    Products.length === 0
      ? 'There are no Products in the System!'
      : Products.map((product, k) => (
          <SwiperSlide>
            <ProductCard product={product} key={k} />
          </SwiperSlide>
        ));

  return (
    <div className="">
      <Swiper
        slidesPerView={4.2}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper w-[1600px]">
        {productList}
      </Swiper>
    </div>
  );
}

export default ShowProductList;
