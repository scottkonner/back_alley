import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import gamesReducer from './games';
import reviewsReducer from './reviews'
import cartItemsReducer from './shopping_cart_items'
import wishItemsReducer from './wishlist_items';

const rootReducer = combineReducers({
  session,
  games:gamesReducer,
  reviews:reviewsReducer,
  cartItems:cartItemsReducer,
  wishItems:wishItemsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
