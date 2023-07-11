import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Product as ProductModel } from '../models/models';
import './ProductItem.css';

interface ProductItemProps {
    product: ProductModel;
    onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
    return (
        <div className="product-item">
            <button className="delete-button" onClick={onDelete}>
                <AiFillDelete />
            </button>
            <h3 className="product-title">{product.name}</h3>
            <p>Serial Number: {product.serialNumber}</p>
            <p>Location: {product.location}</p>
            <p>Quantity: {product.quantity}</p>
            <img src={product.image} alt={product.name} />
        </div>
    );
};

export default ProductItem;
