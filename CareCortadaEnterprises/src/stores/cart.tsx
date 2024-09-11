
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define el tipo para los ítems del carrito
interface CartItem {
    productId: number; // O el tipo correspondiente
    quantity: number;
  }
  
  // Define el tipo para el estado del carrito
  interface CartState {
    items: CartItem[];
    statusTab: boolean;
  }
  
  // Estado inicial tipado
  const initialState: CartState = {
    items: [],
    statusTab: false,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const indexProductId = (state.items).findIndex((item) => item.productId === productId);
        if (indexProductId >= 0) {
            state.items[indexProductId].quantity += quantity;
            return; 
        }else {
            state.items.push({ productId, quantity });
        }
      
    },

    changeQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
        const { productId, quantity } = action.payload;
        const indexProductId = (state.items).findIndex((item) => item.productId === productId);
        if (quantity > 0) {
            state.items[indexProductId].quantity = quantity;
        }else {
            state.items = state.items.filter((item) => item.productId !== productId);
        }
    },

    toggleStatusTab(state) {
        if (state.statusTab === false) {
            state.statusTab = true;
        }else {
            state.statusTab = false;
        }
    },
    
  },
});


export const { addToCart, changeQuantity, toggleStatusTab} = cartSlice.actions;
export default cartSlice.reducer;
