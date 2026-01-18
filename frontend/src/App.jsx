import React, { useState } from 'react';
import { RfpProvider } from './context/RfpContext';
import CreateRfpPage from './pages/CreateRfpPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';

function App() {
  // 'landing' | 'create' | 'dashboard'
  const [currentView, setCurrentView] = useState('landing'); 

  return (
    <RfpProvider>
      {/* Show Navigation only if NOT on landing page */}
      {currentView !== 'landing' && (
        <div className="fixed top-4 right-4 z-50 bg-white shadow-md p-2 rounded-lg border border-gray-200">
           <button 
             onClick={() => setCurrentView('create')} 
             className={`px-3 py-1 mr-2 rounded text-sm font-medium transition ${currentView === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
           >
             1. Create
           </button>
           <button 
             onClick={() => setCurrentView('dashboard')} 
             className={`px-3 py-1 rounded text-sm font-medium transition ${currentView === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
           >
             2. RFP Details
           </button>
        </div>
      )}

      {/* Routing Logic */}
      {currentView === 'landing' && (
        <LandingPage onStart={() => setCurrentView('create')} />
      )}
      
      {currentView === 'create' && (
        <CreateRfpPage />
      )}
      
      {currentView === 'dashboard' && (
        <DashboardPage />
      )}

    </RfpProvider>
  );
}

export default App;