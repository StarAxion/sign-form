import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ResultMessage = (props) => {
  const element = document.createElement('div');
  element.classList.add('result-message');

  useEffect(() => {
    document.body.appendChild(element);
    return () => document.body.removeChild(element);
  }, [element]);

  return createPortal(props.children, element);
}

export default ResultMessage;
