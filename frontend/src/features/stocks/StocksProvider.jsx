import { createContext, useState } from "react";

export const StocksContext = createContext();

function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkedStocks, setBookmarkedStocks] = useState([]);
  return (
    <StocksContext.Provider
      value={{
        stocks,
        setStocks,
        loading,
        setLoading,
        bookmarkedStocks,
        setBookmarkedStocks,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
}

export default StocksProvider;
