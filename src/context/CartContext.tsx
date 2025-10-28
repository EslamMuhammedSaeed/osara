import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string[];
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (cartItem: CartItem) => void;
  updateQuantity: (cartItem: CartItem, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "osara-shopping-cart";

// Helper function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Validate that it's an array
      if (Array.isArray(parsed)) {
        console.log("✅ Cart loaded from localStorage:", parsed);
        return parsed;
      }
    }
  } catch (error) {
    console.error("❌ Error loading cart from localStorage:", error);
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    console.log("💾 Cart saved to localStorage:", cart);
  } catch (error) {
    console.error("❌ Error saving cart to localStorage:", error);
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state with data from localStorage using lazy initialization
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadCartFromStorage();
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Mark as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes (but skip first render)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isInitialized]);

  // Sync cart across browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const updatedCart = JSON.parse(e.newValue);
          if (Array.isArray(updatedCart)) {
            console.log("🔄 Cart synced from another tab");
            setCartItems(updatedCart);
          }
        } catch (error) {
          console.error("❌ Error syncing cart from another tab:", error);
        }
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addToCart = (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    // console.log("item5", item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) =>
          i.id === item.id &&
          i.color?.every((color) => item.color?.includes(color)) &&
          i.size === item.size
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((i) =>
          i.id === item.id &&
          i.color?.every((color) => item.color?.includes(color)) &&
          i.size === item.size
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    // console.log("removeFromCart", id,);
    setCartItems((prevItems) => {
      return prevItems.filter(
        (item) =>
          item.id !== cartItem.id ||
          !item.color?.every((color) => cartItem.color?.includes(color)) ||
          item.size !== cartItem.size
      );
    });
  };

  const updateQuantity = (cartItem: CartItem, quantity: number) => {
    console.log("updateQuantity", cartItem, quantity);
    if (quantity <= 0) {
      removeFromCart(cartItem);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItem.id &&
        item.color?.every((color) => cartItem.color?.includes(color)) &&
        item.size === cartItem.size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
