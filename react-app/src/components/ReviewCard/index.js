import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { editReviewById, deleteReviewById } from '../../store/reviews'
import OpenModalButtonSmall  from '../OpenModalButtonSmall';
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
            <div>By {review.User.username}</div>
            {isOwner && <div>
            <OpenModalButtonSmall
                buttonText="Edit"
                modalComponent={<EditReviewModal review={review} />}
                />
            </div>}
              {isOwner && <div  onClick={deleteHandler}>
                <button className="reviewCard-button">Delete</button>
              </div>}
        </div>
    )
}

export default ReviewCard
