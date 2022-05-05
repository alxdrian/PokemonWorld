import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/UI/Header";
import { fetchLocation } from "../services/LocationFetch";
import { NavBar } from "../components/UI/Navbar";
import { GameContainer, AreaMapContainer } from "../components/UI/Container";
import { Trainer } from "../components/Trainer";

const Location = () => {
    const locationId = window.location.pathname.split("/")[2];
    const [location, setLocation] = useState({});

    const [moving, setMoving] = useState(false);
    const [trainer, setTrainer] = useState({
        top: 0,
        left: 0,
        direction: 0,
    });

    useEffect(() => {
        const data = async () => {
            const response = await fetchLocation(locationId);
            setLocation(response);
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
    }

    return (
        <>
            <Header>
                Location
            </Header>
            <NavBar>
                <ul>
                    {location.areas && location.areas.map(area =>
                        <li key={area.name}>
                           {area.name}
                        </li>
                    )}
                </ul>
            </NavBar>
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
                    </Trainer>
                    <div className="tail-grass" />
                    <div className="tail-grass" />
                    <div className="tail-grass" />
                    <div className="tail-grass" />
                    <div className="tail-grass" />
                    <div className="tail-grass" />
                </AreaMapContainer>
            </GameContainer>
        </>
    )
}

export default Location;