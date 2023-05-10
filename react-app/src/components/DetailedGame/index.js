import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getGameById, deleteGameById } from '../../store/games';
import { getReviewsByGame } from '../../store/reviews';
import ReviewList from '../ReviewList/index';
import OpenModalButton from '../OpenModalButton';
import './DetailedGame.css'
import EditGameModal from '../EditGameModal';
import CreateReviewModal from '../CreateReviewModal';
import { createACartItem } from '../../store/shopping_cart_items'
import { createAWishItem } from '../../store/wishlist_items'

const DetailedGame = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showButton, setShowButton] = useState(true)
    let history = useHistory()

    const dispatch = useDispatch()
    const { gameId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const gamesObj = useSelector(state => state.games)
    const selectedGame = Object.values(gamesObj)[0];
console.log('this is the game:', selectedGame)

    useEffect(() => {
        dispatch(getGameById(gameId))
            .then(() => dispatch(getReviewsByGame(gameId)))
            .then(() => setIsLoaded(true))

    }, [dispatch])

    const reviewsObj = useSelector(state => state.reviews)
    const reviewsArr = Object.values(reviewsObj);
    // const findTheReview = reviewsArr.find(review => review.userId === sessionUser.id)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if (sessionUser && selectedGame) {
        var isOwner = sessionUser.id === selectedGame.user_id
        var findTheReview = reviewsArr.find(review => review.game_id === selectedGame.id)
    }

    const deleteHandler = () => {
        dispatch(deleteGameById(selectedGame.id))
        history.push('/home')
    }

    const addToCart = () => {
        dispatch(createACartItem(selectedGame.id))
        history.push('/shoppingcart')
    }

    const addToWishlist = () => {
        dispatch(createAWishItem(selectedGame.id, ))
        history.push('/wishlist')
    }

    return isLoaded ? (
        <div className='detailedSpot'>
            <div className='detailedSpot-pic'>
                <img src={selectedGame.icon} alt='not loading'></img>
            </div>

            <div className='detailedSpot-text-title'>{selectedGame.name}</div>
            <div className='detailedSpot-text'>{selectedGame.store}</div>
            <div className='detailedSpot-text'>${selectedGame.price}</div>

            <div className='detailedSpot-text'>Last Updated: {selectedGame.updated_at}</div>

            <div className='detailedSpot-buttonBlock'>
                {/* <button onClick={openMenu} className='detailedSpot-button'>
                    Reviews
                </button> */}
            <div className='detailedGame-button'>
            <OpenModalButton
                buttonText="Leave a Review"
                modalComponent={<CreateReviewModal game={selectedGame} />}
                />
            </div>
            {isOwner && <div className='detailedGame-button'>
            <OpenModalButton
                buttonText="Edit Game Post"
                modalComponent={<EditGameModal game={selectedGame} />}
                />
            </div>}
                {isOwner && <button onClick={deleteHandler} className='detailedGame-button'>Delete Game Post</button>}
                <button onClick={addToCart} className='detailedGame-button'>Add To Cart</button>
                <button onClick={addToWishlist} className='detailedGame-button'>Add To Wishlist</button>
            </div>

                <div className="profile-dropdown">
                    <ReviewList />

                </div>




        </div>
    ) : null
}

export default DetailedGame
