import React, { useState } from "react";
import {editGameById } from "../../store/games";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import "./EditGameModal.css";

function EditGameModal({game}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [user_id, setUser_id] = useState(game.user_id);
  const [API_id, setAPI_id] = useState(game.API_id);
  const [name, setName] = useState(game.name);
  const [price, setPrice] = useState(game.price);
  const [store, setStore] = useState(game.store);
  const [icon, setIcon] = useState(game.icon);
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();


  const fixedPrice = parseFloat(price).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const gamePayload = {
      user_id,
      API_id,
      name,
      store,
      price: fixedPrice,
      icon
    }

    console.log('should have something', gamePayload)
    console.log(game.id)
    const data = await dispatch(editGameById(game.id, gamePayload));
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

        <h2>Whats the deal?</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit-server-modal-input-container">
            <label htmlFor="name">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label htmlFor="name">Store</label>
            <input
              type="text"
              name="store"
              value={store}
              onChange={(e) => setStore(e.target.value)}
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
export default EditGameModal;
