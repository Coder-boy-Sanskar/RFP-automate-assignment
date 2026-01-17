import React from 'react';
import { useRfp } from '../../context/RfpContext';
import Button from '../common/Button';

const ComparisonTable = () => {
  const { proposals } = useRfp();

  // Defensive check: If data isn't loaded yet, don't crash
  if (!proposals || proposals.length === 0) return null;

  // Logic: Identify the ID of the proposal with the highest AI Score
  // This allows us to highlight that specific column dynamically
  const bestProposalId = proposals.reduce((prev, current) => 
    (prev.aiScore > current.aiScore) ? prev : current
  ).id;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-8 border border-gray-100">
      <table className="w-full text-left border-collapse min-w-[600px]">
        {/* --- Table Header: Vendor Names --- */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 w-1/4 text-sm font-bold text-gray-500 uppercase tracking-wider">
              Comparison Criteria
            </th>
            {proposals.map(prop => (
              <th 
                key={prop.id} 
                className={`p-4 text-sm font-bold text-gray-800 border-l border-gray-100 relative ${
                  prop.id === bestProposalId ? 'bg-green-50/50' : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-lg">{prop.vendorName}</span>
                  {/* Badge for the AI Winner */}
                  {prop.id === bestProposalId && (
                    <span className="mt-1 inline-block text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wide w-fit">
                      ✨ AI Recommended
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* --- Table Body: Data Rows --- */}
        <tbody className="divide-y divide-gray-100">
          
          {/* Row 1: Price */}
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 font-semibold text-gray-600">Total Cost</td>
            {proposals.map(prop => (
              <td key={prop.id} className={`p-4 border-l border-gray-100 font-medium ${
                prop.id === bestProposalId ? 'bg-green-50/30' : ''
              }`}>
                {/* Format number as currency */}
                ${prop.price.toLocaleString()}
              </td>
            ))}
          </tr>

          {/* Row 2: Timeline */}
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 font-semibold text-gray-600">Timeline</td>
            {proposals.map(prop => (
              <td key={prop.id} className={`p-4 border-l border-gray-100 ${
                prop.id === bestProposalId ? 'bg-green-50/30' : ''
              }`}>
                {prop.timeline}
              </td>
            ))}
          </tr>

           {/* Row 3: Warranty */}
           <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 font-semibold text-gray-600">Warranty</td>
            {proposals.map(prop => (
              <td key={prop.id} className={`p-4 border-l border-gray-100 ${
                prop.id === bestProposalId ? 'bg-green-50/30' : ''
              }`}>
                {prop.warranty}
              </td>
            ))}
          </tr>

          {/* Row 4: AI Score (Visual Bar) */}
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-4 font-semibold text-gray-600 align-top pt-6">
              AI Match Score
              <p className="text-xs font-normal text-gray-400 mt-1">Based on requirements</p>
            </td>
            {proposals.map(prop => (
              <td key={prop.id} className={`p-4 border-l border-gray-100 ${
                prop.id === bestProposalId ? 'bg-green-50/30' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold ${
                    prop.aiScore >= 90 ? 'text-green-600' : prop.aiScore >= 70 ? 'text-yellow-600' : 'text-red-500'
                  }`}>
                    {prop.aiScore}
                  </span>
                  <span className="text-sm text-gray-400">/ 100</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                      prop.aiScore >= 90 ? 'bg-green-500' : prop.aiScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                    }`} 
                    style={{ width: `${prop.aiScore}%` }}
                  ></div>
                </div>
              </td>
            ))}
          </tr>

          {/* Row 5: Action Buttons */}
          <tr className="bg-gray-50">
            <td className="p-4"></td>
            {proposals.map(prop => (
              <td key={prop.id} className={`p-4 border-l border-gray-100 ${
                prop.id === bestProposalId ? 'bg-green-50/50' : ''
              }`}>
                <Button 
                  variant={prop.id === bestProposalId ? 'primary' : 'secondary'}
                  className="w-full py-2 text-sm shadow-sm"
                  onClick={() => alert(`You selected ${prop.vendorName}!`)}
                >
                  Select Vendor
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;