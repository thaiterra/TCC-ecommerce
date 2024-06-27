import React, { useContext } from 'react';

import { CartModalContent } from './cart-modal-content';
import { CartContext } from '@/components/contexts/cart';

export const CartModalData = ({ setIsCheckout }) => {
  const { cart, setCart } = useContext(CartContext);

  const getCartSubtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handleDeleteCartItem = (id) => () => {
    setCart((oldItems) => oldItems.filter((item) => item.id !== id));
  };

  const handleBuy = () => {
    if (!cart.length) {
      alert('Your cart is empty');
      return;
    }

    const isAuthenticated = Boolean(localStorage.getItem('authenticated'));

    if (!isAuthenticated) {
      alert('You need to be authenticated to buy');
      return;
    }

    alert('Bought!');
    setCart([]);
    setIsCheckout(false);
  };

  return (
    <CartModalContent
      setIsCheckout={setIsCheckout}
      cartItems={cart}
      handleDeleteCartItem={handleDeleteCartItem}
      cartSubtotal={getCartSubtotal}
      handleBuy={handleBuy}
    />
  );
};
