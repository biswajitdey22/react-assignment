// Pure Reducer for Assignment 5 Shopping Cart & Wishlist

export const initialCartState = {
  items: [],
  wishlist: [],
  appliedCoupon: null // { code, discountPercent }
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1
        };
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    }

    case 'ADD_WITH_QTY': {
      const { product, quantity } = action.payload;
      const addQty = Math.max(1, Number(quantity) || 1);
      const existingIndex = state.items.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + addQty
        };
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...product, quantity: addQty }]
        };
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id)
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) } : item
        )
      };
    }

    case 'APPLY_COUPON': {
      return {
        ...state,
        appliedCoupon: action.payload
      };
    }

    case 'REMOVE_COUPON': {
      return {
        ...state,
        appliedCoupon: null
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        appliedCoupon: null
      };
    }

    // Wishlist actions
    case 'TOGGLE_WISHLIST': {
      const product = action.payload;
      const exists = state.wishlist.some((item) => item.id === product.id);
      if (exists) {
        return {
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== product.id)
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, product]
        };
      }
    }

    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload.id)
      };
    }

    case 'MOVE_TO_CART': {
      const product = action.payload;
      const filteredWishlist = state.wishlist.filter((item) => item.id !== product.id);
      const existingIndex = state.items.findIndex((item) => item.id === product.id);
      let updatedItems;

      if (existingIndex > -1) {
        updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1
        };
      } else {
        updatedItems = [...state.items, { ...product, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        wishlist: filteredWishlist
      };
    }

    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        wishlist: []
      };
    }

    default:
      return state;
  }
};
