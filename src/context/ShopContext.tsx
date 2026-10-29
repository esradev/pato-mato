import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, PRODUCTS } from '../data/products';

export type PageType =
  | 'home'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'size-guide'
  | 'tracking'
  | 'wishlist'
  | 'about'
  | 'contact';

interface ShopContextType {
  currentPage: PageType;
  selectedCategorySlug: string;
  selectedProductId: string;
  navigateTo: (page: PageType, params?: { categorySlug?: string; productId?: string }) => void;
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorId: string) => void;
  updateCartQuantity: (productId: string, colorId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  finalCartTotal: number;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lastCompletedOrder: any | null;
  setLastCompletedOrder: (order: any) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('pm-101');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<any | null>(null);

  // Initialize cart from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('petometo_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial cart item for rich e-commerce feel
    const defaultProduct = PRODUCTS[0];
    return [
      {
        product: defaultProduct,
        selectedColor: defaultProduct.colors[0],
        quantity: 1,
      },
    ];
  });

  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('petometo_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return ['pm-102', 'pm-103'];
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('petometo_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('petometo_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      // ignore
    }
  }, [wishlist]);

  // URL Hash Synchronizer for zero modals & bookmarkable dedicated views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
      } else if (hash.startsWith('category/')) {
        const cat = hash.split('/')[1] || 'all';
        setSelectedCategorySlug(cat);
        setCurrentPage('category');
      } else if (hash === 'category' || hash === 'shop') {
        setSelectedCategorySlug('all');
        setCurrentPage('category');
      } else if (hash.startsWith('product/')) {
        const pId = hash.split('/')[1] || 'pm-101';
        setSelectedProductId(pId);
        setCurrentPage('product');
      } else if (hash === 'cart') {
        setCurrentPage('cart');
      } else if (hash === 'checkout') {
        setCurrentPage('checkout');
      } else if (hash === 'size-guide') {
        setCurrentPage('size-guide');
      } else if (hash === 'tracking') {
        setCurrentPage('tracking');
      } else if (hash === 'wishlist') {
        setCurrentPage('wishlist');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType, params?: { categorySlug?: string; productId?: string }) => {
    setIsMenuOpen(false);
    if (page === 'category' && params?.categorySlug) {
      setSelectedCategorySlug(params.categorySlug);
      window.location.hash = `#/category/${params.categorySlug}`;
    } else if (page === 'product' && params?.productId) {
      setSelectedProductId(params.productId);
      window.location.hash = `#/product/${params.productId}`;
    } else if (page === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${page}`;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, color?: ProductColor, quantity: number = 1) => {
    const chosenColor = color || product.colors[0];
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.id === chosenColor.id
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedColor: chosenColor, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, colorId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.id === colorId)
      )
    );
  };

  const updateCartQuantity = (productId: string, colorId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor.id === colorId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PATOMATO15' || clean === 'پتومتو') {
      setCouponCode(clean);
      setCouponDiscount(0.15); // 15% discount
      return true;
    } else if (clean === 'TRAVEL20') {
      setCouponCode(clean);
      setCouponDiscount(0.2); // 20% discount
      return true;
    }
    return false;
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const effectivePrice = item.product.discountPrice ?? item.product.price;
    return sum + effectivePrice * item.quantity;
  }, 0);

  const finalCartTotal = Math.max(0, Math.round(cartSubtotal * (1 - couponDiscount)));

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedCategorySlug,
        selectedProductId,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        couponCode,
        couponDiscount,
        applyCoupon,
        finalCartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isMenuOpen,
        setIsMenuOpen,
        searchQuery,
        setSearchQuery,
        lastCompletedOrder,
        setLastCompletedOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
