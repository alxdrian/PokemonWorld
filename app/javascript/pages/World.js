import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/UI/Header";
import { RegionMapContainer } from "../components/UI/Container";
import { LocationCard } from "../components/LocationCard";
import { fetchLocations } from "../services/LocationFetch";

const World = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const data = async () => {
        const response = await fetchLocations();
        setLocations(response);
    }
    data();
  }, []);

  console.log(locations);

  return (
    <>
        <Header>
            Pokemon World
        </Header>
        <RegionMapContainer>
            <div class="map">
              <img src="https://i.redd.it/kq8mzkvpkjy51.png" alt="mapKanto" />
              {locations.map(location => 
                <Link to={`./${location.url.split("/")[6]}`}>
                  <LocationCard 
                    key={location.name}
                    bottom={Math.round(Math.random(100) * 1000)}
                    left={Math.round(Math.random(100) * 1000)}
                  >
                  {location.name}
                  </LocationCard>
                </Link>
              )}
            </div>
            
        </RegionMapContainer>
    </>
  )
}

export default World