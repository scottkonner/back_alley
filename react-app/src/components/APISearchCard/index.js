import './APISearchCard.css'
import { useSelector, useDispatch } from 'react-redux'


const APISearchCard = ({ game, selected, setSelected }) => {
    const dispatch = useDispatch()


    const handleSelectedChange = (game) => {
    console.log('changed')
    console.log(game)
    setSelected(game);
    console.log('-----------', selected)
      };
    return (
        <div className="APICard">
            <div className='APICard-Pic'>
                <img  src={game.thumb} alt='not loading'></img>
            </div>
            <div className='APICard-Name'>{game.external}</div>
            <input
            type="radio"
            id={game.gameID}
            name="games"
            // value={APIArr[game]}
            checked={selected?.gameID === game.gameID}
            onChange={() => handleSelectedChange(game)}
          />
        </div>

    )
}

export default APISearchCard
