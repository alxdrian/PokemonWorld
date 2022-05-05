import axios from "axios";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (id) => {
    return axios(`/pokemon/${id}`, {
        method: "GET",
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    });
};
