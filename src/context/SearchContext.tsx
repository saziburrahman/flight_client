import { createContext, useState } from "react";

interface ISearchContext {
  searchData: {
    origin: string;
    destination: string;
    date: string;
    minPrice: string;
    maxPrice: string;
    airline: string;
    availableSeats: string;
    minDuration: string;
    maxDuration: string;
  };
  updateSearchData: (newData: Partial<ISearchContext["searchData"]>) => void;
  clearSearchData: () => void;
}

const initialState: ISearchContext = {
  searchData: {
    origin: "",
    destination: "",
    date: "",
    minPrice: "",
    maxPrice: "",
    airline: "",
    availableSeats: "",
    minDuration: "",
    maxDuration: "",
  },
  updateSearchData: () => undefined,
  clearSearchData: () => undefined,
};

export const SearchContext = createContext<ISearchContext>(initialState);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchData, setSearchData] = useState(initialState.searchData);

  const updateSearchData = (newData: Partial<ISearchContext["searchData"]>) => {
    setSearchData((prev) => ({ ...prev, ...newData }));
  };

  const clearSearchData = () => {
    setSearchData(initialState.searchData);
  };

  return (
    <SearchContext.Provider value={{ searchData, updateSearchData, clearSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

