import Friday from "../utils/Friday";
const READER_BASE_URL = "https://jsonplaceholder.typicode.com"

export async function getReader() {
  return await Friday.get(new URL(`${READER_BASE_URL}/todos`));
}
