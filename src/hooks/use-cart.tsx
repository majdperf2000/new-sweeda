// hooks/use-cart.tsx
import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useEffect,
  } from 'react';
  import { Product } from '@/types'; // تأكد من وجود نوع المنتج الخاص بك
  
  interface CartItem extends Product {
    quantity: number;
  }
  
  interface CartState {
    items: CartItem[];
    discount: number;
  }
  
  interface CartContextType extends CartState {
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateItemQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    applyDiscount: (discountPercentage: number) => void;
    totalItems: number;
    subtotal: number;
    total: number;
    tax: number;
  }
  
  const CartContext = createContext<CartContextType | null>(null);
  
  type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'APPLY_DISCOUNT'; payload: number };
  
  function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                : item
            ),
          };
        }
        
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
        };
      }
  
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
  
      case 'UPDATE_ITEM':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(1, action.payload.quantity) }
              : item
          ),
        };
  
      case 'CLEAR_CART':
        return { items: [], discount: 0 };
  
      case 'APPLY_DISCOUNT':
        return {
          ...state,
          discount: Math.min(100, Math.max(0, action.payload)),
        };
  
      default:
        return state;
    }
  }
  
  const CART_STORAGE_KEY = 'cart_state';
  const TAX_RATE = 0.15; // 15% ضريبة
  
  export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 }, () => {
      if (typeof window === 'undefined') return { items: [], discount: 0 };
      
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : { items: [], discount: 0 };
    });
  
    // حفظ الحالة في localStorage عند التغيير
    useEffect(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }, [state]);
  
    // الحسابات المالية
    const { subtotal, totalItems, total, tax } = useMemo(() => {
      const subtotalCalc = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      
      const discountAmount = (subtotalCalc * state.discount) / 100;
      const taxAmount = (subtotalCalc - discountAmount) * TAX_RATE;
      const totalCalc = subtotalCalc - discountAmount + taxAmount;
  
      return {
        subtotal: Number(subtotalCalc.toFixed(2)),
        totalItems: state.items.reduce((acc, item) => acc + item.quantity, 0),
        tax: Number(taxAmount.toFixed(2)),
        total: Number(totalCalc.toFixed(2)),
      };
    }, [state.items, state.discount]);
  
    // الدوال المعالجة
    const addItem = useCallback((product: Product, quantity: number = 1) => {
      if (quantity < 1) throw new Error('الكمية يجب أن تكون على الأقل 1');
      dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    }, []);
  
    const removeItem = useCallback((productId: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    }, []);
  
    const updateItemQuantity = useCallback((productId: string, quantity: number) => {
      if (quantity < 1) throw new Error('الكمية يجب أن تكون على الأقل 1');
      dispatch({ type: 'UPDATE_ITEM', payload: { id: productId, quantity } });
    }, []);
  
    const clearCart = useCallback(() => {
      dispatch({ type: 'CLEAR_CART' });
    }, []);
  
    const applyDiscount = useCallback((discountPercentage: number) => {
      dispatch({ type: 'APPLY_DISCOUNT', payload: discountPercentage });
    }, []);
  
    const contextValue = useMemo(
      () => ({
        ...state,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        applyDiscount,
        subtotal,
        totalItems,
        total,
        tax,
      }),
      [state, addItem, removeItem, updateItemQuantity, clearCart, applyDiscount, subtotal, totalItems, total, tax]
    );
  
    return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    );
  }
  
  export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('يجب استخدام useCart داخل CartProvider');
    }
    return context;
  }