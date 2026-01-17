import React from 'react';
import RfpInput from '../components/rfp/RfpInput';
import RfpPreview from '../components/rfp/RfpPreview';
import VendorList from '../components/vendors/VendorList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRfp } from '../context/RfpContext';

const CreateRfpPage = () => {
    const { username } = useRfp();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* UPDATED HEADER */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">ProcureFlow AI</h1>
            <p className="text-gray-500">Create RFPs and manage vendors in seconds.</p>
          </div>
          
          {/* Welcome Badge (Top Right) */}
          {username && (
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">
                Welcome, {username}
              </span>
            </div>
          )}
        </header>

        <RfpInput />
        <RfpPreview />
        <VendorList />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CreateRfpPage;