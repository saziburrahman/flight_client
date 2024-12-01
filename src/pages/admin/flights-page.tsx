import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { READER_API, WRITER_API } from "../../api";
import EditFlightModal from "../../components/EditFlightModal";

const FlightPage = () => {
  const [selectedFlight, setSelectedFlight] = useState<IFlight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: flights, refetch } = useQuery({
    queryKey: ["flights"],
    queryFn: () => READER_API.getAllFlights(),
  });

  const handleEditFlight = (flight: IFlight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const handleSaveFlight = () => {
    refetch();
  };

  const handleDeleteFlight = async (id: string) => {
    await WRITER_API.deleteFlight(id);
    refetch();
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Flights</h1>
      <table className="mt-6 w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left">Flight Number</th>
            <th className="py-3 px-4 text-left">Airline</th>
            <th className="py-3 px-4 text-left">Origin</th>
            <th className="py-3 px-4 text-left">Destination</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights?.map((flight: IFlight, index:number) => (
            <tr
              key={flight._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50 transition-colors duration-200`}
            >
              <td className="py-3 px-4 border-b">{flight.flightNumber}</td>
              <td className="py-3 px-4 border-b">{flight.airline}</td>
              <td className="py-3 px-4 border-b">{flight.origin}</td>
              <td className="py-3 px-4 border-b">{flight.destination}</td>
              <td className="py-3 px-4 border-b flex items-center justify-start gap-3">
                <button
                  onClick={() => handleEditFlight(flight)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteFlight(flight._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFlight && (
        <EditFlightModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          flightData={selectedFlight}
          onSave={handleSaveFlight}
        />
      )}
    </div>
  );
};

export default FlightPage;
