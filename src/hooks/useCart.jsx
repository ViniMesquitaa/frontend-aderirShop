import { useState, useEffect } from 'react';

const CART_KEY = 'mw_sabao_cart_v2';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carrega do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          localStorage.removeItem(CART_KEY);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
    setIsInitialized(true);
  }, []);

  // Salva no localStorage sempre que o carrinho muda
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [cartItems, isInitialized]);

  // Atualiza quando muda em outra aba
  useEffect(() => {
    const syncCart = (e) => {
      if (e.key === CART_KEY) {
        const newCart = JSON.parse(e.newValue);
        if (Array.isArray(newCart)) {
          setCartItems(newCart);
        }
      }
    };

    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount: cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0),
  };
};
