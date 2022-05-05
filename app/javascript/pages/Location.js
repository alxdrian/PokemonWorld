import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/UI/Header";
import { fetchLocation } from "../services/LocationFetch";
import { NavBar } from "../components/UI/Navbar";
import LocationArea from "../components/LocationArea";
import { func } from "prop-types";

const Location = () => {
    const locationId = window.location.pathname.split("/")[2];
    const [location, setLocation] = useState({});
    const [selectedArea, setSelectedArea] = useState({});

    useEffect(() => {
        const data = async () => {
            const response = await fetchLocation(locationId);
            setLocation(response);
            setSelectedArea(response.areas[0]);
        }
        data();
    }, []);

    function changeArea(e) {
        e.preventDefault();
        setSelectedArea({
            ...selectedArea,
            name: e.target.innerText,
            url: e.target.dataset.url
        });
    }

    return (
        <>
            <Header>
                Location
            </Header>
            <NavBar>
                <ul>
                    {location.areas && location.areas.map(area => 
                        <li 
                            key={area.name} 
                            data-url={area.url} 
                            onClick={changeArea}
                            className={selectedArea.name === area.name ? "selected" : ""}
                        >
                            {area.name}
                        </li>
                    )}
                </ul>
            </NavBar>
            {selectedArea.name && <LocationArea id={selectedArea.url.split("/")[6]} />}
        </>
    )
}

export default Location;