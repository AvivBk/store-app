import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Product } from '../models/models';

interface Props {
    products: Product[];
    onDelete: () => void;
    onBuy: () => void;
}

const CartActions: React.FC<Props> = ({ products, onDelete, onBuy }) => {
    // Calculate the total price of all products in the cart
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    return (
        <div className="cart-actions">
            <div className="cart-actions__total">Total: ${totalPrice}</div>
            <div className="cart-actions__buttons">
                <button className="cart-actions__button" onClick={onDelete}>
                    <AiFillDelete /> Delete
                </button>
                <button className="cart-actions__button" onClick={onBuy}>
                    <MdDone /> Buy
                </button>
            </div>
        </div>
    );
};

export default CartActions;
