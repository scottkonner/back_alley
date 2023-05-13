import './ShopItemCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCartItemById } from '../../store/shopping_cart_items'
import OpenModalButtonSmall from '../OpenModalButtonSmall';
import EditCartItemModal from '../EditCartItemModal';

const ShopItemCard = ({ shopItem }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const displayPrice = (shopItem.Game.price).toFixed(2)

if(sessionUser){
     var isOwner = sessionUser.id === shopItem.user_id
}
    const totalPrice = shopItem.quantity * shopItem.Game.price


    const deleteHandler = () => {
        dispatch(deleteCartItemById(shopItem.id))
    }
    return (
        <div className="shopItemCard">
            <div className='shopItemCard-Pic'>
                <img  src={shopItem.Game.icon} alt='not loading'></img>
            </div>
            <div className='shopItemCard-Name'>{shopItem.Game.name}</div>
            <div className='shopItemCard-Location'>Quantity: {shopItem.quantity}</div>
            <div className='shopItemCard-Price'>Price${displayPrice}</div>
            <div className='shopItemCard-Price'>Total: ${totalPrice}</div>
            <div className='spotCard-buttonBlock'>
            {isOwner && <div>
            <OpenModalButtonSmall
                buttonText="Edit"
                modalComponent={<EditCartItemModal cartItem={shopItem} />}
                />
            </div>}
                {isOwner && <button className='shopItemCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default ShopItemCard
