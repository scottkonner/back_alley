import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButtonSmall.css';

function OpenModalButtonSmall({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const styles = {
    borderRadius: '3px',
    margin: '0 4px',
    fontSize: '11px',
    backgroundColor: 'rgb(98, 136, 165)',
    color: 'white',
    fontFamily: 'arial, helvetica, sans-serif',
    fontWeight: 'bold',
    padding: '4px 9px',
    cursor: 'pointer',
  };


  return (
    <button onClick={onClick} style={styles} className='ModalButtonSmall-button'>{buttonText}</button>
  );
}

export default OpenModalButtonSmall;
