import FlightSearch from "../../components/FlightSearch";
import Navbar from "../../components/Navbar";


export default function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative max-w-6xl mx-auto p-6">
        <Navbar />
        <FlightSearch />
      </div>
    </div>
  );
}
