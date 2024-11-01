import { useState } from "react";
//import { useContext } from "react";
//import { UserContext } from "../features/auth/UserProvider";
//import { supabase } from "../SupabaseClient";
import { useContext } from "react";
import { StocksContext } from "../features/stocks/StocksProvider";

function Star({ ticker }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { bookmarkedStocks, setBookmarkedStocks, stocks } =
    useContext(StocksContext);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => {
      const newIsBookmarked = !prevIsBookmarked;

      if (newIsBookmarked) {
        const bookmarkedStockObj = stocks.find((obj) => obj.ticker === ticker);
        if (bookmarkedStockObj) {
          setBookmarkedStocks((prevStocks) => {
            const alreadyExists = prevStocks.some(
              (obj) => obj.ticker === ticker
            );
            return alreadyExists
              ? prevStocks
              : [...prevStocks, bookmarkedStockObj];
          });
        }
      }
      return newIsBookmarked;
    });
  };

  console.log(bookmarkedStocks);

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isBookmarked ? "currentColor" : "none"}
      className={`w-6 h-6 cursor-pointer text-zinc-700 
      ${isBookmarked ? "fill-current text-yellow-400" : "stroke-current"} 
      hover:scale-110 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.98 2.285l2.285 6.917h7.28l-5.884 4.278 2.285 6.917-5.884-4.278-5.885 4.278 2.285-6.917-5.885-4.278h7.281z"
      />
    </svg>
  );
}

export default Star;
