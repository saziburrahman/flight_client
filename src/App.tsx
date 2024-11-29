import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { READER_API } from "./api";

function App() {
  const query = useQuery({
    queryKey: ["getReader"],
    queryFn: ()=> READER_API.getReader(),
  });
  console.log(query.data);

  return <h1 className="text-red-400">Hello</h1>;
}

export default App;
