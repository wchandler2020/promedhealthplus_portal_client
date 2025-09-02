import { useEffect, useState } from "react";
import default_item from "../../assets/images/default_item.png";

const OrderItem = ({ item, selectedVariants = [], onVariantChange }) => {
  const [localSelections, setLocalSelections] = useState(
    selectedVariants.length > 0 ? selectedVariants : [{ variantId: "", quantity: 0 }]
  );

  useEffect(() => {
    // This effect ensures the local state is synchronized with the parent's state
    // when the component's props change (e.g., when a user navigates between steps).
    setLocalSelections(
      selectedVariants.length > 0 ? selectedVariants : [{ variantId: "", quantity: 0 }]
    );
  }, [selectedVariants]);

  const handleLocalChange = (updatedSelections) => {
    setLocalSelections(updatedSelections);
    // Propagate the change up to the parent component
    onVariantChange(updatedSelections);
  };

  const handleVariantChange = (index, value) => {
    const updated = [...localSelections];
    updated[index].variantId = value;
    handleLocalChange(updated);
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...localSelections];
    updated[index].quantity = parseInt(value);
    handleLocalChange(updated);
  };

  const addVariantRow = () => {
    const updated = [...localSelections, { variantId: "", quantity: 0 }];
    handleLocalChange(updated);
  };

  const removeVariantRow = (index) => {
    const updated = localSelections.filter((_, i) => i !== index);
    handleLocalChange(updated);
  };

  return (
    <div className="border-b py-4 space-y-2">
      <div className="flex items-center">
        <img
          src={item.image || default_item}
          alt={item.name}
          className="w-16 h-16 rounded border object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span
            className={`text-sm font-medium ${
              item.is_available ? "text-purple-600" : "text-red-500"
            }`}
          >
            {item.is_available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {localSelections.map((entry, index) => (
        <div key={index} className="flex gap-2 items-center">
          <select
            className="border rounded px-2 py-1 w-full"
            value={entry.variantId}
            onChange={(e) => handleVariantChange(index, e.target.value)}
          >
            <option value="">Select Size</option>
            {item.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.size} - ${variant.price}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 w-24"
            value={entry.quantity}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
            disabled={!entry.variantId}
          >
            {[...Array(11).keys()].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>

          {localSelections.length > 1 && (
            <button
              onClick={() => removeVariantRow(index)}
              className="text-red-500 text-lg px-2"
              aria-label="Remove variant"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button onClick={addVariantRow} className="text-sm text-blue-500 mt-2">
        + Add Another Selection
      </button>
    </div>
  );
};

export default OrderItem;