import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create a context
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State for loading status  
  const [cartItems, setCartItems] = useState({}); // State to store cart items
  const currency = "Rp"; // Currency as "Rupiah", adjust as needed

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    const product = products.find((p) => p.id === itemId); 
    if (!product) return; 
  
    setCartItems((prevCartItems) => {
      // Check if item is already in the cart
      const existingItem = prevCartItems[itemId];
      const updatedItem = existingItem
        ? { ...existingItem, quantity: existingItem.quantity + 1 }
        : { ...product, quantity: 1 }; 
  
      // Update the cart with the new or updated item
      return {
        ...prevCartItems,
        [itemId]: updatedItem,
      };
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      delete updatedCart[itemId]; 
      return updatedCart;
    });
  };

  // Function to calculate total items in the cart
  const calculateCartTotal = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  function updateCartItemQuantity(id, newQuantity) {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[id].quantity = newQuantity;
      return updatedItems;
    });
  }

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        const fetchedProducts = response.data || [];
        setProducts(fetchedProducts); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products, 
    currency, 
    loading, 
    addToCart, 
    removeFromCart,
    calculateCartTotal, 
    updateCartItemQuantity
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

// Prop validation for context provider
ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContextProvider;
