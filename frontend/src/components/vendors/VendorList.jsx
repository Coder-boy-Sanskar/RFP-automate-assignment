import React, { useState } from 'react';
import { useRfp } from '../../context/RfpContext';
import Button from '../common/Button';
import Checkbox from '../common/CheckBox';
// Sub-component for individual list item to handle "Expand" state locally
const VendorItem = ({ vendor, isSelected, onToggleSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border rounded-lg mb-3 transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      {/* Header Row: Checkbox + Name + Expand Button */}
      <div className="flex items-center p-4">
        <Checkbox 
          checked={isSelected}
          onChange={() => onToggleSelect(vendor.id)}
        />
        
        <div className="ml-4 flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h4 className="font-semibold text-gray-800">{vendor.name}</h4>
          <p className="text-sm text-gray-500">{vendor.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
             ★ {vendor.rating}
          </span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-blue-600"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600">
          <p><strong>Vendor Details:</strong> {vendor.details}</p>
          <p className="mt-2"><strong>Last Active:</strong> 2 days ago</p>
          {/* Add more details here later */}
        </div>
      )}
    </div>
  );
};

const VendorList = () => {
  const { vendors, selectedVendorIds, toggleVendorSelection, toggleSelectAll, sendRfpEmails, loading } = useRfp();

  if (vendors.length === 0) return null;

  const allSelected = vendors.length > 0 && selectedVendorIds.length === vendors.length;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold text-gray-800">3. Select Vendors</h2>
        
        {/* Bulk Action Header */}
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer select-none text-sm font-medium text-gray-700">
            <Checkbox 
          label="Select All"
          checked={allSelected}
          onChange={toggleSelectAll}
          className="mr-2 font-medium text-gray-700"
        />
            Select All
          </label>
        </div>
      </div>

      {/* Render List */}
      <div className="space-y-2">
        {vendors.map(vendor => (
          <VendorItem
            key={vendor.id}
            vendor={vendor}
            isSelected={selectedVendorIds.includes(vendor.id)}
            onToggleSelect={toggleVendorSelection}
          />
        ))}
      </div>

      {/* Sticky Action Footer */}
      <div className="sticky bottom-4 mt-6 flex justify-end">
        <Button
          onClick={sendRfpEmails}
          isLoading={loading}
          disabled={selectedVendorIds.length === 0}
          variant="success"
          className="shadow-xl"
        >
  Send Email to {selectedVendorIds.length} Vendor(s)
</Button>
      </div>
    </div>
  );
};

export default VendorList;