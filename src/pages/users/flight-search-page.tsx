import { useQuery } from "@tanstack/react-query";
import { READER_API } from "../../api";
import FlightSearch from "../../components/FlightSearch";
import Navbar from "../../components/Navbar";
import { useSearch } from "../../hooks/useSearch";

export default function FlightSearchPage() {
  const { searchData } = useSearch();
  const queryString = new URLSearchParams(searchData).toString();

  const query = useQuery({
    queryKey: ["searchData", searchData, queryString],
    queryFn: () => READER_API.getSearchFlight(queryString),
  });

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative max-w-6xl mx-auto p-6">
        <Navbar />
        <FlightSearch />
        <br />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {query.data?.flights?.map((flight: IFlight) => (
            <div
              key={flight._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-2xl font-semibold">{flight.flightNumber}</h2>
                <p className="text-gray-600">{flight.airline}</p>
                <p className="text-sm text-gray-500">{flight.origin} → {flight.destination}</p>
                <p className="text-sm text-gray-500">Date: {new Date(flight.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Time: {flight.time}</p>
                <p className="text-xl font-bold text-green-600">BDT {flight.price}</p>
                <p className="text-sm text-gray-500">Available Seats: {flight.availableSeats}</p>
                <p className="text-sm text-gray-500">Duration: {flight.duration} hours</p>
              </div>
              <div className="bg-gray-100 p-4 text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
