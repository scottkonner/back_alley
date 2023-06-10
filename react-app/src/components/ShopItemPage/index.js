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
    const Total = () => {
        let finalPrice =0
        for (let i =0; i < itemsArr.length; i++){
            finalPrice += (itemsArr[i].Game.price) * (itemsArr[i].quantity)
        }
        return finalPrice.toFixed(2)
    }

    useEffect(() => {
        dispatch(getUserCartItems()).then(() => setIsLoaded(true))
    }, [dispatch])

    const ShopPage_styles = {
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center'
      };

    const ShopTotal_styles = {
        position: 'absolute',
        left:'74vw',
        color:'white',
        fontSize: '22px',
        margin: '10px 130px 0px 0px'
      };


    return (
    <div className='ShopItemPage' style={ShopPage_styles}>
        <div className='ShopItemPage-header'>
            <div className='ShopItemPage-title'>My Cart</div>
        </div>
        <div>
            <div className='ShopItemPage-gameList'>
                {itemsArr.map(shopItem =>
                <ShopItemCard  shopItem ={shopItem}/>
                )}
            </div>
        </div>
        <div className='ShopItemPage-Total'>
        <div className='ShopItemPage-Total-price' style={ShopTotal_styles}>Subtotal : ${Total()}</div>
        </div>
    </div>
    )
}

export default ShopItemPage;
