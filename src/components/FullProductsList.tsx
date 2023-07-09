import React, { useState } from 'react';
import ProductsInputField from './ProductsInputField';
import ProductsList from './ProductsList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Product } from '../models/models';

const FullProductsList: React.FC = () => {
    const [product, setProduct] = useState<string>('');
    const [products, setProducts] = useState<Array<Product>>([]);
    const [cart, setCart] = useState<Array<Product>>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (product) {
            setProducts([
                ...products,
                { id: Date.now(), name: product, price: 0, isInCart: false },
            ]);
            setProduct('');
        }
    };

    const handleAddToCart = (productId: number) => {
        const selectedProduct = products.find((product) => product.id === productId);

        if (selectedProduct) {
            setCart([...cart, { ...selectedProduct, isInCart: true }]);
            setProducts(
                products.map((product) =>
                    product.id === productId ? { ...product, isInCart: true } : product
                )
            );
        }
    };

    const handleRemoveFromCart = (productId: number) => {
        const selectedProduct = cart.find((product) => product.id === productId);

        if (selectedProduct) {
            setCart(cart.filter((product) => product.id !== productId));
            setProducts(
                products.map((product) =>
                    product.id === productId ? { ...product, isInCart: false } : product
                )
            );
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Logic for dragging products
        if (source.droppableId === 'ProductsList' && destination.droppableId === 'Cart') {
            const draggedProduct = products[source.index];
            draggedProduct.isInCart = true;

            const updatedProducts = [...products];
            updatedProducts.splice(source.index, 1);

            setProducts(updatedProducts);
            setCart([...cart, draggedProduct]);
        } else if (
            source.droppableId === 'Cart' &&
            destination.droppableId === 'ProductsList'
        ) {
            const draggedProduct = cart[source.index];
            draggedProduct.isInCart = false;

            const updatedCart = [...cart];
            updatedCart.splice(source.index, 1);

            const updatedProducts = [...products];
            updatedProducts.splice(destination.index, 0, draggedProduct);

            setCart(updatedCart);
            setProducts(updatedProducts);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Product Management System</span>
                <ProductsInputField product={product} setProduct={setProduct} handleAdd={handleAdd} />
                <ProductsList
                    products={products}
                    setProducts={setProducts}
                    cart={cart}
                    setCart={setCart}
                   
              
                />
            </div>
        </DragDropContext>
    );
};

export default FullProductsList;
