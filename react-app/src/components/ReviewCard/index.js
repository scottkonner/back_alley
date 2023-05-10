import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { editReviewById, deleteReviewById } from '../../store/reviews'
import OpenModalButton  from '../OpenModalButton';
import EditReviewModal  from '../EditReviewModal';
import EditIconImg from '../../assets/pencil.png'
import DeleteImg from '../../assets/delete.png'

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

if(sessionUser){
     var isOwner = sessionUser.id === review.user_id
}

    const deleteHandler = () => {
        dispatch(deleteReviewById(review.game_id, review))

    }
    return (
        <div className="reviewCard">
            <div>{review.content}</div>
            <div>By {review.User.name}</div>
            {isOwner && <div className='detailedGame-button'>
            <OpenModalButton
                buttonText="Edit"
                modalComponent={<EditReviewModal review={review} />}
                />
            </div>}
              {isOwner && <span className="delete-icon" onClick={deleteHandler}>
                <img src={DeleteImg} />
              </span>}
        </div>
    )
}

export default ReviewCard
