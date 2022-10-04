import { useEffect } from "react";
import { createPortal } from "react-dom"
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, children }) {
  
  useEffect(() => {
    document.addEventListener("keydown", closeModal);
   document.removeEventListener("keydown", closeModal);
})

//    useEffect(() => {
   
//     document.removeEventListener("keydown", closeModal);
// })

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      onClose();
    }
  }

  return createPortal(
            <div className={css.overlay} onClick={closeModal}>
              <div  className={css.modal}> 
                  {children}
              </div>
          </div>,
          modalRoot, 
        
      );
}



Modal.propTypes = {
    closeModal: PropTypes.func
}
