import React from 'react';
import { useRfp } from '../../context/RfpContext';

const AiInsight = () => {
  const { proposals } = useRfp();

  if (!proposals || proposals.length === 0) return null;

  // Get the best proposal for the main recommendation
  const bestProposal = proposals.reduce((prev, current) => 
    (prev.aiScore > current.aiScore) ? prev : current
  );

  return (
    <div className="bg-indigo-900 text-white rounded-lg p-6 mb-8 shadow-xl">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-700 p-3 rounded-full">
          {/* Simple Sparkles Icon */}
          <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">AI Recommendation</h3>
          <p className="text-indigo-100 text-lg leading-relaxed mb-4">
            Based on your criteria, <strong className="text-white">{bestProposal.vendorName}</strong> is the strongest candidate. 
          </p>
          <div className="bg-indigo-800 bg-opacity-50 p-4 rounded border border-indigo-700">
            <p className="italic">"{bestProposal.reasoning}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsight;