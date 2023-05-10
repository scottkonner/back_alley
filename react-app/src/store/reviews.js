const LOAD_REVIEWS = "reviews/loadReviews";
const LOAD_USER_REVIEWS = 'reviews/userReviews';
const LOAD_REVIEW_BY_ID = 'reviews/loadReviewById';
const LOAD_REVIEWS_BY_GAME = 'reviews/loadReviewsByGame';
const CREATE_REVIEW = "reviews/createReview";
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = "reviews/deleteReview";


const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const loadUserReviews = (userReviews) => ({
    type: LOAD_USER_REVIEWS,
    userReviews
});

const loadReviewById = (review) => ({
    type: LOAD_REVIEW_BY_ID,
    review
});

const loadReviewsByGame = (gameReviews) => ({
    type: LOAD_REVIEWS_BY_GAME,
    gameReviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const getAllReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data.reviews));
    }
};

export const getUserReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/current");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserReviews(data));
        return data
    }
};

export const getReviewById = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviewById(data));
    }
};

export const getReviewsByGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviewsByGame(data));
    }
};


export const createAReview = (gameId, review) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const review = await response.json();
        return dispatch(createReview(review))
    }
    return response
};

export const editReviewById = (gameId, reviewId, payload) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/reviews/${reviewId}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(editReview(review))
        return
    }
    return response
};

export const deleteReviewById = (gameId, review) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/reviews/${review.id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteReview(review.id))
    }
};



const initialState = {

};
const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {

        case LOAD_REVIEWS:

            action.reviews.forEach(review => {
                newState[review.id] = review
            });
            return newState

        case LOAD_USER_REVIEWS:
            newState = {}
            action.userReviews.forEach(review => {
                newState[review.id] = review
            });
            return newState

        case LOAD_REVIEW_BY_ID:
            newState[action.review.id] = action.review
            return newState;

        case LOAD_REVIEWS_BY_GAME:
            newState = {}
            action.gameReviews.forEach(review => {
                newState[review.id] = review
            });
            return newState

        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState;

        case EDIT_REVIEW:
            newState[action.review.id] = action.review;
            return newState;

        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState

        default:
            return state;
    }
}

export default reviewsReducer;
