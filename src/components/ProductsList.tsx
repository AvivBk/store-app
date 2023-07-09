import React from "react";
import { Product } from "../models/models";
import SingleProduct from "./SingleProduct";
import { Droppable } from "react-beautiful-dnd";
import "./ProductsList.css";

interface Props {
    products: Array<Product>;
    setProducts: React.Dispatch<React.SetStateAction<Array<Product>>>;
    setCart: React.Dispatch<React.SetStateAction<Array<Product>>>;
    cart: Array<Product>;
}

const ProductsList: React.FC<Props> = ({ products, setProducts, setCart, cart }) => {
    return (
        <div className="container">
            <Droppable droppableId="ProductsList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Available Products</span>
                        {products?.map((product, index) => (
                            <SingleProduct
                                index={index}
                                products={products}
                                product={product}
                                key={product.id}
                                setProducts={setProducts}
                                setCart={setCart}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="Cart">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
                    >
                        <span className="todos__heading">Cart</span>
                        {cart?.map((product, index) => (
                            <SingleProduct
                                index={index}
                                products={cart}
                                product={product}
                                key={product.id}
                                setProducts={setProducts}
                                setCart={setCart}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ProductsList;
