import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    cart: {},
    step: 1
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("Adding to cart");
            const id = uuidv4();
            state.cart[id] = action.payload;
        },
        removeFromCart: (state, action) => {
            state.cart[action.payload] = undefined;
            state.cart = Object.fromEntries(Object.entries(state.cart).filter(([key, value]) => value !== undefined));
        },
        setStep: (state, action) => {
            state.step = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, setStep } = cartSlice.actions;

export default cartSlice.reducer;