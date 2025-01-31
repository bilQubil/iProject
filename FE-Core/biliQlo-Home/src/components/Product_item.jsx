import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";  // Use "react-router-dom" instead of "react-router"
import PropTypes from "prop-types";

const Product_item = ({ id, images, title, price }) => {
  const { currency } = useContext(ProductContext);

  return (
    <Link className="text-gray-900 cursor-pointer" to={`/pub/products/${id}`}>
      <div className="overflow-hidden">
        {/* Display the first image from the images array */}
        <img 
          className="hover:scale-150 transition ease-in-out object-cover w-full h-72" 
          src={images[0]} 
          alt={title}  // Correct alt to use `title`
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>
      <p className="text-sm font-medium">{currency}{price.toLocaleString()}</p> {/* Format price */}
    </Link>
  );
};

Product_item.propTypes = {
  id: PropTypes.number.isRequired,  // Adjusted for a number id instead of string
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure images is an array of strings
  title: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired
};

export default Product_item;
