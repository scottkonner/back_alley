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

    const Block1_styles = {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width: '1500px',
        height:'160px'
      };

    const Block2_styles = {
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'center',
      width: '270px',
      height: '160px'
      };

    const Block3_styles = {
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'flex-end',
      width: '100vw',
      height:'160px',
      margin:'0px 0px 0px 0px'

      };

    return (
        <div className="wishItemCard">
            <div className="wishItemCard-Block1" style={Block1_styles}>
                <div className='wishItemCard-Pic'>
                    <img  src={wishItem.Game.icon} alt='not loading'></img>
                </div>
                <div className='wishItemCard-Name'>{wishItem.Game.name}</div>
            </div>
            <div className="wishItemCard-Block2"></div>
            <div className="wishItemCard-Block3">
                <div className='wishItemCard-buttonBlock'>
                    {isOwner && <button className='wishItemCard-button' onClick={deleteHandler}>Delete</button>}
                </div>
                <div className='wishItemCard-Price'>Price: ${displayPrice}</div>
            </div>
        </div>
    )
}

export default WishItemCard
