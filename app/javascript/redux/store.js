import { configureStore } from "@reduxjs/toolkit";

import pokemonReducer from "./reducers/pokemonSlice";
import cartReducer from "./reducers/cartSlice";

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        cart: cartReducer
    },
    preloadedState: loadFromLocalStorage()
});

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;