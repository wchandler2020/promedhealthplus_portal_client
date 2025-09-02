import React from "react";

const OrderSummary = ({ total = 0 }) => {
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  return (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
      <p className="mt-2 text-gray-700">
        Total:{" "}
        <span className="font-bold text-gray-900">
          {formattedTotal}
        </span>
      </p>
      {total === 0 && (
        <p className="text-sm text-red-500 mt-1">
          Please add at least one item to your order.
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
