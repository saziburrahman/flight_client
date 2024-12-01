import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import CSS
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SearchProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SearchProvider>
    </AuthProvider>
    <ToastContainer
      position="bottom-center"
      // containerStyle={{ bottom: "10%" }}
      // style={{
      //   borderRadius: "5px",
      //   padding: "16px 24px",
      // }}
      autoClose={5000}
    />
  </QueryClientProvider>
);
