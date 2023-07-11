import { Product } from '../models/models';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
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
        default:
            return state;
    }
};

export default productsReducer;
