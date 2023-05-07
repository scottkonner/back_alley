import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { deleteReviewById } from '../../store/review'

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === review.userId

}

// console.log('reviewOwner Id:', review.userId)
// console.log('sessionId:',sessionUser.id)

    const deleteHandler = () => {
        dispatch(deleteReviewById(review.id))

    }
    return (
        <div className="reviewCard">
            <div>{review.content}</div>
            <div>By {review.User.name}</div>
            {isOwner && <button onClick={deleteHandler} className='reviewCard-button'>Delete</button>}
        </div>
    )
}

export default ReviewCard
