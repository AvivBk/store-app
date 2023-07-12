import React, { useState } from 'react';
import ProductsInputField from './ProductsInputField';
import ProductsList from './ProductsList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Product } from '../models/models';
import "./FullProductsList.css";
import CartActions from './CartActions';

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
            const newProduct: Product = {
                id: Date.now(),
                name: product,
                price: 0,
                serialNumber: '',
                location: '',
                quantity: 0,
                image: '',
                isInCart: false,
            };

            setUpdatedProducts((prevProducts) => [...prevProducts, newProduct]);
            setCart((prevCart) => [...prevCart, newProduct]);
            setProduct('');
        }
    };

    const handleDelete = () => {
        setUpdatedProducts((prevProducts) => [...prevProducts, ...cart]);
        setCart([]);
    };

    const handleBuy = () => {
        console.log("Buy button clicked");
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Logic for dragging products
        if (source.droppableId === 'ProductsList' && destination.droppableId === 'Cart') {
            const draggedProduct = updatedProducts[source.index];
            draggedProduct.isInCart = true;

            const updatedCart = [...cart, draggedProduct];
            setCart(updatedCart);

            const updatedProductsList = [...updatedProducts];
            updatedProductsList.splice(source.index, 1);
            setUpdatedProducts(updatedProductsList);
        } else if (source.droppableId === 'Cart' && destination.droppableId === 'ProductsList') {
            const draggedProduct = cart[source.index];
            draggedProduct.isInCart = false;

            const updatedCart = [...cart];
            updatedCart.splice(source.index, 1);
            setCart(updatedCart);

            const updatedProductsList = [...updatedProducts, draggedProduct];
            setUpdatedProducts(updatedProductsList);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="main_container">
                <ProductsInputField product={product} setProduct={setProduct} handleAdd={handleAdd} className="products-input-field" />
                <ProductsList products={updatedProducts} setProducts={setUpdatedProducts} setCart={setCart} cart={cart} />
                <CartActions products={cart} onDelete={handleDelete} onBuy={handleBuy} />
            </div>
        </DragDropContext>
    );
};

export default FullProductsList;
