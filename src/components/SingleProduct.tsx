import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Product } from '../models/models';
import './SingleProduct.css';

interface Props {
    index: number;
    product: Product;
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SingleProduct: React.FC<Props> = ({ index, product, setCart }) => {
    const handleAddToCart = () => {
        setCart((prevCart) => [...prevCart, { ...product, isInCart: true }]);
    };

    const handleRemoveFromCart = () => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== product.id));
    };

    return (
        <Draggable draggableId={product.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`product ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="product__content">
                        <div className="product__info">
                            <div className="product__image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product__details">
                                <h3 className="product__name">{product.name}</h3>
                                <p className="product__serial">{product.serialNumber}</p>
                                <p className="product__location">{product.location}</p>
                                <p className="product__price">${product.price}</p>
                                {product.isInCart ? (
                                    <button className="product__button remove" onClick={handleRemoveFromCart}>
                                        Remove from Cart
                                    </button>
                                ) : (
                                    <button className="product__button add" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="product__quantity">
                            <span className="product__quantity-label">Quantity:</span>
                            <span className="product__quantity-value">{product.quantity}</span>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default SingleProduct;
