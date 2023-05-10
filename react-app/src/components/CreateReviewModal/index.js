import React, { useState } from "react";
import { createAReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import "./CreateReviewModal.css";

function CreateReviewModal({game}) {
  const dispatch = useDispatch();
  // const {gameId} = useParams()
  // const selectedServer = useSelector(state => state.spotState[parseInt(spotId)])  pull the server id from the server state
  const [content, setContent] = useState();
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  console.log('right here my guy:', game)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(createAReview(game.id, { content }));
    // if (data) {
    //   const {error} = await data.json()
    //   setErrors(error);
    // } else {
        closeModal()
    // }
  };

  return (
    <div className="edit-server-modal">
      <div className="edit-server-modal-content">

        {/* <h2>Create your Review</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="edit-server-modal-input-container">
            <label htmlFor="name">Your Review</label>
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="edit-server-modal-button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateReviewModal;
