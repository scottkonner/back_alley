import './ReviewList.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByGame } from '../../store/reviews';
import ReviewCard from '../ReviewCard/ReviewCard';


const ReviewList = () => {
    const {gameId} =useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const reviewsObj = useSelector(state => state.reviews)
    const reviewsArr = Object.values(reviewsObj);





    useEffect(() => {
        dispatch(getReviewsByGame(gameId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
    <div>
        {isLoaded && reviewsArr.map(review =>
        <ReviewCard review ={review} key={review.id}/>

    )}

    </div>
    )
}

export default ReviewList;
