import axios from "axios";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

export const fetchLocations = async () => {
    return axios("/region/1", {
        method: "GET",
    })
    .then(res => {
        return res.data.locations
    })
    .catch(err => {
        console.log(err);
    });
}

export const fetchLocation = async (id) => {
    return axios(`/location/${id}`, {
        method: "GET",
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    });
}