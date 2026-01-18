import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";

const RfpModal = ({  selectedrfp,onClose }) => {
  const [activeTab, setActiveTab] = useState("sent");
  const [emailSent, setEmailSent] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // if (!isOpen) return null;
  // console.log("opening modal");
  console.log(selectedrfp?.title,"adfad", selectedrfp);
  
  

  const fetchEmailSent = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        "http://localhost:3000/get-rfp-emailsent",
        { rfpId:selectedrfp?.id }
      );
      setEmailSent(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        "http://localhost:3000/get-vendor-response",
        { rfpId:selectedrfp?.id }
      );
      setResponses(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    activeTab === "sent" ? fetchEmailSent() : fetchResponses();
  }, [activeTab]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[720px] rounded-xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">RFP Vendor Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {["sent", "response"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mr-6 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab === "sent" ? "Email Sent" : "Vendor Responses"}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : (
          <>
            {/* EMAIL SENT TAB */}
            {activeTab === "sent" && (
              <div className="space-y-4">
                {emailSent.length === 0 ? (
                  <p className="text-gray-500">No vendor emails sent.</p>
                ) : (
                  emailSent.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 flex justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.vendor.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.vendor.email}
                        </p>
                        <p className="text-sm">
                          Contact: {item.vendor.contactPerson}
                        </p>

                        <div className="flex gap-2 mt-2">
                          {item.vendor.categories.map((cat) => (
                            <span
                              key={cat}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-green-600 text-sm font-medium">
                          Email Sent
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* RESPONSES TAB */}
            {activeTab === "response" && (
              <div className="space-y-4">
                {responses.length === 0 ? (
                  <p className="text-gray-500">No vendor responses yet.</p>
                ) : (
                  responses.map((res) => (
                    <div
                      key={res._id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{res.vendorEmail}</p>
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          AI Score: {res.aiScore}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-700">
                        {res.aiSummary}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        Received: {new Date(res.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RfpModal;
