import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity, calculateCartTotal } = useContext(ProductContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const total = calculateCartTotal() * 1.1; // Include tax or any additional charges

      // Make a request to the backend with the total amount
      const { data } = await axios.get('http://localhost:3000/api/checkout', {
        params: { total }, // Pass total as a query parameter
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      // Trigger Midtrans payment popup
      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          alert('Payment successful!');
          console.log(result);

          // Update order status on the backend (optional)
          await axios.patch(
            'http://localhost:3000/users-upgrade',
            { orderId: data.orderId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            }
          );
        },
        onPending: function (result) {
          alert('Waiting for payment!');
          console.log(result);
        },
        onError: function (result) {
          alert('Payment failed!');
          console.log(result);
        },
        onClose: function () {
          alert('You closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    updateCartItemQuantity(id, newQuantity)
  };

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="container mx-auto my-10 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/pub/collections")}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Display Cart Items */}
        <div className="col-span-2">
          {Object.values(cartItems).map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 px-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">Rp{item.price.toLocaleString()}</p>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400 transition"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                  />
                  <button
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400 transition"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>Rp{calculateCartTotal().toLocaleString()}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Tax (8%):</p>
            <p>Rp{(calculateCartTotal() * 0.08).toLocaleString()}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>Rp{(calculateCartTotal() * 1.1).toLocaleString()}</p>
          </div>
          <button
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handlePayment}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
