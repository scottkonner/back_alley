import React, { useState } from "react";
import { editReviewById } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditReviewModal.css";

function EditReviewModal({review}) {
  const dispatch = useDispatch();
  // const selectedServer = useSelector(state => state.spotState[parseInt(spotId)])  pull the server id from the server state
  const [content, setContent] = useState(review.content);
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(editReviewById(review.game_id, review.id, { content }));
    if (data) {
      const {error} = await data.json()
      setErrors(error);
    } else {
        closeModal()
    }
  };

  return (
    <div className="edit-server-modal">
      <div className="edit-server-modal-content">

        {/* <h2>Edit Your Review</h2> */}
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
            <button type="submit">Edit</button>
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditReviewModal;
