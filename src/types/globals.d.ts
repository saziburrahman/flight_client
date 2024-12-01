interface IFlight {
  _id:string,
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  availableSeats: number;
  createdAt: string;
}