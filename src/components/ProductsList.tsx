import React from "react";
import { Product } from "../models/models";
import SingleProduct from "./SingleProduct";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import "./ProductsList.css";

interface Props {
    products: Array<Product>;
    setProducts: React.Dispatch<React.SetStateAction<Array<Product>>>;
    setCart: React.Dispatch<React.SetStateAction<Array<Product>>>;
    cart: Array<Product>;
}

const ProductsList: React.FC<Props> = ({ products, setProducts, setCart, cart }) => {
    return (
        <div className="PL_container">
            <Droppable droppableId="ProductsList">
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >

                        {products?.map((product, index) => (
                            <SingleProduct
                                index={index}
                                product={product}
                                key={product.id}
                                setCart={setCart}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="Cart">
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
                    >

                        {cart?.map((product, index) => (
                            <SingleProduct
                                index={index}
                                product={product}
                                key={product.id}
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
