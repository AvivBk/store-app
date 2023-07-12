import React, { useState, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct } from './actions/productsActions';
import { RootState } from './reducers';
import { Product } from './models/models';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles.css';


const App: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        console.log(`Deleted page with ID: ${pageNumber}`);
        navigate(`/page${pageNumber}`);
    };

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
        console.log(`Deleted product with ID: ${productId}`);
    };

    const handleAddProduct = (newProduct: Product) => {
        dispatch(addProduct(newProduct));
        console.log('Added product:', newProduct);
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
            <AppRoutes
                currentPage={currentPage}
                products={products}
                handleDeleteProduct={handleDeleteProduct}
                handleAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default App;
