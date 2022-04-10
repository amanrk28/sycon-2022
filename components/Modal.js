import { createPortal } from 'react-dom';

const containerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 50,
  backgroundColor: 'rgba(0,0,0,0.5)',
};

const innerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 50,
  padding: '24px',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
};

export default function Modal({ isOpen }) {
  return isOpen
    ? createPortal(
        <>
          <div style={containerStyle} />
          <div style={innerStyle}>
            <div className="loader" />
          </div>
        </>,
        document.getElementById('portal')
      )
    : null;
}
