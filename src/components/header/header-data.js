import React, { useContext } from 'react';

import { HeaderContent } from './header-content';
import { CartContext } from '../contexts/cart';
import { UserContext } from '../contexts/user';

export const HeaderData = ({
  setShowAccountModal,
  setIsCheckout,
  setShowAuthModal,
  logout,
}) => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleCheckout = () => setIsCheckout(true);
  const handleAuth = () => setShowAuthModal(true);
  const handleLogout = () => logout();
  const handleAccount = () => setShowAccountModal(true);

  return (
    <HeaderContent
      handleCheckout={handleCheckout}
      handleAuth={handleAuth}
      handleLogout={handleLogout}
      handleAccount={handleAccount}
      cartItems={cart}
      user={user}
    />
  );
};
