import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/button';

import { TfiClose, TfiTrash } from 'react-icons/tfi';

import './cart-modal.css';

export const CartModalContent = ({
  setIsCheckout,
  cartItems,
  handleDeleteCartItem,
  cartSubtotal,
  handleBuy,
}) => {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Cart</h2>
          <button
            className="modal-close-icon"
            onClick={() => setIsCheckout(false)}
          >
            <TfiClose />
          </button>
        </div>
        <div className="modal-body">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="cart-item-image"
                />
                <p>{item.title}</p>
                <p className="cart-product-price">$ {item.price}</p>
                <button
                  className="delete-icon"
                  onClick={handleDeleteCartItem(item.id)}
                >
                  <TfiTrash />
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="modal-footer">
          <p className="subtotal">
            Subtotal: <span className="subtotal-value"> ${cartSubtotal}</span>
          </p>
          <Button variant="primary" onClick={handleBuy}>
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};
