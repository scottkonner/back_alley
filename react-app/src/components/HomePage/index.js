import './HomePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../store/games';
import GameCard from '../GameCard';


const searchedGames = (query, gamePosts) => {
    if (!query) {
        return gamePosts
    }
    let queryLow = query.toLowerCase()
    return gamePosts.filter(game => game.name.toLowerCase().includes(queryLow))
}

const HomePage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const gamesObj = useSelector(state => state.games)
    const gamesArr = Object.values(gamesObj);
    const [query, setQuery] = useState("")
    const gamePosts = searchedGames( query, gamesArr)

    useEffect(() => {
        dispatch(getAllGames()).then(() => setIsLoaded(true))
    }, [dispatch])


    return (
    <div>
        <input
        type="text"
        placeholder="Search for deals here!"
        onChange={e => setQuery(e.target.value)} />
        <div className='gameList'>
            {gamePosts.map(game =>
            <GameCard  game ={game}/>
            )}
        </div>
    </div>
    )
}

export default HomePage;
