import default_item from "../../assets/images/default_item.png";

const OrderItem = ({
  item,
  quantity,
  onQuantityChange,
  selectedVariantId,
  onVariantChange,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 space-y-3 sm:space-y-0">
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
    
    {/* DROPDOWNS */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
      <select
        className="border rounded px-2 py-1 w-full sm:w-auto"
        value={selectedVariantId[item.id] || ""}
        onChange={(e) => onVariantChange(item.id, e.target.value)}
        disabled={!item.is_available}
      >
        <option value="">Select Size</option>
        {item.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.size} - ${variant.price}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-2 py-1 w-full sm:w-auto"
        value={quantity}
        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
        disabled={!item.is_available || !selectedVariantId[item.id]}
      >
        {[0, 1, 2, 3, 4, 5].map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default OrderItem