const LOAD_GAMES = "games/loadGames";
const LOAD_USER_GAMES = 'games/userGames';
const LOAD_GAME_BY_ID = 'games/loadGameById';
const CREATE_GAME = "games/createGame";
const EDIT_GAME = 'games/editGame';
const DELETE_GAME = "games/deleteGame";


const loadGames = (games) => ({
    type: LOAD_GAMES,
    games
});

const loadUserGames = (userGames) => ({
    type: LOAD_USER_GAMES,
    userGames
});

const loadGameById = (game) => ({
    type: LOAD_GAME_BY_ID,
    game
});

const createGame = (game) => ({
    type: CREATE_GAME,
    game
});

const editGame = (game) => ({
    type: EDIT_GAME,
    game
});

const deleteGame = (gameId) => ({
    type: DELETE_GAME,
    gameId
});

export const getAllGames = () => async (dispatch) => {
    const response = await fetch("/api/games/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadGames(data.games));
    }
};

export const getUserGames = () => async (dispatch) => {
    const response = await fetch("/api/games/current");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserGames(data));
        return data
    }
};

export const getGameById = (id) => async (dispatch) => {
    const response = await fetch(`/api/games/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadGameById(data));
    }
};


export const createAGame = (game) => async (dispatch) => {
    const response = await fetch("/api/games/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(game)
    });
    if (response.ok) {
        const game = await response.json();
        return dispatch(createGame(game))
    }
    return response
};

export const editGameById = (gameId, payload) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const game = await response.json();
        dispatch(editGame(game))
        return
    }
    return response
};

export const deleteGameById = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteGame(gameId))
    }
};



const initialState = {

};
const gamesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {

        case LOAD_GAMES:

            action.games.forEach(game => {
                newState[game.id] = game
            });
            return newState

        case LOAD_USER_GAMES:
            newState = {}
            action.userGames.forEach(game => {
                newState[game.id] = game
            });
            return newState

        case LOAD_GAME_BY_ID:
            newState[action.game.id] = action.game
            return newState;

        case CREATE_GAME:
            newState[action.game.id] = action.game
            return newState;

        case EDIT_GAME:
            newState[action.game.id] = action.game;
            return newState;

        case DELETE_GAME:
            delete newState[action.gameId]
            return newState

        default:
            return state;
    }
}

export default gamesReducer;
