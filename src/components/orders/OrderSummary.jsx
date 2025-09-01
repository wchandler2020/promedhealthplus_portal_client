const OrderSummary = ({ total }) => (
  <div className="mt-6 p-4 border-t">
    <h3 className="text-xl font-semibold">Order Summary</h3>
    <p className="mt-2 text-gray-700">
      Total: <span className="font-bold">${total.toFixed(2)}</span>
    </p>
  </div>
);

export default OrderSummary