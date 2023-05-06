import './GameCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteGameById } from '../../store/games'

const GameCard = ({ game }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === game.userId
}




    const deleteHandler = () => {
        dispatch(deleteGameById(game.id))
    }
    return (
        <div className="spotCard">
            <div className='spotCard-Pic'>
                <img  src={game.icon} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{game.name}</div>
            <div className='spotCard-Location'>{game.store}</div>
            <div className='spotCard-Price'>${game.price}</div>
            <div className='spotCard-buttonBlock'>
                <button className='spotCard-button'onClick={event => window.location.href=`/${game.id}`}>Details</button>
                {isOwner && <button className='spotCard-button' onClick={event => window.location.href=`/editspot/${game.id}`}>Edit</button>}
                {isOwner && <button className='spotCard-button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default GameCard
