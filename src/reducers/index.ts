import { combineReducers } from 'redux';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    // Add other reducers if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
