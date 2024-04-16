import React, { useEffect, useRef } from "react";
import "../App.css";


const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    // clear function in unMount Phase
    return () =>  document.removeEventListener("mousedown", handleOutsideClick);
    
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md relative" ref={modalRef}>
        <button
          className="absolute top-2 right-2 "
          onClick={onClose}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
