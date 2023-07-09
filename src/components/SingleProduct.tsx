import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Product } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import "./SingleProduct.css";

interface Props {
    index: number;
    product: Product;
    products: Array<Product>;
    setProducts: React.Dispatch<React.SetStateAction<Array<Product>>>;
    setCart: React.Dispatch<React.SetStateAction<Array<Product>>>;
}

const SingleProduct: React.FC<Props> = ({ index, product, products, setProducts, setCart }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState<Product>({ ...product });

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setProducts(products.map((prod) => (prod.id === id ? { ...prod, ...editProduct } : prod)));
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((prod) => prod.id !== id));
    };

    const handleAddToCart = (id: number) => {
        const selectedProduct = products.find((prod) => prod.id === id);
        if (selectedProduct) {
            setCart((prevCart) => [...prevCart, selectedProduct]);
        }
    };

    const handleRemoveFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((prod) => prod.id !== id));
    };

    return (
        <Draggable draggableId={product.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, product.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`products__single ${snapshot.isDragging ? "drag" : ""}`}
                >
                    {edit ? (
                        <div className="products__single--edit">
                            <input
                                value={editProduct.name}
                                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                className="products__single--name"
                            />
                            <input
                                value={editProduct.price}
                                onChange={(e) =>
                                    setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
                                }
                                className="products__single--price"
                            />
                            <button type="submit" className="products__single--btn">
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <span className="products__single--name">{product.name}</span>
                            <span className="products__single--price">${product.price.toFixed(2)}</span>
                            <div>
                                <span className="icon" onClick={() => setEdit(true)}>
                                    <AiFillEdit />
                                </span>
                                <span className="icon" onClick={() => handleDelete(product.id)}>
                                    <AiFillDelete />
                                </span>
                                <span
                                    className="icon"
                                    onClick={() =>
                                        product.isInCart ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)
                                    }
                                >
                                    <MdDone />
                                </span>
                            </div>
                        </>
                    )}
                </form>
            )}
        </Draggable>
    );
};

export default SingleProduct;
