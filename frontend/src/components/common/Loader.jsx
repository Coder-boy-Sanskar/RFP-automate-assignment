import React from 'react';

const Loader = ({ size = "md", color = "border-blue-600" }) => {
  // Map size prop to specific CSS classes
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4"
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-gray-200 border-t-transparent ${color} ${sizeClasses[size] || sizeClasses.md}`}
      ></div>
    </div>
  );
};

export default Loader;