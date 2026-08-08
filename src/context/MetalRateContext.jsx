import { createContext, useContext, useEffect, useState } from "react";
import { getMetalRates } from "../api/goldApi";

const MetalRateContext = createContext();

export function MetalRateProvider({ children }) {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const data = await getMetalRates();
      setRates(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();

    const interval = setInterval(fetchRates, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <MetalRateContext.Provider
      value={{
        rates,
        loading,
        error,
        refreshRates: fetchRates,
      }}
    >
      {children}
    </MetalRateContext.Provider>
  );
}

export function useMetalRates() {
  return useContext(MetalRateContext);
}