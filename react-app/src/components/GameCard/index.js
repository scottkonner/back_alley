import './GameCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteGameById } from '../../store/games'

const GameCard = ({ game }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const displayPrice = (game.price).toFixed(2)


    if(sessionUser){
        var isOwner = sessionUser.id === game.userId
    }




    const deleteHandler = () => {
        dispatch(deleteGameById(game.id))
    }
    return (
        <div className="gameCard">
            <div className='gameCard-Pic'>
                <img  src={game.icon} alt='not loading'></img>
            </div>
            <div className='gameCard-Name'>{game.name}</div>
            <div className='gameCard-Location'>{game.store}</div>
            <div className='gameCard-Price'>${displayPrice}</div>
            <div className='gameCard-buttonBlock'>
                <button className='gameCard-button'onClick={event => window.location.href=`/games/${game.id}`}>Details</button>
                {isOwner && <button className='gameCard-button' onClick={event => window.location.href=`/editspot/${game.id}`}>Edit</button>}
                {isOwner && <button className='gameCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default GameCard
