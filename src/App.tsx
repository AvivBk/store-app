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

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <ProductList products={products} />;
            case 2:
                return <FullTodoList />;
            case 3:
                return <FullProductsList products={products} />;
            default:
                return null;
        }
    };

    return (
        <div className="App" style={{ backgroundImage: "url('/images/store_bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <h1>Product Management System</h1>
            {renderContent()}
            <div className="pagination">
                <button onClick={() => handlePageChange(1)}>Page 1</button>
                <button onClick={() => handlePageChange(2)}>Page 2</button>
                <button onClick={() => handlePageChange(3)}>Page 3</button>
            </div>
        </div>
    );
};

export default App;
