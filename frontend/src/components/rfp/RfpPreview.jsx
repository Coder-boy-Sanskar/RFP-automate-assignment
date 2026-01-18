import React, { useState } from "react";
import { useRfp } from "../../context/RfpContext";
import { notify } from "../../utils/toast";
import api from "../../api/axios";
import { useEffect } from "react";

const RfpPreview = () => {
  const { structuredRfp ,rfpQuery,setRfpQuery,setStructuredRfp} = useRfp(); // this is now an array of vendors
  const [expandedVendorId, setExpandedVendorId] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  useEffect(()=>{},[structuredRfp])

  if (!structuredRfp || structuredRfp.length === 0) return null;

  const toggleExpand = (vendorId) => {
    setExpandedVendorId(expandedVendorId === vendorId ? null : vendorId);
  };

  const toggleSelect = (vendorId) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };
const handleEmailSend = async () => {
  console.log("dakdfna");
  
  try {
    if (!selectedVendors.length) {
      notify.error("Please select at least one vendor to send email.");
      return;
    }

    if (!rfpQuery?.trim()) {
      notify.error("RFP query is empty!");
      return;
    }

    // Prepare payload for backend
    const emails = structuredRfp.filter((vendor) =>
      selectedVendors.includes(vendor.id)
    ).map((vendor) => ({
      id: vendor.id,
      email: vendor.email,
    }));

    const payload = {
      emails,
      query: rfpQuery, // your RFP text/query
    };


    // Call backend
    const response = await api.post("/send-emails", payload);

    console.log("Email Response:", response.data);
    setStructuredRfp("");
    setRfpQuery("")
    notify.success("Emails sent successfully!");
  } catch (error) {
    console.error("Email send error:", error);
    notify.error(
      error.response?.data?.message || "Failed to send emails"
    );
  }
};

  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
      <h3 className="text-lg font-bold text-blue-900 mb-4">
        AI Generated RFP Vendors
      </h3>

      <div className="divide-y divide-gray-200">
        {structuredRfp.map((vendor, index) => {
          const isExpanded = expandedVendorId === vendor.id;
          const isSelected = selectedVendors.includes(vendor.id);

          return (
            <div key={vendor.id} className="py-3">
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-blue-100 rounded p-2 transition"
                onClick={() => toggleExpand(vendor.id)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation(); // prevent row toggle
                      toggleSelect(vendor.id);
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="font-medium text-gray-800">
                    {index + 1}. {vendor.name}
                  </span>
                </div>
                <span className="text-gray-500">{isExpanded ? "▲" : "▼"}</span>
              </div>

              {isExpanded && (
                <div className="bg-white p-4 rounded mt-2 shadow-sm border border-gray-200 space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">Email: </span>
                    {vendor.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Contact Person:{" "}
                    </span>
                    {vendor.contactPerson}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Categories: </span>
                    {vendor.categories.join(", ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedVendors.length > 0 && (
        <div className="mt-4">
          <button
            onClick={ handleEmailSend}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Send Email to Selected ({selectedVendors.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default RfpPreview;
