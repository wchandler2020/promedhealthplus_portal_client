// components/OrderHistory.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";
import axiosAuth from "../../../utils/axios";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [expandedPatients, setExpandedPatients] = useState({});

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const axiosInstance = axiosAuth();
      const res = await axiosInstance.get(`/provider/order-history/`);
      setHistory(res.data);
      console.log("Order history response:", res.data);
    } catch (err) {
      console.error("Failed to fetch order history", err);
    }
  };

  const orderStatus = (status) => {
    const lowerStatus = String(status).toLowerCase();

    if (lowerStatus === "accepted") {
      return "text-green-300";
    } else if (lowerStatus === "pending") {
      return "text-yellow-300";
    } else if (lowerStatus === "delivered") {
      return "text-green-300";
    } else if (lowerStatus === "cancelled") {
      return "text-red-300";
    } else if (lowerStatus === "refunded") {
      return "text-orange-300";
    } else if (lowerStatus === "failed") {
      return "text-red-300";
    } else {
      return "text-gray-300"; // fallback/default
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const axiosInstance = axiosAuth();
      const response = await axiosInstance.get(
        `/provider/invoice/${orderId}/`,
        {
          responseType: "blob",
        }
      );

      // Validate the Content-Type header
      const contentType = response.headers["content-type"];
      if (!contentType || !contentType.includes("application/pdf")) {
        // Optionally: read the blob content for debugging
        const text = await response.data.text();
        console.error("Expected PDF, got:", text);
        alert("Failed to download PDF. Server returned unexpected content.");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_order_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download invoice:", err);
      alert("Could not download invoice. Please try again.");
    }
  };

  const handleToggle = async (patientId) => {
    const isExpanded = expandedPatients[patientId];
    if (isExpanded) {
      setExpandedPatients((prev) => ({ ...prev, [patientId]: false }));
    } else {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/provider/order-history/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { all: true },
        });
        const updated = res.data.find((p) => p.id === patientId);
        setHistory((prev) =>
          prev.map((p) => (p.id === patientId ? updated : p))
        );
        setExpandedPatients((prev) => ({ ...prev, [patientId]: true }));
      } catch (err) {
        console.error("Failed to load full order history", err);
      }
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-6">
        No order history yet.
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
      {history.map((patient) => (
        <div key={patient.id} className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {patient.first_name} {patient.last_name}
          </h3>

          {patient.orders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders.</p>
          ) : (
            <ul className="space-y-4">
              {patient.orders.map((order) => (
                <li
                  key={order.id}
                  className="border border-gray-200 p-4 rounded bg-white flex-1 justify-center"
                >
                  <div className="text-sm font-medium text-gray-700">
                    Order #{order.id} •{" "}
                    <span className={orderStatus(order.status)}>
                      {order.status}
                    </span>{" "}
                    • {new Date(order.created_at).toLocaleDateString()}
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => downloadInvoice(order.id)}
                      className="text-xs text-blue-400 hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      View Invoice PDF
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {patient.orders.length >= 5 && (
            <div className="mt-3 text-right">
              <button
                onClick={() => handleToggle(patient.id)}
                className="text-blue-600 hover:underline text-xs"
              >
                {expandedPatients[patient.id] ? "Show Less" : "Show All Orders"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
