import React from 'react';
import ReactModal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
  },
};

function Modal({ isOpen, onClose, title, children }) {
  return (
    <ReactModal style={customStyles} isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal">
      <div className={styles.head}>
        <h2>{title}</h2>
        <CloseIcon onClick={onClose} />
      </div>
      {children}
    </ReactModal>
  );
}

export default Modal;
