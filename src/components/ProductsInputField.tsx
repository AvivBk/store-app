import React, { useRef } from "react";
import "./InputField.css";

interface Props {
    product: string;
    setProduct: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const ProductsInputField: React.FC<Props> = ({ product, setProduct, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className="input"
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}
        >
            <input
                type="text"
                placeholder="Enter a Product"
                value={product}
                ref={inputRef}
                onChange={(e) => setProduct(e.target.value)}
                className="input__box"
            />
            <button type="submit" className="input_submit">
                GO
            </button>
        </form>
    );
};

export default ProductsInputField;
