import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { PokemonItemCart } from "../components/PokemonCard";
import Header from "../components/UI/Header";
import { HeadingMedium } from "../components/UI/Text";

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);

    return (
        <>
            <Header>
                <HeadingMedium>Cart</HeadingMedium>
            </Header>
            <CartStep>
                <PokemonList>
                    {Object.keys(cart).map((key, index) => 
                        cart[key] && <PokemonItemCart key={index} pokemon={cart[key]} cartId={key}/>
                    )}
                </PokemonList>
            </CartStep>
            
        </>
    );
}

export default Cart;

const CartStep = styled.div`
    width: 100%;
    min-height: calc(100% - 60px);
    padding: 20px;
    background-color: #43b2a7;
`;

const PokemonList = styled.div`
   display: flex; 
   flex-wrap: wrap;
   justify-content: space-around;
   align-items: center;
   gap: 20px;
`;