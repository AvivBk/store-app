import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { Product as ProductModel } from '../models/models';
import './ProductList.css';

const defaultImage = '/images/rocket.jpg';

interface ProductListProps {
    products: ProductModel[];
    onDeleteProduct: (productId: number) => void;
    onAddProduct: (product: ProductModel) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct, onAddProduct }) => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState<ProductModel>({
        id: 0,
        name: '',
        price: 0,
        serialNumber: '',
        location: '',
        quantity: 0,
        image: '',
    });

    const handleDeleteProduct = (productId: number) => {
        onDeleteProduct(productId);
    };

    const handleAddProduct = () => {
        const productToAdd = {
            ...newProduct,
            image: newProduct.image || defaultImage,
        };

        onAddProduct(productToAdd);
        setShowAddProduct(false);
        setNewProduct({
            id: 0,
            name: '',
            price: 0,
            serialNumber: '',
            location: '',
            quantity: 0,
            image: '',
        });
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} onDelete={() => handleDeleteProduct(product.id)} />
                ))}
            </div>
            <div className="add-product-container">
                {showAddProduct ? (
                    <div className="add-product-window">
                        <div className="title-bar">
                            <h3>Add Product</h3>
                            <button className="exit-button" onClick={() => setShowAddProduct(false)}>
                                <span className="exit-icon">X</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price === 0 ? '' : newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                        />
                        <input
                            type="text"
                            placeholder="Serial Number"
                            value={newProduct.serialNumber}
                            onChange={(e) => setNewProduct({ ...newProduct, serialNumber: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newProduct.location}
                            onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={newProduct.quantity === 0 ? '' : newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProduct.image || ''}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <button onClick={handleAddProduct}>Add</button>
                    </div>
                ) : (
                    <button className="add-product-button" onClick={() => setShowAddProduct(true)}>
                        Add Product
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductList;
