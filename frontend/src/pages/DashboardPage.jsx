import React, { useEffect } from 'react';
import { useRfp } from '../context/RfpContext';
import ComparisonTable from '../components/dashboard/ComparisonTable';
import AiInsight from '../components/dashboard/AiInsights';
import Loader from '../components/common/Loader';
import { ToastContainer } from 'react-toastify';

const DashboardPage = () => {
  const { loading, proposals, fetchProposals } = useRfp();

  // Simulate fetching data when the page loads
  // In a real app, this might happen after navigating from the Create RFP page
  useEffect(() => {
    if (proposals.length === 0) {
      fetchProposals();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Proposal Comparison</h1>
            <p className="text-gray-500 mt-1">Ref ID: #RFP-2026-001 • Status: <span className="text-green-600 font-semibold">3 Responses Received</span></p>
          </div>
          <button className="text-blue-600 font-semibold hover:underline">
            ← Back to RFP List
          </button>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader size="lg" color="border-blue-600" />
            <p className="mt-4 text-gray-600 font-medium">AI is parsing vendor emails...</p>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && proposals.length > 0 && (
          <div className="animate-fade-in-up">
            {/* 1. The "Why" - AI Recommendation */}
            <AiInsight />
            
            {/* 2. The Data - Comparison Matrix */}
            <ComparisonTable />
            
            {/* 3. Raw Data / Debug View (Optional, good for demoing JSON parsing) */}
            <div className="mt-8 p-4 bg-gray-200 rounded text-xs text-gray-500 font-mono">
              <p className="mb-2 font-bold uppercase">Debug: Raw Parsed Data</p>
              {JSON.stringify(proposals, null, 2)}
            </div>
          </div>
        )}

      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default DashboardPage;