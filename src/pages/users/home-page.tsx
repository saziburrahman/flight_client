import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useSearch } from "../../hooks/useSearch";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const airlines = ["Biman Bangladesh", "US-Bangla", "NovoAir"];

export default function HomePage() {
  const { updateSearchData } = useSearch();
  const [searchFields, setSearchFields] = useState({
    origin: divisions[0],
    destination: divisions[1],
    date: "",
    minPrice: "",
    maxPrice: "",
    airline: airlines[0],
    availableSeats: "",
    minDuration: "",
    maxDuration: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateFields = () => {
    const { minPrice, maxPrice, minDuration, maxDuration } = searchFields;
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Minimum price cannot be greater than maximum price.");
      return false;
    }
    if (
      minDuration &&
      maxDuration &&
      Number(minDuration) > Number(maxDuration)
    ) {
      setError("Minimum duration cannot be greater than maximum duration.");
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!validateFields()) return;
    updateSearchData(searchFields);
    console.log(searchFields);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative max-w-6xl mx-auto p-6">
        <Navbar />

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Search Flights
          </h1>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">From</label>
              <select
                name="origin"
                value={searchFields.origin}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">To</label>
              <select
                name="destination"
                value={searchFields.destination}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {divisions
                  .filter((division) => division !== searchFields.origin)
                  .map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Departure</label>
              <input
                type="date"
                name="date"
                value={searchFields.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Airline</label>
              <select
                name="airline"
                value={searchFields.airline}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {airlines.map((airline) => (
                  <option key={airline} value={airline}>
                    {airline}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={searchFields.minPrice}
                onChange={handleChange}
                placeholder="Enter minimum price"
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={searchFields.maxPrice}
                onChange={handleChange}
                placeholder="Enter maximum price"
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Available Seats
              </label>
              <input
                type="number"
                name="availableSeats"
                value={searchFields.availableSeats}
                onChange={handleChange}
                placeholder="Enter minimum seats"
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Duration (hrs)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minDuration"
                  value={searchFields.minDuration}
                  onChange={handleChange}
                  placeholder="Min"
                  className="border border-gray-300 rounded-md px-2 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="number"
                  name="maxDuration"
                  value={searchFields.maxDuration}
                  onChange={handleChange}
                  placeholder="Max"
                  className="border border-gray-300 rounded-md px-2 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="text-center">
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
