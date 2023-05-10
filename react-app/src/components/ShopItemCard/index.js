import './ShopItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCartItemById } from '../../store/shopping_cart_items'
import OpenModalButton from '../OpenModalButton';
import EditCartItemModal from '../EditCartItemModal';

const ShopItemCard = ({ shopItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

if(sessionUser){
     var isOwner = sessionUser.id === shopItem.user_id
}
    const totalPrice = shopItem.quantity * shopItem.Game.price


    const deleteHandler = () => {
        dispatch(deleteCartItemById(shopItem.id))
    }
    return (
        <div className="spotCard">
            <div className='spotCard-Pic'>
                <img  src={shopItem.Game.icon} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{shopItem.Game.name}</div>
            <div className='spotCard-Location'>Quantity: {shopItem.quantity}</div>
            <div className='spotCard-Price'>Price${shopItem.Game.price}</div>
            <div className='spotCard-Price'>Total: ${totalPrice}</div>
            <div className='spotCard-buttonBlock'>
            {isOwner && <div className='detailedGame-button'>
            <OpenModalButton
                buttonText="Edit"
                modalComponent={<EditCartItemModal cartItem={shopItem} />}
                />
            </div>}
                {isOwner && <button className='spotCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default ShopItemCard
