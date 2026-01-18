import React, { useState } from 'react';
import { useRfp } from '../../context/RfpContext';
import Button from '../common/Button';
import { useEffect } from 'react';

const RfpInput = () => {
  const [input, setInput] = useState("");
  const { processRfpQuery, loading ,rfpQuery,setStructuredRfp} = useRfp();
  useEffect(()=>{setInput(rfpQuery)},[rfpQuery])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    processRfpQuery(input);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">1. Describe Your Needs</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., I need 20 Dell Laptops with 16GB RAM, budget is 50k..."
          value={input}
          onChange={(e) => {setInput(e.target.value);setStructuredRfp("");}}
          disabled={loading}
        />
        <Button 
          type="submit" 
          isLoading={loading}
          variant="primary"
        >
          {loading ? "Analyzing..." : "Get vendors"}
        </Button>
      </form>
    </div>
  );
};

export default RfpInput;