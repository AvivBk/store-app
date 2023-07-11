import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import FullTodoList from './components/FullTodoList';
import FullProductsList from './components/FullProductsList';
import { Product } from './models/models';
import './styles.css';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteProduct = (productId: number) => {
        // Filter out the deleted product from the products list
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleAddProduct = (newProduct: Product) => {
        // Create a new product object with a unique ID
        const generatedId = Date.now();
        const product: Product = {
            id: generatedId,
            name: newProduct.name,
            price: newProduct.price,
            serialNumber: newProduct.serialNumber,
            location: newProduct.location,
            quantity: newProduct.quantity,
            image: newProduct.image,
        };

        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
    };


    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <ProductList
                        products={products}
                        onDeleteProduct={handleDeleteProduct}
                        onAddProduct={handleAddProduct}
                    />
                );
            case 2:
                return <FullTodoList />;
            case 3:
                return <FullProductsList products={products} />;
            default:
                return null;
        }
    };

    return (
        <div
            className="App"
            style={{ backgroundImage: "url('/images/store_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <h1>Product Management System</h1>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(1)}
                    className={currentPage === 1 ? 'active' : ''}
                    disabled={currentPage === 1}
                >
                    Page 1
                </button>
                <button
                    onClick={() => handlePageChange(2)}
                    className={currentPage === 2 ? 'active' : ''}
                    disabled={currentPage === 2}
                >
                    Page 2
                </button>
                <button
                    onClick={() => handlePageChange(3)}
                    className={currentPage === 3 ? 'active' : ''}
                    disabled={currentPage === 3}
                >
                    Page 3
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default App;
