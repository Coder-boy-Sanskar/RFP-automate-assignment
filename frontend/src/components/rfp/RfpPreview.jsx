import React from 'react';
import { useRfp } from '../../context/RfpContext';

const RfpPreview = () => {
  const { structuredRfp } = useRfp();

  if (!structuredRfp) return null;

  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
      <h3 className="text-lg font-bold text-blue-900 mb-3">2. AI Generated RFP Structure</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white p-3 rounded shadow-sm">
          <span className="block text-gray-500 text-xs uppercase">Budget</span>
          <span className="font-semibold">{structuredRfp.budget}</span>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <span className="block text-gray-500 text-xs uppercase">Delivery By</span>
          <span className="font-semibold">{structuredRfp.deliveryDate}</span>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <span className="block text-gray-500 text-xs uppercase">Items</span>
          <span className="font-semibold">
             {structuredRfp.items[0].quantity}x {structuredRfp.items[0].name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RfpPreview;