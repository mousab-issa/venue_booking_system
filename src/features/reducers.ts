import { combineReducers } from 'redux';

// import venuesReducer from './venues/reducers';
// import cartReducer from './cart/reducers';

const createGlobalReducer = combineReducers({
    // venuesReducer: venuesReducer,
    // cart: cartReducer
    // NOTE: other app reducers go here
});

export default createGlobalReducer;
