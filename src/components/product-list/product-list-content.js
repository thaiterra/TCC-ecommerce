import React from 'react';

import { Product } from '@/components/product-list/product';

import './product-list.css';

export const ProductListContent = ({ products, handleAddToCart }) => {
  return (
    <div className="product-list-container">
      <div className="products">
        {products &&
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </div>
  );
};
