import React, { useState } from 'react';
import ProductsInputField from './ProductsInputField';
import ProductsList from './ProductsList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Product } from '../models/models';

interface Props {
    products: Product[];
}

const FullProductsList: React.FC<Props> = ({ products }) => {
    const [product, setProduct] = useState<string>('');
    const [cart, setCart] = useState<Product[]>([]);
    const [updatedProducts, setUpdatedProducts] = useState<Product[]>(products);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (product) {
            setUpdatedProducts([
                ...updatedProducts,
                {
                    id: Date.now(),
                    name: product,
                    price: 0,
                    serialNumber: '',
                    location: '',
                    quantity: 0,
                    image: '',
                    isInCart: false,
                },
            ]);
            setCart([
                ...cart,
                {
                    id: Date.now(),
                    name: product,
                    price: 0,
                    serialNumber: '',
                    location: '',
                    quantity: 0,
                    image: '',
                    isInCart: false,
                },
            ]);
            setProduct('');
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
            const draggedProduct = updatedProducts[source.index];
            draggedProduct.isInCart = true;

            const updatedCart = [...cart, draggedProduct];
            setCart(updatedCart);
        } else if (
            source.droppableId === 'Cart' &&
            destination.droppableId === 'ProductsList'
        ) {
            const draggedProduct = cart[source.index];
            draggedProduct.isInCart = false;

            const updatedCart = [...cart];
            updatedCart.splice(source.index, 1);

            setCart(updatedCart);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Product Management System</span>
                <ProductsInputField product={product} setProduct={setProduct} handleAdd={handleAdd} />
                <ProductsList products={updatedProducts} setProducts={setUpdatedProducts} setCart={setCart} cart={cart} />
            </div>
        </DragDropContext>
    );
};

export default FullProductsList;
