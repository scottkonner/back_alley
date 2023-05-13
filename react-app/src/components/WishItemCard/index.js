import './WishItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteWishItemById } from '../../store/wishlist_items'

const WishItemCard = ({ wishItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const displayPrice = (wishItem.Game.price).toFixed(2)

    if(sessionUser){
        var isOwner = sessionUser.id === wishItem.user_id
    }

    const deleteHandler = () => {
        dispatch(deleteWishItemById(wishItem.id))
    }
    return (
        <div className="wishItemCard">
            <div className='wishItemCard-Pic'>
                <img  src={wishItem.Game.icon} alt='not loading'></img>
            </div>
            <div className='wishItemCard-Name'>{wishItem.Game.name}</div>
            <div className='wishItemCard-Price'>Current Price: ${displayPrice}</div>
            <div className='wishItemCard-buttonBlock'>
                {isOwner && <button className='wishItemCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default WishItemCard
