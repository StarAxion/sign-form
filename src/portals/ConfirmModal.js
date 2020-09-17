import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ConfirmModal = (props) => {
  const element = document.createElement('div');
  element.classList.add('modal-container');

  useEffect(() => {
    document.body.appendChild(element);
    return () => document.body.removeChild(element);
  }, [element]);

  return createPortal(props.children, element);
}

export default ConfirmModal;
