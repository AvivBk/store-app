import { Product } from '../models/models';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT,
    DELETE_PRODUCT
} from '../actions/productsActions';

// Define the ProductState type
export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

// Reducer
const productsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };

        default:
            return state;
    }
};

export default productsReducer;
