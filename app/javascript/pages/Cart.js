import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);
    console.log(cart);

    return (
        <div>
            <h1>Cart</h1>
            {cart.map(item => (
                <div key={item.id}>
                    <h2>{item.pokemon.name}</h2>
                    <img src={item.pokemon.sprites.other['official-artwork'].front_default} alt={item.pokemon.name} />
                </div>
            ))}
        </div>
    );
}

export default Cart;