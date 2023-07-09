import React from 'react';
import Product from './Product';

import './ProductList.css';

interface ProductListProps {
    products: Array<{
        id: number;
        name: string;
        serialNumber: string;
        location: string;
        quantity: number;
        image: string;
    }>;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
