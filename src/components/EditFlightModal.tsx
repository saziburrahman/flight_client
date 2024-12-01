import React, { useState } from "react";
import { toast } from "react-toastify";
import { WRITER_API } from "../api";

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

interface EditFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightData: IFlight;
  onSave: (updatedFlight: IFlight) => void;
}

const EditFlightModal: React.FC<EditFlightModalProps> = ({
  isOpen,
  onClose,
  flightData,
  onSave,
}) => {
  const [formData, setFormData] = useState<IFlight>(flightData);
  const [error, setError] = useState<string>("");

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
    const {
      price,
      availableSeats,
      duration,
      flightNumber,
      origin,
      destination,
      date,
      time,
      airline,
    } = formData;

    if (
      !flightNumber ||
      !origin ||
      !destination ||
      !date ||
      !time ||
      !price ||
      !availableSeats ||
      !duration ||
      !airline
    ) {
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
      await WRITER_API.updateFlight(formData, formData._id);
      onSave(formData); // Notify parent of the updated flight
      toast.success("Flight updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
      toast.error("Failed to update flight", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="flightNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Flight Number
              </label>
              <input
                type="text"
                id="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="airline"
                className="block text-sm font-medium text-gray-700"
              >
                Airline
              </label>
              <select
                id="airline"
                value={formData.airline}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
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
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-700"
              >
                Origin
              </label>
              <select
                id="origin"
                value={formData.origin}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                Destination
              </label>
              <select
                id="destination"
                value={formData.destination}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
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
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="availableSeats"
                className="block text-sm font-medium text-gray-700"
              >
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (in hours)
            </label>
            <input
              type="number"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-500 text-white font-medium py-2 rounded-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-1/2 bg-gray-300 text-gray-700 font-medium py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlightModal;
