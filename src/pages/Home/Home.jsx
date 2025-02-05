import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { BsSearch } from "react-icons/bs";
import { FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
import { MdHouseboat } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import Cards from "../../components/Cards/Cards";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  const { hotelData, loading } = useContext(AuthContext);

  const selectedCategories = ["Tropical", "Beach", "Tiny homes", "Farms", "Islands"];

  const categoryIcons = {
    Tropical: <FaTree size={20} />,
    Beach: <FaUmbrellaBeach size={20} />,
    "Tiny homes": <MdHouseboat size={20} />,
    Farms: <FaWarehouse size={20} />,
    Islands: <GiIsland size={20} />,
  };

  // Filter data based on category and search term
  const filteredData = hotelData
    .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
    .filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(
    hotelData.filter((item) => selectedCategory === "All" || item.category === selectedCategory).length /
      itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="flex justify-center items-center mt-6 mb-6">
        <div className="bg-white shadow-md  rounded-full w-full max-w-xl flex items-center p-3">
          <BsSearch size={20} className="text-gray-500 mx-3" />
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full border-none outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {selectedCategories.map((category, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 shadow-md ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {categoryIcons[category]}
            <span>{category}</span>
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => <Cards key={index} data={item} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No resorts found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-2">
          <button
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
