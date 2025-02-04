import { Link } from "react-router-dom";

const Cards = ({ data }) => {
    const { id, price, date, location, image } = data;
  
    return (
      <div className=" space-y-10 md:w-[500px] lg:w-[500px]  m-0 md:gap-5">
        <Link to='/'>
        <div className="bg-white p-4 rounded-lg shadow-md">

          {/* Exclude category from displaying */}
          <img src={image} alt={`Image for ${id}`} className="mt-2 w-[350px] h-[200px] md:w-[450px] md:h-[300px] lg:w-[450px] lg:h-[300px] xl:w-[450px] xl:h-[300px]  rounded-md" />
          <p className="mt-2 text-lg font-semibold text-gray-600">Location: {location}</p>
          <p className="mt-2 text-gray-600">Date: {date}</p>
          <p className="mt-2 text-gray-600">Price: <span className="text-black text-lg">{price}</span></p>
          
          <div className="flex justify-center">
          </div>
        </div>
        </Link>
        
      </div>
    );
  };
export default Cards;