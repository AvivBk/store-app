import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Product } from '../models/models';
import ProductList from '../components/ProductList';
import FullTodoList from '../components/FullTodoList';
import FullProductsList from '../components/FullProductsList';

interface AppRoutesProps {
    currentPage: number;
    products: Product[];
    handleDeleteProduct: (productId: number) => void;
    handleAddProduct: (newProduct: Product) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
    currentPage,
    products,
    handleDeleteProduct,
    handleAddProduct,
}) => {
    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <Route
                        path="/page1"
                        element={
                            <ProductList
                                products={products}
                                onDeleteProduct={handleDeleteProduct}
                                onAddProduct={handleAddProduct}
                            />
                        }
                    />
                );
            case 2:
                return (
                    <Route
                        path="/page2"
                        element={<FullTodoList />}
                    />
                );
            case 3:
                return (
                    <Route
                        path="/page3"
                        element={<FullProductsList products={products} />}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Routes>
            {renderContent()}
            <Route path="*" element={<Navigate to="/page1" />} />
        </Routes>
    );
};

export default AppRoutes;
