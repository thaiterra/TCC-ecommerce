import React from 'react';

import { FaStore, FaPenAlt } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';

import { Button } from '@/components/button';

import './header.css';

export const HeaderContent = ({
  cartItems,
  user,
  handleCheckout,
  handleAuth,
  handleLogout,
  handleAccount,
}) => {
  return (
    <div className="header">
      <h1 className="header-title">
        <span className="header-title-icon">
          <FaStore />
        </span>
        Fast Buy
      </h1>
      <div className="header-actions">
        {user ? (
          <div className="header-authenticated">
            <p className="header-authenticated-name">{user.name}</p>
            <Button size="small" onClick={handleAccount}>
              <FaPenAlt />
            </Button>
            <Button size="small" variant="tertiary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={handleAuth}>
            Login
          </Button>
        )}
        <button className="header-cart" onClick={handleCheckout}>
          <BsCart3 />
          {cartItems.length > 0 && (
            <span className="header-cart-count">{cartItems.length}</span>
          )}
        </button>
      </div>
    </div>
  );
};
