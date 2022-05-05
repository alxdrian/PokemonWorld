import styled from '@emotion/styled';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemon } from '../services/PokemonFetch';
import { ContentRegular, HeadingMedium, HeadingSmall } from "./UI/Text";
import { colorTypes } from "../helpers/colorTypes";
import { IconTypes } from './IconTypes';
import { ButtonContainer } from './UI/Container';
import { Button, IconButton } from './UI/Button';
import { PokeBallIcon, TrashIcon } from './UI/Icon';
import { addToCart, removeFromCart } from '../redux/reducers/cartSlice';

export const PokemonEncounterCard = ({ id, setWildPokemon }) => {
    const [pokemon, setPokemon] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const data = async () => {
            const response = await fetchPokemon(id)
            setPokemon(response);
        }
        data();
    }, []);

    function leavePokemon(e) {
        e.preventDefault();
        setWildPokemon({
            name: "",
            url: "",
        });
    }

    function catchPokemon(e) {
        e.preventDefault();
        console.log("Caught Pokemon");
        console.log(pokemon);
        dispatch(addToCart(pokemon));
        setWildPokemon({
            name: "",
            url: "",
        });
    }

    return (
        <PokeCard>
            {pokemon.name && 
            <>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} /> 
                <CardContent>
                    <HeadingMedium>#{pokemon.id} {pokemon.name}</HeadingMedium>
                    <ButtonContainer>
                        {pokemon.types && pokemon.types.map(type => (
                            <TypeIcon key={type.type.name} color={type.type.name}>
                                <IconTypes type={type.type.name}/>
                            </TypeIcon>
                        ))}
                    </ButtonContainer>
                </CardContent>
                <PokeDetails pokemon={pokemon} />
                <CardContent>
                    <Button onClick={catchPokemon}>
                        <PokeBallIcon />
                        <ContentRegular>ATRAPAR !</ContentRegular>
                    </Button>
                    <Button onClick={leavePokemon}>
                        <ContentRegular>ESCAPAR</ContentRegular>
                    </Button>
                </CardContent>
            </>
            }
        </PokeCard>
    )
}

export const PokemonItemCart = ({ pokemon, cartId }) => {
    const dispatch = useDispatch();

    function removePokemon(e) {
        e.preventDefault();
        console.log("Removed Pokemon");
        console.log(cartId);
        dispatch(removeFromCart(cartId));
    }

    return (
        <PokeItemCard color={pokemon.types[0].type.name}>
            <div className='title-card'>
                <HeadingSmall>#{pokemon.id} {pokemon.name}</HeadingSmall>
            </div>
            <div>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                <div className='displayed'>
                    <IconButton onClick={removePokemon}>
                        <TrashIcon/>
                    </IconButton>
                    <PokeDetails pokemon={pokemon} />
                </div>
            </div>
        </PokeItemCard>
        
    )
}

const PokeDetails = ({ pokemon }) => {
    return (
        <StatsContainer>
            <StatList>
                <Stat>
                    <StatName color={pokemon.types[0].type.name}>
                        <ContentRegular>HP</ContentRegular>
                    </StatName>
                            <div>{pokemon.stats[0].base_stat}</div>
                </Stat>
                <Stat>
                    <StatName color={pokemon.types[0].type.name}>
                        <ContentRegular>ATTACK</ContentRegular>
                    </StatName>
                    <div>{pokemon.stats[1].base_stat}</div>
                </Stat>
                <Stat>
                    <StatName color={pokemon.types[0].type.name}>
                        <ContentRegular>DEFENSE</ContentRegular>
                    </StatName>
                    <div>{pokemon.stats[2].base_stat}</div>
                </Stat>
            </StatList>
            <StatList>
                <Stat>
                    <StatName color={pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name}>
                        <ContentRegular>SPEED</ContentRegular>
                    </StatName>
                    <div>{pokemon.stats[5].base_stat}</div>
                </Stat>
                <Stat>
                    <StatName color={pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name}>
                        <ContentRegular>SP. ATK.</ContentRegular>
                    </StatName>
                    <div>{pokemon.stats[3].base_stat}</div>
                </Stat>
                <Stat>
                    <StatName color={pokemon.types[1] ? pokemon.types[1].type.name : pokemon.types[0].type.name}>
                        <ContentRegular>SP. DEF.</ContentRegular>
                    </StatName>
                    <div>{pokemon.stats[4].base_stat}</div>
                </Stat>
            </StatList>
        </StatsContainer>
    )
}

const PokeCard = styled.div`
    width: 380px;
    padding: 20px;
    background-color: #f6f6f954;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-transform: capitalize;
    border-radius: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);

    img {
        width: 100%;
        height: 300px;
        border-bottom: 1px solid #ccc;
        object-fit: contain;
    }
`;

const PokeItemCard = styled.div`
    min-width: 100px;
    padding: 0;
    background-color: #f6f6f954;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);

    img {
        width: 160px;
        object-fit: contain;
        padding: 10px;
    }

    div {   
       display: flex;
       justify-content: center;
    }

    .displayed {
        padding: 10px;
        background-color: #f6f6f954;
        border-radius: 0 0 10px 0;
        position: relative;
    }

    button {
        position: absolute;
        top: -15px;
        right: 15px;
        background-color: ${props => props.color && colorTypes(props.color)};

        &:hover {
            color: ${props => props.color && colorTypes(props.color)};
        }
    }

    .title-card {
        background-color: ${props => props.color && colorTypes(props.color)};
        color: #fff;
        border-radius: 10px 10px 0 0;
    }
`;


const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
`;

const Stat = styled.div`
  width: 160px;
  border-radius: 8px;
  background: #fff;
  display: flex;

  @media (max-width: 600px) {
    width: 100px;
  }

  div {
    text-align: center;
    width: 100%;
  }
`;

const StatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StatName = styled.div`
  color: #fff;
  background: ${props => props.color && colorTypes(props.color)};
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px 0px 0px 8px;
  text-align: center;   
  width: 100px;
  font-weight: bold;
`;

const TypeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  background: ${props => props.color && colorTypes(props.color)};

  svg {
    height: 60%;
    width: 60%;
    object-fit: contain;
  }
`;

const CardContent = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-weight: bold;
`;
