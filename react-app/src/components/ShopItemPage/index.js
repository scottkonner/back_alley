import './ShopItemPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartItems } from '../../store/shopping_cart_items';
import ShopItemCard from '../ShopItemCard';


const ShopItemPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const itemsObj = useSelector(state => state.cartItems)
    const itemsArr = Object.values(itemsObj);


    useEffect(() => {
        dispatch(getUserCartItems()).then(() => setIsLoaded(true))
    }, [dispatch])


    return (
    <div>
        <div className='gameList'>
            {itemsArr.map(shopItem =>
            <ShopItemCard  shopItem ={shopItem}/>
            )}
        </div>
    </div>
    )
}

export default ShopItemPage;
