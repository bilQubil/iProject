import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "../components/Title";
import Product_item from "../components/Product_item";

export default function CollectionPage() {
  const { products } = useContext(ProductContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    // Filter products based on selected categories and search query
    let tempProducts = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedCategories.includes(product.category.name)
      );
    }

    // Filter by search query
    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Match search query in title
      );
    }

    // Sort products based on the selected sort option
    if (sortOption === "low-high") {
      tempProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
    } else if (sortOption === "high-low") {
      tempProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
    }

    // Set filtered products
    setFilteredProducts(tempProducts);
  }, [products, selectedCategories, sortOption, searchQuery]); // Add searchQuery as a dependency

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filter
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Clothes"
                checked={selectedCategories.includes("Clothes")}
                onChange={() => handleCategoryChange("Clothes")}
              />{" "}
              Clothes
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Electronics"
                checked={selectedCategories.includes("Electronics")}
                onChange={() => handleCategoryChange("Electronics")}
              />{" "}
              Electronics
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Furniture"
                checked={selectedCategories.includes("Furniture")}
                onChange={() => handleCategoryChange("Furniture")}
              />{" "}
              Furniture
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Shoes"
                checked={selectedCategories.includes("Shoes")}
                onChange={() => handleCategoryChange("Shoes")}
              />{" "}
              Shoes
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Miscellaneous"
                checked={selectedCategories.includes("Miscellaneous")}
                onChange={() => handleCategoryChange("Miscellaneous")}
              />{" "}
              Miscellaneous
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"PRODUCTS"} />
          {/* Product sorting */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-2 border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Map over the filteredProducts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product_item
                key={product.id}
                id={product.id}
                title={product.title}
                images={product.images}
                price={product.price}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
