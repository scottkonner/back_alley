import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButtonLarge.css';

function OpenModalButtonLarge({
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
    borderRadius: '10px',
    margin: '25px 130px 0px 0px',
    fontSize: '22px',
    backgroundColor: 'rgb(98, 136, 165)',
    color: 'white',
    fontFamily: 'arial, helvetica, sans-serif',
    fontWeight: 'bold',
    borderWidth: '4px',
    cursor: 'pointer',
    height:'46px'
  };

  return (
    <button onClick={onClick} style={styles} className='ModalButtonLarge-button'>{buttonText}</button>
  );
}

export default OpenModalButtonLarge;
