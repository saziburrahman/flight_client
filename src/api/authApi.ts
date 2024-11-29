import Friday from "../utils/Friday";

const VITE_AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

export async function registration(body: object) {
  return await Friday.post(new URL(`${VITE_AUTH_BASE_URL}/registration`), { body });
}

export async function login(body: object) {
  console.log("called",body);
  
  return await Friday.post(new URL(`${VITE_AUTH_BASE_URL}/auth/login`), { body });
}

export async function getProfile() {
  return await Friday.get(new URL(`${VITE_AUTH_BASE_URL}/`));
}