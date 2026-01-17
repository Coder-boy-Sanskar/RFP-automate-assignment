import React from 'react';

const Checkbox = ({ label, checked, onChange, className = '' }) => {
  return (
    <label className={`flex items-center cursor-pointer select-none ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only" 
          checked={checked}
          onChange={onChange}
        />
        {/* Custom Box UI */}
        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
        
        {/* Checkmark Icon (SVG) */}
        <svg
          className={`absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      {/* Label Text */}
      {label && <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;