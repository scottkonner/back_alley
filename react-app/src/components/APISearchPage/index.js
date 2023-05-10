import './APISearchPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllGames } from '../../store/games';
import APISearchCard from '../APISearchCard';
import OpenModalButton from '../OpenModalButton';
import CreateGameModal from '../CreateGameModal';


// const searchedGames = (query, gamePosts) => {
//     if (!query) {
//         return gamePosts
//     }
//     let queryLow = query.toLowerCase()
//     return gamePosts.filter(game => game.name.toLowerCase().includes(queryLow))
// }

const APISearchPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    const [data, setData] = useState(null)
    const [selected, setSelected] = useState(null)
    const gamesObj = useSelector(state => state.games)
    const gamesArr = Object.values(gamesObj);
    // const APIArr = Object.values(data);
    console.log('-----------', selected)


    if(data){
        var APIArr = Object.values(data);
    }

    // const gamePosts = searchedGames( query, gamesArr)

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

    // const handleSelectedChange = (game) => {
    //     console.log('changed')
    //     console.log(APIArr[3])
    //     console.log(game)
    //     setSelected(game);
    //     console.log('-----------', selected)
    //   };

    const sendWithEnter = (e) => {
        if(e.key === "Enter") handleSubmit()
      }

    return (
      <div>
        <div>First step, search for the game you wish to post</div>
        <div className="chat-input-container">
          <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={sendWithEnter}
            />
          <button onClick={handleSubmit}>Send</button>
        </div>
        {APIArr && selected && <span className="edit-icon">
               <div className=''>
                 <OpenModalButton
                   buttonText="Select Game"
                   modalComponent={<CreateGameModal game={selected}/>}
                 />
        	     </div>
              </span>}
        <div>
        {APIArr && <div className='API-gameList'>
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
