import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { PokemonItemCart } from "../components/PokemonCard";
import Header from "../components/UI/Header";
import { ContentRegular, ContentSmall, HeadingMedium, Title } from "../components/UI/Text";
import { Button, IconButton } from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { setStep, deleteCart } from "../redux/reducers/cartSlice";
import { ArrowIconLeft } from "../components/UI/Icon";
import { addPokemon, addWater, addFire, addElectric, setArticuno, setMoltres, setZapdos } from "../redux/reducers/pokemonSlice";
import { ButtonContainer } from "../components/UI/Container";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartStore = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <>
            <Header>
                <Title>Your Cart</Title>
                <ButtonContainer>
                    <Link to={"/world"}>
                    <Button>WORLD</Button>
                    </Link>
                    <Link to={"/pokemon"}>
                    <Button>POKEMON</Button>
                    </Link>
                </ButtonContainer>
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
            const poke = cartStore.cart[key]
            dispatch(addPokemon(poke));
            const types = poke.types.map(type => type.type.name);
            if (types.includes("water")) dispatch(addWater());
            if (types.includes("fire")) dispatch(addFire());
            if (types.includes("electric")) dispatch(addElectric());
            if (poke.name=="articuno") dispatch(setArticuno());
            if (poke.name=="zapdos") dispatch(setZapdos());
            if (poke.name=="moltres") dispatch(setMoltres());
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