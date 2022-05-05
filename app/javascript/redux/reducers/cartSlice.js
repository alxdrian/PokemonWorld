import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    cart: [],
    step: 1
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("Adding to cart");
            state.cart = [...state.cart, { id: uuidv4(), pokemon: action.payload }];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        setStep: (state, action) => {
            state.step = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, setStep } = cartSlice.actions;

export default cartSlice.reducer;