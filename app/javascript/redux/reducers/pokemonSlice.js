import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    catched: [],
    water: 0,
    fire: 0,
    electric: 0,
    articuno: false,
    zapdos: false,
    moltres: false,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addPokemon: (state, action) => {
            state.catched = [...state.catched, action.payload]
        },
        addWater: (state, action) => {
            state.water +=1
        },
        addFire: (state, action) => {
            state.fire +=1
        },
        addElectric: (state, action) => {
            state.electric += 1
        },
        setArticuno: (state, action) => {
            state.articuno = true
        },
        setZapdos: (state, action) => {
            state.zapdos = true
        },
        setMoltres: (state, action) => {
            state.moltres = true
        }
    }
});

export const { addPokemon, addWater, addFire, addElectric, setArticuno, setMoltres, setZapdos } = pokemonSlice.actions;

export default pokemonSlice.reducer;