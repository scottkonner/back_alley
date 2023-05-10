import React, { useState } from "react";
import { editCartItemById } from "../../store/shopping_cart_items";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditCartItemModal.css";

function EditCartItemModal({cartItem}) {
  const dispatch = useDispatch();
  // const selectedServer = useSelector(state => state.spotState[parseInt(spotId)])  pull the server id from the server state
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

console.log('this is the cart item:', cartItem.id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(editCartItemById(cartItem.id, { quantity }));
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

        {/* <h2>Edit Your Review</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="edit-server-modal-input-container">
            <label htmlFor="name">How many copies would you like?</label>
            <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
export default EditCartItemModal;
