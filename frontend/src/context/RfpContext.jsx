

import React, { createContext, useContext, useState } from 'react';
import { notify } from '../utils/toast';
import api from '../api/axios';

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
    const [rfps, setRfps] = useState([]);

  
  // NEW: State for Proposals
  const [proposals, setProposals] = useState([]); 

  // Function 1: Simulate AI Processing
  const processRfpQuery = async (query) => {
  try {
    if (!query?.trim()) {
      notify.error("Please enter an RFP query");
      return;
    }

    setLoading(true);
    setRfpQuery(query);

    const response = await api.post("/get-vendors", { query });

    const { vendors, message } = response.data;
    if(vendors.length===0){
      notify.info(`No vendor found , Sorry for inconvenience`);
       setStructuredRfp({
  id: 124,
  name: "Not found",
  email: "",
  categories: ["not found"],
  contactPerson: "Null",
})
      
    }
    
    const sanitizedVendors = vendors.map((vendor) => ({
  id: vendor._id,
  name: vendor.name,
  email: vendor.email,
  categories: vendor.categories,
  contactPerson: vendor.contactPerson,
}));

    setStructuredRfp(sanitizedVendors);

    notify.success(message || "RFP generated successfully");
  } catch (error) {
    console.error("RFP API Error:", error);
    notify.error(
      error.response?.data?.message || "Failed to process RFP"
    );
  } finally {
    setLoading(false);
  }
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

   const fetchRfps = async () => {
    try {

      setLoading(true);

      const res = await api.post("/get-rfps"); // <-- your endpoint

      if (res.data.success) {
        const cleanedRfps = res.data.data.map((rfp) => ({
          id: rfp._id,
          title: rfp.title,
          rfpType: rfp.rfpType,
          createdAt: rfp.createdAt,
        }));

        setRfps(cleanedRfps);
      }
    } catch (err) {
      notify.error("Failed to load RFPs");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <RfpContext.Provider value={{
      username, setUsername,fetchRfps,
      rfps,
      loading,
      rfpQuery,
      setRfpQuery,
      setStructuredRfp,
      structuredRfp,
      vendors,
      selectedVendorIds,
           // <--- Exported
      processRfpQuery,
      toggleVendorSelection,
      toggleSelectAll,
      sendRfpEmails
          // <--- Exported
    }}>
      {children}
    </RfpContext.Provider>
  );
};

export const useRfp = () => useContext(RfpContext);