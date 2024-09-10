
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define el tipo para los ítems del carrito
interface CartItem {
    productId: number; // O el tipo correspondiente
    quantity: number;
  }
  
  // Define el tipo para el estado del carrito
  interface CartState {
    items: CartItem[];
  }
  
  // Estado inicial tipado
  const initialState: CartState = {
    items: [],
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
    
  },
});


export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
