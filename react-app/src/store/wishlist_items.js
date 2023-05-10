const LOAD_WISHLIST_ITEMS = "wishItems/loadWishlistItems";
const LOAD_USER_WISHLIST_ITEMS = 'wishItems/userWishlistItems';
const LOAD_WISHLIST_ITEM_BY_ID = 'wishItems/loadWishlistItemsById';
const CREATE_WISHLIST_ITEM = "wishItems/createWishlistItem";
const EDIT_WISHLIST_ITEM = 'wishItems/editWishlistItem';
const DELETE_WISHLIST_ITEM = "wishItems/deleteWishlistItem";


const loadWishItems = (wishItems) => ({
    type: LOAD_WISHLIST_ITEMS,
    wishItems
});

const loadUserWishItems = (userWishItems) => ({
    type: LOAD_USER_WISHLIST_ITEMS,
    userWishItems
});

const loadWishItemById = (wishItem) => ({
    type: LOAD_WISHLIST_ITEM_BY_ID,
    wishItem
});

const createWishItem = (wishItem) => ({
    type: CREATE_WISHLIST_ITEM,
    wishItem
});

const editWishItem = (wishItem) => ({
    type: EDIT_WISHLIST_ITEM,
    wishItem
});

const deleteWishItem = (wishItemId) => ({
    type: DELETE_WISHLIST_ITEM,
    wishItemId
});

export const getAllWishItems = () => async (dispatch) => {
    const response = await fetch("/api/wishlist/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadWishItems(data.wishItems));
    }
};

export const getUserWishItems = () => async (dispatch) => {
    const response = await fetch("/api/users/current/wishlist");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserWishItems(data));
        return data
    }
};

export const getWishItemById = (id) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadWishItemById(data));
    }
};


export const createAWishItem = (gameId, wishItem) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/wishlist`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(wishItem)
    });
    if (response.ok) {
        const wishItem = await response.json();
        return dispatch(createWishItem(wishItem))
    }
    return response
};

export const editWishItemById = (wishItem, payload) => async (dispatch) => {
    const response = await fetch(`/api/users/current/wishlist/${wishItem.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const wishItem = await response.json();
        dispatch(editWishItem(wishItem))
        return
    }
    return response
};

export const deleteWishItemById = (wishItemId) => async (dispatch) => {
    const response = await fetch(`/api/users/current/wishlist/${wishItemId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteWishItem(wishItemId))
    }
};



const initialState = {

};
const wishItemsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {

        case LOAD_WISHLIST_ITEMS:

            action.wishItems.forEach(wishItem => {
                newState[wishItem.id] = wishItem
            });
            return newState

        case LOAD_USER_WISHLIST_ITEMS:
            newState = {}
            action.userWishItems.forEach(wishItem => {
                newState[wishItem.id] = wishItem
            });
            return newState

        case LOAD_WISHLIST_ITEM_BY_ID:
            newState[action.wishItem.id] = action.wishItem
            return newState;

        case CREATE_WISHLIST_ITEM:
            newState[action.wishItem.id] = action.wishItem
            return newState;

        case EDIT_WISHLIST_ITEM:
            newState[action.wishItem.id] = action.wishItem;
            return newState;

        case DELETE_WISHLIST_ITEM:
            delete newState[action.wishItemId]
            return newState

        default:
            return state;
    }
}

export default wishItemsReducer;
