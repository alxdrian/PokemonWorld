import styled from '@emotion/styled';
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchPokemon } from '../services/PokemonFetch';
import { ContentRegular, HeadingMedium } from "./UI/Text";
import { colorTypes } from "../helpers/colorTypes";
import { IconTypes } from './IconTypes';
import { ButtonContainer } from './UI/Container';

const PokemonCard = ({ id }) => {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        const data = async () => {
            const response = await fetchPokemon(id)
            setPokemon(response);
        }
        data();
    }, []);

    return (
        <PokeCard>
            {pokemon.name && 
            <>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                <PokeName>
                    <HeadingMedium>{pokemon.name}</HeadingMedium>
                    <ButtonContainer>
                    {pokemon.types && pokemon.types.map(type => (
                            <TypeIcon key={type.type.name} color={type.type.name}>
                            <IconTypes type={type.type.name}/>
                            </TypeIcon>
                        ))}
                    </ButtonContainer>
                </PokeName>
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
            </>
            }
        </PokeCard>
    )
}

export default PokemonCard;

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

const PokeName = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;
