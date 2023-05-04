import './ShopItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpot } from '../../store/spot'

const ShopItemCard = ({ shopItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === shopItem.userId
}




    const deleteHandler = () => {
        dispatch(deleteSpot(shopItem.id))
    }
    return (
        <div className="spotCard">
            <div className='spotCard-Pic'>
                <img  src={spot.previewImage} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{spot.name}</div>
            <div className='spotCard-Location'>{spot.city},{spot.state}</div>
            <div className='spotCard-Price'>${spot.price} per night</div>
            <div className='spotCard-buttonBlock'>
                <button className='spotCard-button'onClick={event => window.location.href=`/${spot.id}`}>Details</button>
                {isOwner && <button className='spotCard-button' onClick={event => window.location.href=`/editspot/${spot.id}`}>Edit</button>}
                {isOwner && <button className='spotCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default ShopItemCard
