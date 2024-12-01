import Friday from "../utils/Friday";

const VITE_WRITE_BASE_URL = import.meta.env.VITE_WRITE_BASE_URL;

export async function createFlight(body: object) {
  return await Friday.post(new URL(`${VITE_WRITE_BASE_URL}/flights`), { body });
}
export async function updateFlight(body: object, id: string) {
  return await Friday.put(new URL(`${VITE_WRITE_BASE_URL}/flights/${id}`), {
    body,
  });
}
export async function deleteFlight(id: string) {
  console.log(id);
  
  return await Friday.delete(new URL(`${VITE_WRITE_BASE_URL}/flights/${id}`));
}
