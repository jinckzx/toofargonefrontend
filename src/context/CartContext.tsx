// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   size: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string, size: string) => void;
//   updateQuantity: (id: string, size: string, quantity: number) => void;
//   getTotalItems: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const CART_STORAGE_KEY = 'shopping_cart';

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem(CART_STORAGE_KEY);
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (newItem: CartItem) => {
//     setCartItems(prev => {
//       const existingItemIndex = prev.findIndex(
//         item => item.id === newItem.id && item.size === newItem.size
//       );
      
//       if (existingItemIndex >= 0) {
//         const updatedItems = [...prev];
//         updatedItems[existingItemIndex] = {
//           ...prev[existingItemIndex],
//           quantity: prev[existingItemIndex].quantity + newItem.quantity
//         };
//         return updatedItems;
//       }
      
//       return [...prev, newItem];
//     });
//   };

//   const removeFromCart = (id: string, size: string) => {
//     setCartItems(prev => 
//       prev.filter(item => !(item.id === id && item.size === size))
//     );
//   };

//   const updateQuantity = (id: string, size: string, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(id, size);
//       return;
//     }
    
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id && item.size === size ? { ...item, quantity } : item
//       )
//     );
//   };

//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider value={{ 
//       cartItems, 
//       addToCart, 
//       removeFromCart, 
//       updateQuantity,
//       getTotalItems 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...prev[existingItemIndex],
          quantity: prev[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      }
      
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prev => 
      prev.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getTotalItems,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}