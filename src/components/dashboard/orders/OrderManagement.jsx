import React, { useState } from "react";
import OrderHistory from "./OrderHistory";

const OrderManagement = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
      </div>
      <OrderHistory />
    </div>
  );
};

export default OrderManagement;
