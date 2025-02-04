import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { BsSearch } from 'react-icons/bs';
import { FaTree, FaUmbrellaBeach, FaWarehouse } from 'react-icons/fa';
import { MdHouseboat } from 'react-icons/md';
import { GiIsland } from 'react-icons/gi';
import Cards from '../../components/Cards/Cards';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 9;

  const { hotelData } = useContext(AuthContext);

  const selectedCategories = ['Tropical', 'Beach', 'Tiny homes', 'Farms', 'Islands'];

  const categoryIcons = {
    'Tropical': <FaTree />,
    'Beach': <FaUmbrellaBeach />,
    'Tiny homes': <MdHouseboat />,
    'Farms': <FaWarehouse />,
    'Islands': <GiIsland />,
  };

  const filteredData = hotelData
    .filter((item) => (selectedCategory === 'All' || item.category === selectedCategory))
    .filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    hotelData.filter((item) => selectedCategory === 'All' || item.category === selectedCategory).length / itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Search bar with search icon */}
      <div className="flex justify-center items-center mt-5 mb-4">
        <div className="bg-white rounded-full border p-3 shadow w-full max-w-4xl mx-auto flex items-center">
          <BsSearch size={20} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full h-10 pl-4 rounded-full outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col justify-center items-center mb-4 pt-10">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {selectedCategories.map((category, index) => (
            <button
              key={index}
              className={`flex items-center justify-center p-3 md:p-4 border rounded transition-colors duration-300 ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryIcons[category]} 
              <span className="ml-2 hidden md:inline">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-2">
        {filteredData.map((item, index) => (
          <Cards key={index} data={item} />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded focus:outline-none"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="ml-2 px-4 py-2 border rounded focus:outline-none"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Home;