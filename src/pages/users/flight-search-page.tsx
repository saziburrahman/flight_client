import { useQuery } from "@tanstack/react-query";
import { READER_API } from "../../api";
import { useSearch } from "../../hooks/useSearch";

export default function FlightSearchPage() {
  const { searchData } = useSearch();
  // console.log(searchData);
  const queryString = new URLSearchParams(searchData).toString();
  // console.log(queryString);
  
  const query = useQuery({
    queryKey: ['searchData',searchData,queryString],
    queryFn: () => READER_API.getSearchFlight(queryString)
  })
  // console.log(query.data);
  
  
  return <div>FlightSearchPage</div>;
}
