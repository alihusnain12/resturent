"use client";
import React, { useState } from "react";
import pic from "../../app/public/assets/tacos.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const statesWithCities = [
  { state: "Alabama", cities: ["Birmingham", "Montgomery", "Mobile"] },
  { state: "Alaska", cities: ["Anchorage", "Juneau", "Fairbanks"] },
  { state: "Arizona", cities: ["Phoenix", "Tucson", "Mesa"] },
  { state: "Arkansas", cities: ["Little Rock", "Fort Smith", "Fayetteville"] },
  { state: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
  { state: "Colorado", cities: ["Denver", "Colorado Springs", "Aurora"] },
  { state: "Connecticut", cities: ["Hartford", "New Haven", "Stamford"] },
  { state: "Delaware", cities: ["Wilmington", "Dover", "Newark"] },
  { state: "Florida", cities: ["Miami", "Orlando", "Tampa"] },
  { state: "Georgia", cities: ["Atlanta", "Savannah", "Augusta"] },
  { state: "Hawaii", cities: ["Honolulu", "Hilo", "Kailua"] },
  { state: "Idaho", cities: ["Boise", "Idaho Falls", "Pocatello"] },
  { state: "Illinois", cities: ["Chicago", "Aurora", "Naperville"] },
  { state: "Indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville"] },
  { state: "Iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport"] },
  { state: "Kansas", cities: ["Wichita", "Overland Park", "Kansas City"] },
  { state: "Kentucky", cities: ["Louisville", "Lexington", "Bowling Green"] },
  { state: "Louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport"] },
  { state: "Maine", cities: ["Portland", "Lewiston", "Bangor"] },
  { state: "Maryland", cities: ["Baltimore", "Annapolis", "Rockville"] },
  { state: "Massachusetts", cities: ["Boston", "Worcester", "Springfield"] },
  { state: "Michigan", cities: ["Detroit", "Grand Rapids", "Lansing"] },
  { state: "Minnesota", cities: ["Minneapolis", "Saint Paul", "Rochester"] },
  { state: "Mississippi", cities: ["Jackson", "Gulfport", "Biloxi"] },
  { state: "Missouri", cities: ["Kansas City", "St. Louis", "Springfield"] },
  { state: "Montana", cities: ["Billings", "Missoula", "Great Falls"] },
  { state: "Nebraska", cities: ["Omaha", "Lincoln", "Bellevue"] },
  { state: "Nevada", cities: ["Las Vegas", "Reno", "Henderson"] },
  { state: "New Hampshire", cities: ["Manchester", "Nashua", "Concord"] },
  { state: "New Jersey", cities: ["Newark", "Jersey City", "Paterson"] },
  { state: "New Mexico", cities: ["Albuquerque", "Santa Fe", "Las Cruces"] },
  { state: "New York", cities: ["New York City", "Buffalo", "Rochester"] },
  { state: "North Carolina", cities: ["Charlotte", "Raleigh", "Greensboro"] },
  { state: "North Dakota", cities: ["Fargo", "Bismarck", "Grand Forks"] },
  { state: "Ohio", cities: ["Columbus", "Cleveland", "Cincinnati"] },
  { state: "Oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman"] },
  { state: "Oregon", cities: ["Portland", "Salem", "Eugene"] },
  { state: "Pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Harrisburg"] },
  { state: "Rhode Island", cities: ["Providence", "Newport", "Warwick"] },
  { state: "South Carolina", cities: ["Charleston", "Columbia", "Greenville"] },
  { state: "South Dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen"] },
  { state: "Tennessee", cities: ["Nashville", "Memphis", "Knoxville"] },
  { state: "Texas", cities: ["Houston", "Dallas", "Austin"] },
  { state: "Utah", cities: ["Salt Lake City", "Provo", "West Jordan"] },
  { state: "Vermont", cities: ["Burlington", "Montpelier", "Rutland"] },
  { state: "Virginia", cities: ["Richmond", "Virginia Beach", "Norfolk"] },
  { state: "Washington", cities: ["Seattle", "Spokane", "Tacoma"] },
  { state: "West Virginia", cities: ["Charleston", "Huntington", "Morgantown"] },
  { state: "Wisconsin", cities: ["Milwaukee", "Madison", "Green Bay"] },
  { state: "Wyoming", cities: ["Cheyenne", "Casper", "Laramie"] },
];

const Page = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Set loading to true when submission starts
    // phone validation
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      setIsLoading(false);
      return};

    try {
      await addDoc(collection(db, "MessagesData"), {
        phone: phone,
        state: selectedState,
        city: selectedCity,
        zipCode: zipCode,
        message: message,
      });
      alert("Your message has been sent successfully")
      // Reset form and close modal
      setPhone("");
      setSelectedState("");
      setSelectedCity("");
      setZipCode("");
      setMessage("");
      setIsModalOpen(false);
      router.back(); // Navigate to the previous page
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Determine if the form is complete
  const isFormComplete = phone && selectedState && selectedCity && phone.length==10;
  const messageComplete = message;

  return (
    <div className="w-screen h-screen relative">
      {/* Background Image */}
      <div className="relative h-full w-full">
        <Image
          src={pic}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Tacos"
          className="blur-sm"
        />
        {/* Transparent Card */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-white text-2xl mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <textarea
                type="text"
                value={message}
                maxLength={50}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="w-full p-2 mb-4 text-black rounded-lg h-40 break-words"
              />
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  !messageComplete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!messageComplete}
              >
                Send Alert
              </button>
            </form>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Your Details</h2>
              <form onSubmit={handleModalSubmit} className="w-full">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      id="countryCode"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-gray-200 border border-gray-300 text-gray-700 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                      <option value="+1">+1 (USA)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-r-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                {/* states and cities */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select State</option>
                    {statesWithCities.map(({ state }) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedState && (
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="city"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select City</option>
                      {selectedState &&
                        statesWithCities
                          .find((state) => state.state === selectedState)
                          .cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                    </select>
                  </div>
                )}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="zipCode"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Zip Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter zip code"
                  />
                </div>
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    !isFormComplete || isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormComplete || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
