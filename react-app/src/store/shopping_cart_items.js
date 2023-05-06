const LOAD_SHOPPING_CART_ITEMS = "cartItems/loadShoppingCartItems";
const LOAD_USER_SHOPPING_CART_ITEMS = 'cartItems/userShoppingCartItems';
const LOAD_SHOPPING_CART_ITEM_BY_ID = 'cartItems/loadShoppingCartItemsById';
const CREATE_SHOPPING_CART_ITEM = "cartItems/createShoppingCartItem";
const EDIT_SHOPPING_CART_ITEM = 'cartItems/editShoppingCartItem';
const DELETE_SHOPPING_CART_ITEM = "cartItems/deleteShoppingCartItem";


const loadCartItems = (cartItems) => ({
    type: LOAD_SHOPPING_CART_ITEMS,
    cartItems
});

const loadUserCartItems = (userCartItems) => ({
    type: LOAD_USER_SHOPPING_CART_ITEMS,
    userCartItems
});

const loadCartItemById = (cartItem) => ({
    type: LOAD_SHOPPING_CART_ITEM_BY_ID,
    cartItem
});

const createCartItem = (cartItem) => ({
    type: CREATE_SHOPPING_CART_ITEM,
    cartItem
});

const editCartItem = (cartItem) => ({
    type: EDIT_SHOPPING_CART_ITEM,
    cartItem
});

const deleteCartItem = (cartItemId) => ({
    type: DELETE_SHOPPING_CART_ITEM,
    cartItemId
});

export const getAllCartItems = () => async (dispatch) => {
    const response = await fetch("/api/cart/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCartItems(data.cartItems));
    }
};

export const getUserCartItems = () => async (dispatch) => {
    const response = await fetch("/api/users/current/cart");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserCartItems(data));
        return data
    }
};

export const getCartItemById = (id) => async (dispatch) => {
    const response = await fetch(`/api/cart/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCartItemById(data));
    }
};


export const createACartItem = (gameId, cartItem) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(cartItem)
    });
    if (response.ok) {
        const cartItem = await response.json();
        return dispatch(createCartItem(cartItem))
    }
    return response
};

export const editCartItemById = (cartItemId, payload) => async (dispatch) => {
    const response = await fetch(`/api/users/current/cart/${cartItemId.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const cartItem = await response.json();
        dispatch(editCartItem(cartItem))
        return
    }
    return response
};

export const deleteCartItemById = (cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/users/current/cart/${cartItemId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteCartItem(cartItemId))
    }
};



const initialState = {

};
const cartItemsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {

        case LOAD_SHOPPING_CART_ITEMS:

            action.cartItems.forEach(cartItem => {
                newState[cartItem.id] = cartItem
            });
            return newState

        case LOAD_USER_SHOPPING_CART_ITEMS:
            newState = {}
            action.userCartItems.forEach(cartItem => {
                newState[cartItem.id] = cartItem
            });
            return newState

        case LOAD_SHOPPING_CART_ITEM_BY_ID:
            newState[action.cartItem.id] = action.cartItem
            return newState;

        case CREATE_SHOPPING_CART_ITEM:
            newState[action.cartItem.id] = action.cartItem
            return newState;

        case EDIT_SHOPPING_CART_ITEM:
            newState[action.cartItem.id] = action.cartItem;
            return newState;

        case DELETE_SHOPPING_CART_ITEM:
            delete newState[action.cartItemId]
            return newState

        default:
            return state;
    }
}

export default cartItemsReducer;
