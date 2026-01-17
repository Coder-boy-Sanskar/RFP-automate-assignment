import React from 'react';
import Loader from './Loader';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  isLoading = false,
  type = 'button',
  className = ''
}) => {
  
  // Define styles for different variants
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none transform-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${disabled || isLoading ? disabledStyle : variants[variant]} ${className}`}
    >
      {/* If loading, show a tiny spinner alongside text */}
      {isLoading && <Loader size="sm" color="border-white" />}
      {isLoading ? "Processing..." : children}
    </button>
  );
};

export default Button;