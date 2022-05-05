import React from "react";
import { useState, useEffect } from "react";
import { GameContainer, AreaMapContainer } from "../components/UI/Container";
import { Trainer } from "../components/Trainer";
import { fetchLocationArea } from "../services/LocationFetch";

const LocationArea = ({id}) => {
    const [moving, setMoving] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [trainer, setTrainer] = useState({
        top: 0,
        left: 0,
        direction: 0,
    });
    const [wildPokemon, setWildPokemon] = useState({});

    useEffect(() => {
        const data = async () => {
            const response = await fetchLocationArea(id);
            const responsePokemon = response.pokemon_encounters.filter(pokemon => pokemon.version_details.some(version => version.version.name === "red"))
            const pokes = responsePokemon.map(pokemon => {
                return {
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url,
                    encounter_details: pokemon.version_details.find(version => version.version.name === "red").encounter_details[0]
                }
            })
            setPokemon(pokes);
        }
        data();
    }, []);


    function verifyCoords() {
        const mapCoords = document.querySelector(".area-map").getBoundingClientRect();
        const trainerCoords = document.querySelector(".trainer").getBoundingClientRect();
        if (trainerCoords.top < mapCoords.top) {
            setTrainer({
                ...trainer,
                top: trainer.top - 10,
                direction: 0,
            });
        } else if (trainerCoords.left < mapCoords.left) {
            setTrainer({
                ...trainer,
                left: trainer.left - 10,
                direction: 270,
            });
        } else if (trainerCoords.bottom > mapCoords.bottom) {
            setTrainer({
                ...trainer,
                top: trainer.top + 10,
                direction: 180,
            });
        } else if (trainerCoords.right > mapCoords.right) {
            setTrainer({
                ...trainer,
                left: trainer.left + 10,
                direction: 90,
            });
        }
    }

    function moveTrainer (e){
        e.preventDefault();
        if (!wildPokemon.name) {
            if (e.key === "ArrowUp") {
                setTrainer({
                    top: trainer.top + 10,
                    left: trainer.left,
                    direction: 180,
                });
            } else if (e.key === "ArrowDown") {
                setTrainer({
                    top: trainer.top - 10,
                    left: trainer.left,
                    direction: 0,
                });
            } else if (e.key === "ArrowLeft") {
                setTrainer({
                    top: trainer.top,
                    left: trainer.left + 10,
                    direction: 90,
                });
            } else if (e.key === "ArrowRight") {
                setTrainer({
                    top: trainer.top,
                    left: trainer.left - 10,
                    direction: 270,
                });
            }
            setMoving(true);
            verifyCoords();
            setTimeout(() => {
                setMoving(false);
            }, 400);
            encounterPokemon();
        }
    }

    function encounterPokemon() {
        const chance = Math.floor((Math.random() * (71-1))+1);
        if (chance === 1) {
            console.log("catch time");
            console.log(pokemon);
            const posibles = [];
            pokemon.forEach(pokemon => {
                for (let i = 0; i < pokemon.encounter_details.chance; i++) {
                    posibles.push(pokemon);
                }
            });
            const appeared = posibles[Math.floor(Math.random() * posibles.length)];
            setWildPokemon(appeared);
        }
    }

    return (
        <GameContainer>
            <AreaMapContainer className="area-map" tabIndex="0" onKeyDown={moveTrainer}>
                <Trainer
                    className="trainer"
                    top={trainer.top}
                    left={trainer.left}
                    direction={trainer.direction}
                >
                    {!moving ? 
                        <img src="https://archives.bulbagarden.net/media/upload/archive/c/c3/20120801043017%21Red_E_OD.png" alt="trainer" /> :
                        <img src="https://archives.bulbagarden.net/media/upload/3/38/RedFRLGwalkdown.png" alt="trainer" />
                    }
                    {wildPokemon.name && <div className="wild-pokemon">{wildPokemon.name}</div>}
                </Trainer>
                <div className="tail-grass" />
                <div className="tail-grass" />
                <div className="tail-grass" />
                <div className="tail-grass" />
                <div className="tail-grass" />
                <div className="tail-grass" />
            </AreaMapContainer>
        </GameContainer>
    )
}

export default LocationArea;