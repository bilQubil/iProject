import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import Title from './Title';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // 'https://biliqlo.my.id/pub/products'
          `http://localhost:3000/pub/products`
        );
        console.log(response.data.data, '<<< response.data');
        const fetchedProducts = response.data.data || [];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          // 'https://biliqlo.my.id/categories'
          `http://localhost:3000/pub/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedCategories = response.data || [];
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query) // Updated from name to title
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Handle filter functionality
  const handleFilter = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    const filtered =
      filter === ''
        ? products
        : products.filter((product) => product.category.id === parseInt(filter, 10)); // Updated to use category.id

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'Our'} text2={'Collection'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Kenyamanan yang dirajut dari bahan berkualitas sehingga cocok untuk
          berbagai aktivitas sehari-hari.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6 px-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full max-w-md"
        />
        <select
          value={selectedFilter}
          onChange={handleFilter}
          className="border rounded px-4 py-2 ml-4"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Link
              to={`${product.id}`}
              key={product.id}
              className="border p-4 rounded hover:shadow-lg transition"
            >
              <img
                src={product.images[0]} // Using the first image
                alt={product.title} // Title for alt text
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{product.title}</h3> {/* Display product title */}
              <p className="text-sm text-gray-600 mt-1">
                {`Rp${product.price.toLocaleString()}`} {/* Display product price */}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {product.category.name} {/* Display category name */}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded mx-1 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Collection;
