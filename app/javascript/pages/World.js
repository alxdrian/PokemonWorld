import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/UI/Header";
import { RegionMapContainer, ButtonContainer } from "../components/UI/Container";
import { fetchLocations } from "../services/LocationFetch";
import { ContentRegular } from "../components/UI/Text";
import { Title } from "../components/UI/Text";
import { Button } from "../components/UI/Button";

const World = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const data = async () => {
        const response = await fetchLocations();
        setLocations(response);
    }
    data();
  }, []);

  return (
    <>
        <Header>
          <Title>Welcome to Pokemon World!</Title>
          <ButtonContainer>
            <Link to={"/cart"}>
              <Button>CART</Button>
            </Link>
            <Link to={"/pokemon"}>
              <Button>POKEMON</Button>
            </Link>
          </ButtonContainer>
        </Header>
        <RegionMapContainer>
            <div className="map-container">
              <img src="https://i.redd.it/kq8mzkvpkjy51.png" alt="map" />
              <div className="locations-container">
                {locations.map(location => 
                  <Link key={location.name} to={`./${location.url.split("/")[6]}`}>
                    <ContentRegular>{location.name}</ContentRegular>
                  </Link>
                )}
              </div>
            </div>
            
        </RegionMapContainer>
    </>
  )
}

export default World