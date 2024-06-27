import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/products';
import { CartContext } from '../contexts/cart';
import { ProductListContent } from './product-list-content';

export const ProductListData = () => {
  const products = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) return;
    setCart([...cart, product]);
  };

  return (
    <ProductListContent products={products} handleAddToCart={handleAddToCart} />
  );
};
