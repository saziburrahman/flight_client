import Friday from "../utils/Friday";

const VITE_WRITE_BASE_URL = import.meta.env.VITE_WRITE_BASE_URL;

export async function createWriter(body: object) {
  return await Friday.post(new URL(`${VITE_WRITE_BASE_URL}/`), { body });
}
