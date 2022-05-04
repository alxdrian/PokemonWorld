import React from "react";
import Header from "../components/UI/Header";
import HelloMessage from "../components/Message";

const World = () => {
  return (
    <>
        <Header>
            Pokemon World
        </Header>
        <HelloMessage name="user" />
    </>
  )
}

export default World