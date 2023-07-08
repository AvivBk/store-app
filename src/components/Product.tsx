import React from 'react';
import './Product.css';

interface ProductProps {
    product: {
        id: number;
        name: string;
        serialNumber: string;
        location: string;
        quantity: number;
        image: string;
    };
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="product-item">
            <h3 className="product-title">{product.name}</h3>
            <p>Serial Number: {product.serialNumber}</p>
            <p>Location: {product.location}</p>
            <p>Quantity: {product.quantity}</p>
            <img src={product.image} alt={product.name} />
        </div>
    );
};

export default Product;
