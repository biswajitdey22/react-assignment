import React, { createContext, useContext, useReducer, useState } from 'react';
import { cartReducer, initialCartState } from './cartReducer';
import { PRODUCTS, GST_RATE } from '../productsData';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 2999;

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [toast, setToast] = useState(null);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeView, setActiveView] = useState('shop'); // 'shop' (catalog) or 'cart' (dedicated cart page)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // 40 Hardcoded Football Products
  const products = PRODUCTS;

  const navigateToCart = () => {
    setActiveView('cart');
    setIsCartDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = () => {
    setActiveView('shop');
    setIsCartDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3200);
  };

  // Financial calculations
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountPercent = state.appliedCoupon ? state.appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = Math.round(discountedSubtotal * GST_RATE);
  const grandTotal = discountedSubtotal + gstAmount;

  const totalItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping meter
  const isFreeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Cart Helper Action Dispatchers
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    triggerToast(`Added ${product.name} to cart!`, 'success');
  };

  const addWithQty = (product, quantity) => {
    dispatch({ type: 'ADD_WITH_QTY', payload: { product, quantity } });
    triggerToast(`Added ${quantity} × ${product.name} to cart!`, 'success');
  };

  const removeItem = (id, name = 'Item') => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    triggerToast(`Removed ${name} from cart`, 'warn');
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const applyCoupon = (couponObj) => {
    dispatch({ type: 'APPLY_COUPON', payload: couponObj });
    triggerToast(`Coupon ${couponObj.code} applied (${couponObj.discountPercent}% OFF)`, 'success');
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    triggerToast('Coupon removed', 'info');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    triggerToast('Cart cleared', 'info');
  };

  // Wishlist Action Dispatchers
  const toggleWishlist = (product) => {
    const isSaved = state.wishlist.some((item) => item.id === product.id);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    if (isSaved) {
      triggerToast(`Removed from Wishlist`, 'info');
    } else {
      triggerToast(`Saved ${product.name} to Wishlist ❤️`, 'success');
    }
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { id } });
    triggerToast('Removed from Wishlist', 'info');
  };

  const moveToCart = (product) => {
    dispatch({ type: 'MOVE_TO_CART', payload: product });
    triggerToast(`Moved ${product.name} to Cart 🛒`, 'success');
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    triggerToast('Wishlist cleared', 'info');
  };

  // Quick View Modal
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const processCheckout = () => {
    if (state.items.length === 0) return;

    const receipt = {
      orderId: `STRIKER-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      items: [...state.items],
      subtotal,
      discountPercent,
      discountAmount,
      taxableSubtotal: discountedSubtotal,
      cgst: Math.round(gstAmount / 2),
      sgst: Math.round(gstAmount / 2),
      gstAmount,
      grandTotal,
      couponCode: state.appliedCoupon ? state.appliedCoupon.code : null,
      freeShipping: isFreeShippingUnlocked
    };

    setOrderReceipt(receipt);
    dispatch({ type: 'CLEAR_CART' });
    triggerToast(`⚽ Order ${receipt.orderId} placed successfully!`, 'success');
  };

  const closeReceiptModal = () => {
    setOrderReceipt(null);
  };

  return (
    <CartContext.Provider
      value={{
        // 160 Hardcoded Football Products
        products,

        // Cart State & Calculations
        items: state.items,
        wishlist: state.wishlist,
        appliedCoupon: state.appliedCoupon,
        subtotal,
        discountPercent,
        discountAmount,
        discountedSubtotal,
        gstAmount,
        grandTotal,
        totalItemCount,
        toast,
        triggerToast,
        orderReceipt,
        processCheckout,
        closeReceiptModal,
        addToCart,
        addWithQty,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,

        // Free Shipping
        FREE_SHIPPING_THRESHOLD,
        isFreeShippingUnlocked,
        amountForFreeShipping,
        freeShippingProgress,

        // Wishlist
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        // Navigation & Views (Cart outside of main page)
        activeView,
        setActiveView,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        navigateToCart,
        navigateToShop,
        openCartDrawer,
        closeCartDrawer,

        // Quick View
        quickViewProduct,
        openQuickView,
        closeQuickView
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
