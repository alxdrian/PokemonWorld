import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    cart: {},
    step: 1,
    articuno: false,
    zapdos: false,
    moltres: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = uuidv4();
            state.cart[id] = action.payload;
        },
        removeFromCart: (state, action) => {
            state.cart[action.payload] = undefined;
            state.cart = Object.fromEntries(Object.entries(state.cart).filter(([key, value]) => value !== undefined));
        },
        deleteCart: (state, action) => {
            state.cart = {};
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        cartArticuno: (state, action) => {
            state.articuno = !state.articuno
        },
        cartZapdos: (state, action) => {
            state.zapdos = !state.zapdos
        },
        cartMoltres: (state, action) => {
            state.moltres = !state.moltres
        }
    }
});

export const { addToCart, removeFromCart, setStep, deleteCart, cartArticuno, cartMoltres, cartZapdos } = cartSlice.actions;

export default cartSlice.reducer;