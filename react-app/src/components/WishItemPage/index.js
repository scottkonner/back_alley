import './WishItemPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishItems } from '../../store/wishlist_items';
import WishItemCard from '../WishItemCard';


const WishItemPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const itemsObj = useSelector(state => state.wishItems)
    console.log('is this bad?' , itemsObj)
    const itemsArr = Object.values(itemsObj);

    useEffect(() => {
        dispatch(getUserWishItems()).then(() => setIsLoaded(true))
    }, [dispatch])


    return (
    <div>
        <div className='gameList'>
            {itemsArr.map(wishItem =>
            <WishItemCard  wishItem ={wishItem}/>
            )}
        </div>
    </div>
    )
}

export default WishItemPage;
