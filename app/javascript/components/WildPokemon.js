import styled from '@emotion/styled';
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchPokemon } from '../services/PokemonFetch';

const WildPokemon = ({ id }) => {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        const data = async () => {
            const response = await fetchPokemon(id)
            setPokemon(response);
        }
        data();
    }, []);

    return (
        <WildPokemonContainer>
            {pokemon.name && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
        </WildPokemonContainer>
    )
}

export default WildPokemon;

const WildPokemonContainer = styled.div`
    height: 100px;
    width: 100px;
    transform: rotate(180deg);
    transition: all 0.5s;

    img {
        height: 100%;
        width: 100%;
        object-fit: fill;
    }
`