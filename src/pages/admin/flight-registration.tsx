import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WRITER_API } from "../../api";

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

export default function FlightRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: airlines[0],
    origin: divisions[0],
    destination: divisions[1],
    date: "",
    time: "",
    price: "",
    availableSeats: "",
    duration: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setError("");
  };

  const validateFields = () => {
    const { price, availableSeats, duration, flightNumber, origin, destination, date, time, airline } = formData;

    if (!flightNumber || !origin || !destination || !date || !time || !price || !availableSeats || !duration || !airline) {
      setError("Please fill in all fields");
      return false;
    }

    if (Number(price) <= 0) {
      setError("Price must be greater than zero");
      return false;
    }

    if (Number(availableSeats) <= 0) {
      setError("Available seats must be greater than zero");
      return false;
    }

    if (Number(duration) <= 0) {
      setError("Duration must be greater than zero");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await WRITER_API.createFlight(formData);
      navigate("/admin/flights");
      toast.success("Flight created successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create flight", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Add Flight
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">
                  Flight Number
                </label>
                <input
                  type="text"
                  id="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  placeholder="Enter flight number"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="airline" className="block text-sm font-medium text-gray-700">
                  Airline
                </label>
                <select
                  id="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                >
                  {airlines.map((airline) => (
                    <option key={airline} value={airline}>
                      {airline}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                  Origin
                </label>
                <select
                  id="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                >
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <select
                  id="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                >
                  {divisions
                    .filter((division) => division !== formData.origin)
                    .map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  min={1}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                  Available Seats
                </label>
                <input
                  type="number"
                  id="availableSeats"
                  min={1}
                  value={formData.availableSeats}
                  onChange={handleChange}
                  placeholder="Enter available seats"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in hours)
              </label>
              <input
                type="number"
                id="duration"
                min={1}
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter flight duration"
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Flight
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
