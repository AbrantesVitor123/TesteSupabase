
import React from 'react';

interface ClickButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-bold text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-800 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
  >
    <span className="relative px-16 py-4 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
      CLICK ME!
    </span>
  </button>
);

export default ClickButton;
