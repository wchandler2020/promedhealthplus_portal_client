import React, { useState } from "react";
import default_item from "../../../assets/images/default_item.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const itemsData = [
  {
    id: 1,
    title: "Graph 1cm x 2cm",
    available: true,
    price: 4.99,
    image: default_item,
  },
  {
    id: 2,
    title: "Graph 2cm x 4cm",
    available: false,
    price: 6.49,
    image: default_item,
  },
  {
    id: 3,
    title: "Graph 4cm x 6cm",
    available: true,
    price: 8.99,
    image: default_item,
  },
  {
    id: 4,
    title: "Graph 5cm x 5cm",
    available: true,
    price: 10.99,
    image: default_item,
  },
];

const OrderItem = ({ item, quantity, onQuantityChange }) => (
  <div className="flex items-center justify-between border-b py-4">
    <div className="flex items-center">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 rounded border object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <span
          className={`text-sm font-medium ${
            item.available ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.available ? "Available" : "Unavailable"}
        </span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-md font-medium mb-1">${item.price.toFixed(2)}</p>
      <select
        className="border rounded px-2 py-1"
        value={quantity}
        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
        disabled={!item.available}
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

const OrderSummary = ({ total }) => (
  <div className="mt-6 p-4 border-t">
    <h3 className="text-xl font-semibold">Order Summary</h3>
    <p className="mt-2 text-gray-700">
      Total: <span className="font-bold">${total.toFixed(2)}</span>
    </p>
  </div>
);

const OrderHistory = ({ orders, onReturn }) => (
  <div className="mt-6 p-4 border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
    <h3 className="text-xl font-semibold mb-4">Order History</h3>
    {orders.length === 0 ? (
      <p className="text-gray-500">No orders placed yet.</p>
    ) : (
      <ul className="space-y-4">
        {orders.map((order, idx) => (
          <li key={idx} className="border p-4 rounded bg-gray-50 shadow-sm">
            <div className="mb-2">
              <p className="font-medium text-sm text-gray-700">
                Order #{orders.length - idx} • Total: ${order.total.toFixed(2)} • Status:{" "}
                <span className="text-blue-600 font-semibold">{order.status}</span>
              </p>
            </div>

            <div className="mb-2 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {order.customer.name}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {order.customer.street}, {order.customer.city}, {order.customer.zip},{" "}
                {order.customer.country}
              </p>
              <p>
                <strong>Phone:</strong> {order.customer.phone}
              </p>
            </div>

            <ul className="text-sm mt-2 text-gray-600 list-disc list-inside">
              {order.items.map((entry) => (
                <li key={entry.id}>
                  {entry.title} × {entry.quantity}
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right">
              <button
                onClick={() => onReturn(idx)}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Return Order
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Orders = () => {
  const [quantities, setQuantities] = useState(
    itemsData.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {})
  );

  const [orderHistory, setOrderHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [open, setOpen] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const total = itemsData.reduce((sum, item) => {
    return sum + item.price * quantities[item.id];
  }, 0);

  const handleOrderNow = () => {
    const { name, street, city, zip, country, phone } = formData;
    if (total === 0 || !name || !street || !city || !zip || !country || !phone) {
      alert("Please fill in all delivery details and select at least one item.");
      return;
    }

    const orderItems = itemsData
      .filter((item) => quantities[item.id] > 0)
      .map((item) => ({
        id: item.id,
        title: item.title,
        quantity: quantities[item.id],
      }));

    const newOrder = {
      total,
      items: orderItems,
      customer: { ...formData },
      status: "Processing",
    };

    setOrderHistory((prev) => [newOrder, ...prev].slice(0, 5));
    setQuantities(itemsData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
    setFormData({
      name: "",
      street: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    });
    setOpen(false);
  };

  const handleReturn = (index) => {
    const confirmReturn = window.confirm("Are you sure you want to return this order?");
    if (confirmReturn) {
      const updatedOrders = [...orderHistory];
      updatedOrders[index].status = "Returned";
      setOrderHistory(updatedOrders);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
        <button className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded-md transition-all text-xs"onClick={() => setOpen(true)}>
          + New Order
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <span className="text-sm sm:text-base">🛒 New Order</span>
        <DialogContent dividers>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="ZIP Code"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6">
            {itemsData.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                quantity={quantities[item.id]}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <OrderSummary total={total} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleOrderNow}
            variant="contained"
            color="primary"
            disabled={total === 0}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <OrderHistory orders={orderHistory} onReturn={handleReturn} />
    </div>
  );
};

export default Orders;
