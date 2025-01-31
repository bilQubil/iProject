import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";

const Detail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Store the product data
  const [loading, setLoading] = useState(true); // Loading state
  const { addToCart } = useContext(ProductContext);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          // `https://biliqlo.my.id/products/${id}`
          `http://13.211.190.146/pub/products/${id}`
          , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data); // Update the product state with fetched data
        setLoading(false); // Stop loading
      } catch (err) {
        console.log(err);
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product found!</div>;
  }

  console.log(addToCart, "<<<< add to cart");
  return (
    <div className="container mx-auto my-10 p-4">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.images}
            alt={product.title}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Price: Rp{product.price.toLocaleString()}
          </p>        
          <p className="text-md text-gray-600 mb-4">
            Category: {product.category.name || "Unknown"}
          </p>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
