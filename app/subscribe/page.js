"use client";
import React, { useState } from "react";
import pic from "../public/assets/tacos.webp";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

const statesWithCities = [
  { state: "Alabama", cities: ["Birmingham", "Montgomery", "Mobile"] },
  { state: "Alaska", cities: ["Anchorage", "Juneau", "Fairbanks"] },
  { state: "Arizona", cities: ["Phoenix", "Tucson", "Mesa"] },
  { state: "Arkansas", cities: ["Little Rock", "Fort Smith", "Fayetteville"] },
  {
    state: "California",
    cities: ["Los Angeles", "San Francisco", "San Diego"],
  },
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
  {
    state: "Pennsylvania",
    cities: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  },
  { state: "Rhode Island", cities: ["Providence", "Newport", "Warwick"] },
  { state: "South Carolina", cities: ["Charleston", "Columbia", "Greenville"] },
  { state: "South Dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen"] },
  { state: "Tennessee", cities: ["Nashville", "Memphis", "Knoxville"] },
  { state: "Texas", cities: ["Houston", "Dallas", "Austin"] },
  { state: "Utah", cities: ["Salt Lake City", "Provo", "West Jordan"] },
  { state: "Vermont", cities: ["Burlington", "Montpelier", "Rutland"] },
  { state: "Virginia", cities: ["Richmond", "Virginia Beach", "Norfolk"] },
  { state: "Washington", cities: ["Seattle", "Spokane", "Tacoma"] },
  {
    state: "West Virginia",
    cities: ["Charleston", "Huntington", "Morgantown"],
  },
  { state: "Wisconsin", cities: ["Milwaukee", "Madison", "Green Bay"] },
  { state: "Wyoming", cities: ["Cheyenne", "Casper", "Laramie"] },
];

const Subscribe = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate phone number length
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }
    try {
      await addDoc(collection(db, "Subscription"), {
        phone: phone,
        selectedState: selectedState,
        selectedCity: selectedCity,
      }); // Reset all fields to their initial state
      setPhone("");
      setSelectedState("");
      setSelectedCity("");
      router.back();
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };
  // Determine if the form is complete
  const isFormComplete = phone && selectedState && selectedCity;

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="relative h-full w-full">
        <Image
          src={pic}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="tacos"
          className="blur-sm"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center bg-transparent backdrop-blur-md border rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-center text-white font-bold text-2xl mb-4">
          Details
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4 w-full">
            <label
              htmlFor="phone"
              className="block text-white text-sm font-semibold mb-2"
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
          {/* states */}
          <div className="mb-4 w-full">
            <label
              htmlFor="state"
              className="block text-white text-sm font-semibold mb-2"
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
          {/* cities */}
          <div className="mb-4 w-full">
            <label
              htmlFor="city"
              className="block text-white text-sm font-semibold mb-2"
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
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete || loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
