import './WishItemPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishItems } from '../../store/wishlist_items';
import WishItemCard from '../WishItemCard';


const WishItemPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const itemsObj = useSelector(state => state.wishItems)
    const itemsArr = Object.values(itemsObj);

    useEffect(() => {
        dispatch(getUserWishItems()).then(() => setIsLoaded(true))
    }, [dispatch])

    const WishPage_styles = {
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center'
      };

    return (
    <div className='WishItemPage' style={WishPage_styles}>
        <div className='WishItemPage-header'>
            <div className='WishItemPage-title'>My Wishlist</div>
        </div>
        <div>
            <div className='WishItemPage-gameList'>
                {itemsArr.map(wishItem =>
                <WishItemCard  wishItem ={wishItem}/>
                )}
            </div>
        </div>
    </div>
    )
}

export default WishItemPage;
