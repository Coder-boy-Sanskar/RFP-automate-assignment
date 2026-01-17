

import React, { createContext, useContext, useState } from 'react';
import { notify } from '../utils/toast';

// Create Context
const RfpContext = createContext();

// --- MOCK DATA START ---
const MOCK_VENDORS = [
  { id: 1, name: "Tech Solutions Inc", email: "sales@techsol.com", rating: 4.8, details: "Specializes in bulk laptop procurement and IT infrastructure." },
  { id: 2, name: "Office Depot Pro", email: "b2b@officedepot.com", rating: 4.2, details: "General office supplies, furniture, and basic electronics." },
  { id: 3, name: "Global Electronics", email: "contact@globelec.com", rating: 4.5, details: "International shipping available. High-end workstations." },
  { id: 4, name: "FastTrack IT", email: "support@fasttrack.com", rating: 3.9, details: "Refurbished and budget-friendly options." },
];

const MOCK_PROPOSALS = [
  { 
    id: 101, 
    vendorId: 1, 
    vendorName: "Tech Solutions Inc", 
    price: 48000, 
    timeline: "25 Days", 
    warranty: "2 Years", 
    aiScore: 92, 
    matchStatus: "Best Match",
    reasoning: "Offers the best balance of price ($48k) and warranty (2 years). Timeline fits the 30-day requirement perfectly." 
  },
  { 
    id: 102, 
    vendorId: 3, 
    vendorName: "Global Electronics", 
    price: 52000, 
    timeline: "15 Days", 
    warranty: "1 Year", 
    aiScore: 85, 
    matchStatus: "Fastest Delivery",
    reasoning: "Slightly over budget ($52k), but offers the fastest delivery (15 days). Good alternative if speed is priority." 
  },
  { 
    id: 103, 
    vendorId: 4, 
    vendorName: "FastTrack IT", 
    price: 42000, 
    timeline: "45 Days", 
    warranty: "6 Months", 
    aiScore: 60, 
    matchStatus: "Cheapest",
    reasoning: "Lowest price, but timeline (45 days) exceeds the 30-day limit and warranty is insufficient." 
  },
];
// --- MOCK DATA END ---

export const RfpProvider = ({ children }) => {
  // State
  const [username, setUsername] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [rfpQuery, setRfpQuery] = useState("");
  const [structuredRfp, setStructuredRfp] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendorIds, setSelectedVendorIds] = useState([]);
  
  // NEW: State for Proposals
  const [proposals, setProposals] = useState([]); 

  // Function 1: Simulate AI Processing
  const processRfpQuery = async (query) => {
    setLoading(true);
    setRfpQuery(query);
    setTimeout(() => {
      const mockAiResponse = {
        title: "Procurement: " + query.substring(0, 20) + "...",
        items: [{ name: "Laptop", quantity: 20, specs: "16GB RAM" }],
        budget: "$50,000",
        deliveryDate: "2026-03-01"
      };
      setStructuredRfp(mockAiResponse);
      setVendors(MOCK_VENDORS);
      setLoading(false);
      notify.success("RFP Structure Generated!");
    }, 1500);
  };

  // Function 2: Vendor Selection Helpers
  const toggleVendorSelection = (id) => {
    if (selectedVendorIds.includes(id)) {
      setSelectedVendorIds(selectedVendorIds.filter(vId => vId !== id));
    } else {
      setSelectedVendorIds([...selectedVendorIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedVendorIds.length === vendors.length) {
      setSelectedVendorIds([]);
    } else {
      setSelectedVendorIds(vendors.map(v => v.id));
    }
  };

  // Function 3: Send Emails
  const sendRfpEmails = () => {
    if (selectedVendorIds.length === 0) {
      notify.error("Please select at least one vendor.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify.success(`RFP sent to ${selectedVendorIds.length} vendors successfully!`);
    }, 2000);
  };

  // Function 4: Fetch Proposals (NEW)
  const fetchProposals = () => {
    setLoading(true);
    // Simulate network request to fetch parsed emails
    setTimeout(() => {
      setProposals(MOCK_PROPOSALS);
      setLoading(false);
      notify.success("3 Proposals received and analyzed by AI!");
    }, 1500);
  };

  return (
    <RfpContext.Provider value={{
      username, setUsername,
      loading,
      rfpQuery,
      structuredRfp,
      vendors,
      selectedVendorIds,
      proposals,        // <--- Exported
      processRfpQuery,
      toggleVendorSelection,
      toggleSelectAll,
      sendRfpEmails,
      fetchProposals    // <--- Exported
    }}>
      {children}
    </RfpContext.Provider>
  );
};

export const useRfp = () => useContext(RfpContext);