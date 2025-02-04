import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { TbGenderFemale } from "react-icons/tb";
import { SlGraduation } from "react-icons/sl";
import { MdWorkOutline } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineLightbulbCircle } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { FaStar } from 'react-icons/fa';

const Profile = () => {
  const { usersData } = useContext(AuthContext);

  
  const user = usersData[0];

  if (!user) {
    return <p>No user data available</p>;
  }

  const { name, img, title, reviewsCount, rating, hostingCount, gender, education, work, uniqueHomeFeature, funFact, pets, guestInteractions, about } = user;

  return (
    <div className="container mx-auto lg:grid lg:grid-cols-2 my-10">
      <div className='lg:grid  lg:justify-center '>
        <div className="grid grid-cols-5  lg:flex   p-5 m-10 border rounded-[30px] shadow-sm">
          {/* First Section (Left) */}
          <div className="flex justify-end  items-center col-span-3 pr-8 -m-5 lg:mr-10">
            <div className="flex flex-col items-center lg:pl-5 ml-5">
              <img
                className="rounded-full w-16 h-16 lg:w-20 lg:h-20 "
                src={img}
                alt="Profile"
              />

              <div className="mt-2 text-center">
                <h2 className="text-sm lg:text-xl font-semibold">{name}</h2>
                <p className="text-sm text-gray-500">{title}</p>
              </div>
            </div>
            {/* Add more content as needed */}
          </div>

          {/* Second Section (Right) */}
          <div className="flex flex-col items-center lg:items-center lg:m-5 text-left col-span-2">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">{reviewsCount}</h2>
              <p>Reviews</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="flex gap-1 items-center text-2xl font-semibold">{rating} <span className='text-xl '><FaStar /></span></h2>
              <p>Rating</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold">{hostingCount}</h2>
              <p>Years Hosting</p>
            </div>
            {/* Add more content as needed */}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='lg:grid  lg:items-center lg:-ml-10 lg:-mt-5 lg:pr-10 lg:border-l-2 border-gray-300'>
        <div className="mx-10  lg:col-span-4 lg:space-y-3 ">
          <div className="flex gap-2 items-center mb-2">
            <TbGenderFemale className="text-xl"/>
            <p className="text-gray-700">{gender}</p>
          </div>

          <div className="flex gap-2  mb-2">
            <SlGraduation className="text-xl"/>
            <p className="text-gray-700">
              Where I went to school: {education}
            </p>
          </div>

          <div className="flex gap-2 items-center mb-2">
            <MdWorkOutline />
            <p className="text-gray-700">My work: {work}</p>
          </div>

          <div className="flex  gap-2 mb-2">
            <BsStars className="text-xl"/>
            <p className="text-gray-700">
              What makes my home unique: {uniqueHomeFeature}
            </p>
          </div>

          <div className="flex gap-2 pt-2 mb-2">
            <MdOutlineLightbulbCircle />
            <p className="text-gray-700">
              Fun fact: {funFact}
            </p>
          </div>

          <div className="flex gap-2 items-center mb-2">
            <MdOutlinePets />
            <p className="text-gray-700">Pets: {pets}</p>
          </div>

          <div className="flex gap-2  mb-2">
            <MdOutlineRoomService className="text-3xl"/>
            <p className="text-gray-700">
              For guests, I always: {guestInteractions}
            </p>
          </div>
          <div className="lg:mx-5 pt-5 px-2 lg:-m-3 lg:w-10/12">
            <p>
              {about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;