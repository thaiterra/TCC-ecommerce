import React from 'react';
import { FaStar } from 'react-icons/fa6';

import Image from 'next/image';

import { Button } from '@/components/button';

import './product.css';

export const ProductCard = ({ product, addProductToCart }) => {
  const {
    title,
    price,
    image,
    rating: { rate },
  } = product;
  const parsedRate = Math.floor(rate);

  return (
    <div className="product-container">
      <div className="image-container">
        <Image
          className="product-image"
          src={image}
          alt={title}
          width={200}
          height={200}
          priority={false}
        />
      </div>
      <div className="data-container">
        <div className="title-container">
          <p className="product-title">{title}</p>
          <div className="rate-container">
            <div>
              {Array.from({ length: parsedRate }).map((_, index) => (
                <FaStar key={index} className="product-star" />
              ))}
            </div>
            <span className="product-rate">{rate}</span>
          </div>
        </div>
        <div className="footer-container">
          <p className="product-price">${price}</p>
          <Button variant="primary" size="small" onClick={addProductToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
