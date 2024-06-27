'use client';
import { ProductCard } from './product-content';

export const ProductData = ({ product, handleAddToCart }) => {
  const addProductToCart = () => handleAddToCart(product);

  return <ProductCard product={product} addProductToCart={addProductToCart} />;
};
