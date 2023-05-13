import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../store/games';
import APISearchCard from '../APISearchCard';
import OpenModalButtonLarge from '../OpenModalButtonLarge';
import CreateGameModal from '../CreateGameModal';
import EditGameModal from '../EditGameModal';
import './APISearchPage.css';


const APISearchPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    const [data, setData] = useState(null)
    const [selected, setSelected] = useState(null)
    const gamesObj = useSelector(state => state.games)
    const gamesArr = Object.values(gamesObj);


    if(data){
        var APIArr = Object.values(data);
    }

    if(selected){
      var findTheGame = gamesArr.find(game => (game.API_id === parseInt(selected.gameID)))
    }

    useEffect(() => {
      dispatch(getAllGames())

    }, [dispatch])

    useEffect(() => {
        if(!query){
            return
        }
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
          .then(res => {
            if (res.ok) {
                console.log('yay, i caught it')
            }
            else{
                console.log('hi tinkerbell')
            }
            res.json()
            .then(data => setData(data))
            .catch(err => console.log('ERROR'))
        })
      }, []);

    console.log(data)


    const handleSubmit = async () => {
        // Check to make sure the input isn't empty or made entirely of spaces
        if (!query.trim().length) {
          return console.log('no blank searches!')
        }
        const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
        if (res.ok){
            const resData = await res.json()
                if (resData.length > 0){
                    console.log(resData)
                    setData(resData)
                }
                else{
                    return window.alert("Looks like we couldn't find that one.  Try a different game or simplify your search.")
                }
        }
        else {
            console.log('bad response from API')
        }
    }


    const sendWithEnter = (e) => {
        if(e.key === "Enter") handleSubmit()
      }

    return (
      <div className='APISearchPage-container'>
        <div className='APISearchPage-header-container'>
          <div className='APISearchPage-title'>Create a new Post!</div>
          <div className='APISearchPage-text'>First step, search for the game you wish to post</div>
          <div className="APISearchPage-search-container">
          <input
          type="text"
          className="APISearchPage-search"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={sendWithEnter}
            />
          <button className="APISearchPage-search-button" onClick={handleSubmit}>Search</button>
        </div>
        <div className='APISearchPage-selected-container'>
            {APIArr && selected && !findTheGame && <span className="APISearchPage-selected-button">
               <div className=''>
                 <OpenModalButtonLarge
                   buttonText="Select Game"
                   modalComponent={<CreateGameModal game={selected}/>}
                 />
        	     </div>
              </span>}
            {APIArr && selected && findTheGame && <span className="APISearchPage-selected-button">
               <div className=''>
                 <OpenModalButtonLarge
                   buttonText="Select Game"
                   modalComponent={<EditGameModal game={findTheGame}/>}
                 />
        	     </div>
              </span>}</div>

        </div>

        <div>
        {APIArr && <div className='APISearchPage-gameList'>
            {APIArr.map(game =>(
                <>
            <APISearchCard  game ={game} selected ={selected} setSelected ={setSelected}/>
          </>)

            )}
        </div>}

        </div>
      </div>

        );

}

export default APISearchPage;
