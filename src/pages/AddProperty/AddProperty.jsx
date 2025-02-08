import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddProperty = () => {
  const [step, setStep] = useState(1); // Tracks current step
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    details: {
      name: "",
      country: "",
      address: "",
      unitNumber: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  // Handles input changes for the details section
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "location") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        details: {
          ...prevData.details,
          [name]: value,
        },
      }));
    }
  };

  // Handle option selection
  const handleOptionSelect = (type) => {
    setFormData((prev) => ({ ...prev, propertyType: type }));
    setStep(2); // Move to the next step after selecting a property type
  };

  // Handle next step
  const handleNext = () => {
    if (step === 1 && !formData.propertyType) {
      Swal.fire({
        title: "Oops!",
        text: "Please select a property type.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (step === 2 && !formData.location) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter the property location.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setStep(step + 1);
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Handles form submission
  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.details.country || !formData.details.city || !formData.details.address) {
        Swal.fire({
          title: "Oops!",
          text: "Please fill in all required fields.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
  
      // Add current dateTime before sending data
      const payload = {
        ...formData,
        dateTime: new Date().toISOString(),
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_Link}/add-property`,
        payload
      );
      console.log("Submission successful:", response.data);
  
      // Show success alert using SweetAlert2
      Swal.fire({
        title: "Success!",
        text: "Property added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      // Reset form after successful submission
      setFormData({
        propertyType: "",
        location: "",
        details: {
          name: "",
          country: "",
          address: "",
          unitNumber: "",
          city: "",
          state: "",
          zipCode: "",
        },
      });
      setStep(1); // Reset to the first step
    } catch (error) {
      console.error("Error submitting property:", error);
  
      // Show error alert using SweetAlert2
      Swal.fire({
        title: "Oops!",
        text: error.response?.data?.message || "Failed to add property. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl">
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            What would you like to list?
          </h1>
          <p className="text-gray-600 mb-8">
            Select the type of property you'd like to add to our listings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option 1 */}
            <div
              onClick={() => handleOptionSelect("Lodging")}
              className="p-8 bg-indigo-50 border border-indigo-200 rounded-xl hover:shadow-lg hover:bg-indigo-100 transition cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🏨</div>
                <h2 className="text-xl font-semibold text-gray-800">Lodging</h2>
                <p className="text-gray-600 text-center mt-2">
                  List hotels, resorts, or other temporary lodging options.
                </p>
              </div>
            </div>
            {/* Option 2 */}
            <div
              onClick={() => handleOptionSelect("Private Residence")}
              className="p-8 bg-indigo-50 border border-indigo-200 rounded-xl hover:shadow-lg hover:bg-indigo-100 transition cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🏠</div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Private Residence
                </h2>
                <p className="text-gray-600 text-center mt-2">
                  List your home or apartment for short-term rentals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Where is your property located?
          </h1>
          <p className="text-gray-600 mb-6">
            Please provide the name or address of your property below.
          </p>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="🏠 Enter property location"
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Property Details
          </h1>
          <p className="text-gray-600 mb-4">
            Provide detailed information about your property.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.details.name}
              onChange={handleInputChange}
              placeholder="Property name (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="country"
              value={formData.details.country}
              onChange={handleInputChange}
              placeholder="Country *"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.details.address}
              onChange={handleInputChange}
              placeholder="Street address *"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="unitNumber"
              value={formData.details.unitNumber}
              onChange={handleInputChange}
              placeholder="Unit number (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="city"
              value={formData.details.city}
              onChange={handleInputChange}
              placeholder="City *"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.details.state}
              onChange={handleInputChange}
              placeholder="State *"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={formData.details.zipCode}
              onChange={handleInputChange}
              placeholder="Zip code *"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProperty;