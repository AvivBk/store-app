import { Dispatch } from 'redux';
import { Product } from '../models/models';
import { RootState } from '../reducers';
// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action Creators
export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error: string) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

// Thunk function to fetch the products
// Thunk function to fetch the products
export const fetchProducts = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch('http://localhost:8000/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products.');
            }
            const data = await response.json();
            dispatch(fetchProductsSuccess(data));
        } catch (error) {
            dispatch(fetchProductsFailure((error as Error).message));
        }
    };
};






