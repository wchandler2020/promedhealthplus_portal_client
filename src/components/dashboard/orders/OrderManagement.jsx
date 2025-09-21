import React, { useState } from "react";
import OrderHistory from "./OrderHistory";

const OrderManagement = () => {
  return (
    <div className="max-w-xl mx-auto mt-9 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Order Management</h2>
      </div>
      <OrderHistory />
    </div>
  );
};

export default OrderManagement;