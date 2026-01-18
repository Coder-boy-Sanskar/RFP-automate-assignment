import React, { useEffect, useState } from "react";
import { useRfp } from "../context/RfpContext";
import Loader from "../components/common/Loader";
 import RfpModal from "../components/dashboard/RfpModal";

const DashboardPage = () => {
  const { rfps, loading, fetchRfps } = useRfp();
  const [selectedRfp, setSelectedRfp] = useState(null);
  console.log(selectedRfp);
  

  useEffect(() => {
    console.log("insite");
    
    fetchRfps();
  }, []);
      console.log("outside");


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Registered RFPs
        </h1>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" />
          </div>
        )}

        {/* RFP List */}
        {!loading && rfps.length > 0 && (
          <div className="space-y-4">
            {rfps.map((rfp) => (
              <div
                key={rfp.id}
                onClick={() => setSelectedRfp(rfp)}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md cursor-pointer transition flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rfp.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Type: <span className="capitalize">{rfp.rfpType}</span>
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  {new Date(rfp.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && rfps.length === 0 && (
          <p className="text-center text-gray-500">
            No RFPs available
          </p>
        )}

       
         {/* <RfpModal
            rfp={selectedRfp}
            onClose={() => setSelectedRfp(null)}
          /> */}
        {selectedRfp && (
          <RfpModal
             selectedrfp={selectedRfp}
            onClose={() => setSelectedRfp(null)}
          />
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
