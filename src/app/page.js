'use client';

import React, { useEffect, useState } from 'react';

import { CartModal, AuthModal } from '@/components/modals';
import { Header } from '@/components/header';
import { ProductList } from '@/components/product-list';

import { ProductsProvider } from '@/components/contexts/products';
import { CartProvider } from '@/components/contexts/cart';
import { UserProvider } from '@/components/contexts/user';

import './page.css';
import { AccountModal } from '@/components/modals/account';

const Home = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    window.location.reload();
  };

  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <main className="container">
            <Header
              setIsCheckout={setIsCheckout}
              setShowAuthModal={setShowAuthModal}
              setShowAccountModal={setShowAccountModal}
              logout={logout}
            />
            {isCheckout && <CartModal setIsCheckout={setIsCheckout} />}
            {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
            {showAccountModal && (
              <AccountModal setShowAccountModal={setShowAccountModal} />
            )}
            <ProductList />
          </main>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default Home;
