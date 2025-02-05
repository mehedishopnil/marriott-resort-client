import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  const { id, price, date, location, image } = data;

  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to="/">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 overflow-hidden">
          {/* Resort Image */}
          <img
            src={image}
            alt={`Resort ${id}`}
            className="w-full h-56 object-cover"
          />

          {/* Resort Details */}
          <div className="p-4 space-y-2">
            <p className="text-lg font-semibold text-gray-700">📍 {location}</p>
            <p className="text-gray-600">📅 {date}</p>
            <p className="text-gray-800 font-semibold">
              💰 Price: <span className="text-blue-600">${price}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
