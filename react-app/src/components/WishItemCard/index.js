import './WishItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteWishItemById } from '../../store/wishlist_items'

const WishItemCard = ({ wishItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

if(sessionUser){
     var isOwner = sessionUser.id === wishItem.user_id
}

    const deleteHandler = () => {
        dispatch(deleteWishItemById(wishItem.id))
    }
    return (
        <div className="spotCard">
            <div className='spotCard-Pic'>
                <img  src={wishItem.Game.icon} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{wishItem.Game.name}</div>
            <div className='spotCard-Price'>Current Price: ${wishItem.Game.price}</div>
            <div className='spotCard-buttonBlock'>
                {isOwner && <button className='spotCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default WishItemCard
