import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './actions/productsActions';
import ProductList from './components/ProductList';
import FullTodoList from './components/FullTodoList';
import FullProductsList from './components/FullProductsList';
import { RootState } from './reducers';
import { Product } from './models/models';
import './styles.css';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch<any>(fetchProducts()); // Add <any> to resolve TypeScript error
    }, [dispatch]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteProduct = (productId: number) => {
        // Handle delete product logic here
        // For now, just console log the deleted product ID
        console.log(`Deleted product with ID: ${productId}`);
    };

    const handleAddProduct = (newProduct: Product) => {
        // Handle add product logic here
        // For now, just console log the added product details
        console.log('Added product:', newProduct);
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
