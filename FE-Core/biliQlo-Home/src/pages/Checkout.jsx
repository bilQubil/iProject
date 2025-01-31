import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [orderDetails, setOrderDetails] = useState({
    items: [],
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Here you can fetch the user's order details from an API or context
    const fetchOrderDetails = async () => {
      try {
        // Example: Fetch order details (e.g., items and totalAmount) from the backend
        const response = await axios.get("http://localhost:3000/api/order");
        setOrderDetails(response.data);
      } catch (error) {
        console.log("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Send the order details to your backend to initiate the payment
      const response = await axios.post(
        "http://localhost:3000/api/checkout",
        {
          items: orderDetails.items,
          totalAmount: orderDetails.totalAmount,
        }
      );

      // Redirect to the Midtrans payment page
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h3>Order Summary</h3>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <h4>Total: ${orderDetails.totalAmount}</h4>
      </div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
