import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { PokemonItemCart } from "../components/PokemonCard";
import Header from "../components/UI/Header";
import { ContentRegular, ContentSmall, HeadingMedium } from "../components/UI/Text";
import { Button, IconButton } from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { setStep, deleteCart } from "../redux/reducers/cartSlice";
import { ArrowIconLeft } from "../components/UI/Icon";
import { addPokemon } from "../redux/reducers/pokemonSlice";

const Cart = () => {
    const cartStore = useSelector(state => state.cart);
    const dispatch = useDispatch();


    return (
        <>
            <Header>
                <HeadingMedium>Cart</HeadingMedium>
            </Header>
            {cartStore.step === 1 && (
                <CartStep>
                <HeadingMedium>Poke Carrito</HeadingMedium>
                <PokemonList>
                    {Object.keys(cartStore.cart).map((key, index) => 
                        cartStore.cart[key] && <PokemonItemCart key={index} pokemon={cartStore.cart[key]} cartId={key}/>
                    )}
                </PokemonList>
                <Button onClick={(e) => {dispatch(setStep(2))}} disabled={Object.keys(cartStore.cart).length < 1}>
                    <ContentRegular>PAGAR</ContentRegular>
                </Button>
                </CartStep>
            )}
            {cartStore.step === 2 && (
                <Payment />
            )}
        </>
    );
}

export default Cart;

const Payment = () => {
    const dispatch = useDispatch();
    const [counter, setCounter] = useState({});
    const cartStore = useSelector(state => state.cart);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        let count = {};
        Object.keys(cartStore.cart).forEach(key => {
            if (count[cartStore.cart[key].name]) {
                count[cartStore.cart[key].name] += 1;
            } else {
                count[cartStore.cart[key].name] = 1;
            }
        });
        setCounter(count);
    }, [cartStore]);

    const handlePayment = (e) => {
        e.preventDefault();
        Object.keys(cartStore.cart).forEach(key => {
            dispatch(addPokemon(cartStore.cart[key]));
        });
        setConfirm(true);
        setTimeout(() => {
            dispatch(deleteCart());
            dispatch(setStep(1));
        }, 3000);
    }

    return (
        <CartStep>
            <HeadingMedium>Pago</HeadingMedium>
            <IconButton onClick={(e)=>{dispatch(setStep(1))}}>
                <ArrowIconLeft />
            </IconButton>
            <ContentRegular>Resumen de la compra</ContentRegular>
            {counter !== {} && Object.keys(counter).map((key, index) => (
                <div>
                    <ContentRegular>{key}: {counter[key]}</ContentRegular>
                </div>
            ))}
            {confirm && (
                <>
                <HeadingMedium>Pago realizado</HeadingMedium>
                <ContentSmall>
                    Gracias por tu compra.
                </ContentSmall>
                </>
            )}
            <Button onClick={handlePayment}>
                Confirmar Pago
            </Button>
        </CartStep>
    );
}

const CartStep = styled.div`
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: 20px;
    background-color: #43b2a7;
`;

const PokemonList = styled.div`
   display: flex; 
   flex-wrap: wrap;
   justify-content: space-around;
   align-items: center;
   gap: 20px;
   border-top: 1px solid #e6e6e6;
   padding: 30px 0;
   border-bottom: 1px solid #e6e6e6;
   margin-bottom: 20px;
   min-height: calc(100vh - 200px);
`;