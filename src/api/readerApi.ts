import Friday from "../utils/Friday";
const READER_BASE_URL = import.meta.env.VITE_READER_BASE_URL;

export async function getSearchFlight(data: string) {
  return await Friday.get(new URL(`${READER_BASE_URL}/flights/search?${data}`));
}
export async function getAllFlights() {
  return await Friday.get(new URL(`${READER_BASE_URL}/flights`));
}
