import React, { useState } from 'react';
import { useRfp } from '../context/RfpContext';
import Button from '../components/common/Button';
import { notify } from '../utils/toast';

const LandingPage = ({ onStart }) => {
  const [nameInput, setNameInput] = useState("");
  const { setUsername } = useRfp();

  const handleEnter = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      notify.error("Please enter your name to continue");
      return;
    }
    
    // Save to context
    setUsername(nameInput.trim());
    
    // Trigger navigation in parent
    onStart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center transform transition-all hover:scale-[1.01]">
        <div className="mb-6">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl text-white">🚀</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">ProcureFlow AI</h1>
          <p className="text-gray-500 mt-2">Intelligent RFP Management System</p>
        </div>

        <form onSubmit={handleEnter} className="space-y-6">
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you?
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Sanskar"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              autoFocus
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-4 text-lg rounded-xl"
          >
            Get Started →
          </Button>
        </form>
      </div>
      
      <p className="mt-8 text-sm text-gray-400">
        AI-Powered • SDE Assignment Demo
      </p>
    </div>
  );
};

export default LandingPage;