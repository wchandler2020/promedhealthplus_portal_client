import React from "react";

const OrderSummary = ({ selectedVariants = {}, itemsData = [] }) => {
  const renderSummaryItems = () => {
    return Object.entries(selectedVariants).map(([productId, variants]) => {
      const product = itemsData.find((item) => item.id === parseInt(productId));
      if (!product) return null;

      return (
        <div key={productId} className="mb-4">
          <h4 className="font-semibold text-gray-800">{product.name}</h4>
          <ul className="ml-4 list-disc text-gray-700 text-sm">
            {variants
              .filter(({ quantity }) => quantity > 0)
              .map(({ variantId, quantity }, index) => {
                const variant = product.variants.find(
                  (v) => v.id === parseInt(variantId)
                );
                if (!variant) return null;

                return (
                  <li key={index}>
                    {variant.size} – Qty: {quantity}
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Order Summary
      </h3>
      {Object.keys(selectedVariants).length === 0 ? (
        <p className="text-sm text-gray-500">No items selected.</p>
      ) : (
        renderSummaryItems()
      )}
    </div>
  );
};

export default OrderSummary;
