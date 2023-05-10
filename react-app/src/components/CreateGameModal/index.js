import React, { useState } from "react";
import {createAGame } from "../../store/games";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import "./CreateGameModal.css";

function CreateGameModal({game}) {
  const dispatch = useDispatch();
  let history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [price, setPrice] = useState();
  const [store, setStore] = useState();
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const gamePayload = {
      user_id: sessionUser.id,
      API_id: game.gameID,
      name: game.external,
      store,
      price,
      icon: game.thumb
    }

    console.log('should have something', gamePayload)
    const data = await dispatch(createAGame(gamePayload));
    // if (data) {
    //   const {error} = await data.json()
    //   setErrors(error);
    // } else {
        closeModal()
        history.push('/home')
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
export default CreateGameModal;
