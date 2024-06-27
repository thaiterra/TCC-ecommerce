import { createContext, useEffect, useState } from 'react';

import { getProducts } from '@/server';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
