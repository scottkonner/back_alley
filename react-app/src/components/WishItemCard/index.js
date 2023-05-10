import './WishItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteWishItemById } from '../../store/wishlist_items'

const WishItemCard = ({ wishItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === wishItem.userId
}




    const deleteHandler = () => {
        dispatch(deleteWishItemById(wishItem.id))
    }
    return (
        <div className="spotCard">Hi Wishlist
            {/* <div className='spotCard-Pic'>
                <img  src={spot.previewImage} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{spot.name}</div>
            <div className='spotCard-Location'>{spot.city},{spot.state}</div>
            <div className='spotCard-Price'>${spot.price} per night</div>
            <div className='spotCard-buttonBlock'>
                <button className='spotCard-button'onClick={event => window.location.href=`/${spot.id}`}>Details</button>
                {isOwner && <button className='spotCard-button' onClick={event => window.location.href=`/editspot/${spot.id}`}>Edit</button>}
                {isOwner && <button className='spotCard-button' onClick={deleteHandler}>Delete</button>}
            </div> */}
        </div>
    )
}

export default WishItemCard
