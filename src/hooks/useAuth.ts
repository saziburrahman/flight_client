import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// custom hooks
export const useAuth = () => useContext(AuthContext);
