import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/UI/Header";
import { useSelector } from "react-redux";
import { PokemonItemCart } from "../components/PokemonCard";
import { HeadingMedium, Title } from "../components/UI/Text";
import { colorTypes } from "../helpers/colorTypes";
import { IconTypes } from "../components/IconTypes";
import { ButtonContainer } from "../components/UI/Container";
import { Link } from "react-router-dom";
import { Button } from "../components/UI/Button";

const Pokemon = () => {
    const pokemonStore = useSelector(state => state.pokemon).catched;
    const [filterPokemon, setFilterPokemon] = useState([]);

    useEffect(() => {
        let types = [];
        let filteredPokemon = {};
        pokemonStore.forEach(pokemon => {
            types.push(pokemon.types[0].type.name);
        });
        types = types.filter((type, index, self) => self.indexOf(type) === index);
        types.forEach(type => {
            filteredPokemon[type] = pokemonStore.filter(pokemon => pokemon.types[0].type.name === type).sort((a, b) => a.name.localeCompare(b.name));
        });
        setFilterPokemon(filteredPokemon);
    }, []);

    return (
        <>
            <Header>
                <Title>Your Pokemon</Title>
                <ButtonContainer>
                    <Link to={"/world"}>
                    <Button>WORLD</Button>
                    </Link>
                    <Link to={"/cart"}>
                    <Button>CART</Button>
                    </Link>
                </ButtonContainer>
            </Header>
            <PokemonList>
                {Object.keys(filterPokemon).map((type) => (
                    <TypeList color={type}>
                        <div className="type-title">
                            <IconTypes type={type} />
                            <HeadingMedium>{type}</HeadingMedium>
                        </div>
                        
                        <CardList>
                        {filterPokemon[type].map((poke, index) =>
                            poke.types[0].type.name === type && (
                                <PokemonItemCart pokemon={poke} key={index} />
                            )
                        )}
                        </CardList>
                    </TypeList>
                ))}
            </PokemonList>
        </>
    );
};

export default Pokemon;

const PokemonList = styled.div`
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: 20px;
    background-color: #43b2a7;
`;

const TypeList = styled.div`
    width: 100%;

    .type-title {
        width: 100%;
        background-color: ${props => props.color && colorTypes(props.color)};
        text-transform: capitalize;
        color: #fff;
        border-radius: 10px;
        padding: 0 30px;
        height: 40px;
        display: flex;
        align-items: center;
        gap: 10px;

        svg {
            height: 70%;
            width: auto;
        }
    }
`;

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
    width: 100%;
    padding: 20px 0;
`;