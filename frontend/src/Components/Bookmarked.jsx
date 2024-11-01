import styles from "./Bookmarked.module.css";
import { supabase } from "../SupabaseClient";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../features/auth/UserProvider";
import { StocksContext } from "../features/stocks/StocksProvider";
import Spinner from "./Spinner";

function Bookmarked() {
  const { email } = useContext(UserContext);
  const { bookmarkedStocks, setBookmarkedStocks } = useContext(StocksContext);
  const [loading, setLoading] = useState(false);
  const [retrievedData, setRetrievedData] = useState([]);
  console.log(email);

  function deleteBookmarked(ticker) {
    const deletedTickerData = bookmarkedStocks.filter((obj) => {
      return obj.ticker != ticker;
    });
    console.log(deletedTickerData);
    setBookmarkedStocks(deletedTickerData);
  }

  useEffect(
    function () {
      async function getBookmarkedStocks(email) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("bookmarked")
            .select("created_at, bookmarked_stocks, email")
            .eq("email", email)
            .order("created_at", { ascending: false });

          if (error) {
            console.error(
              "Error in fetching the bookmarked data:",
              error.message
            );
            return;
          }
          console.log("Fetched bookmarked data:", data);
          setRetrievedData(data);
        } catch (err) {
          console.error("An unexpected error occurred:", err.message);
        } finally {
          setLoading(false); // Ensure loading state is updated
        }
      }
      getBookmarkedStocks(email);
    },
    [email]
  );

  useEffect(
    function () {
      if (retrievedData.length > 0) {
        try {
          const bookmarkedStockArray =
            JSON.parse(retrievedData[0].bookmarked_stocks) || [];
          bookmarkedStocks.length > 0
            ? bookmarkedStocks
            : setBookmarkedStocks(bookmarkedStockArray); //fetches the data from the backend and sets the global bookmarked state
          if (bookmarkedStockArray.length == 0)
            throw new Error("Failed to set the bookmarked stock");
          console.log(bookmarkedStockArray);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [retrievedData] //this effect only runs when the fetched data from supabase changes(email)
  );

  console.log(bookmarkedStocks);

  return (
    <div className={`bg-neutral-900 h-90 w-128 rounded ${styles.main}`}>
      <div className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
        <p>Bookmarked</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {bookmarkedStocks.length > 0
            ? bookmarkedStocks.map((obj, ind) => (
                <ul className={styles.main1} key={ind}>
                  <li className={styles.list}>
                    <div className={styles.image}>
                      <img src={obj.logo_url} alt={`Logo of company`} />
                    </div>
                    <div
                      className={`${styles.ticker} font-mono text-neutral-200 text-1xl text-stone-500`}
                    >
                      {obj.ticker}
                    </div>
                    <div
                      className={`${styles.price} font-mono text-neutral-200 text-1xl text-white-500`}
                    >
                      {`$${obj.current_price.toFixed(2)}`}
                    </div>
                    <div
                      className={`${styles.percentage} ${
                        obj.change_percentage > 0
                          ? "text-green-500"
                          : "text-red-700"
                      } font-mono text-neutral-200 text-1xl text-white-500`}
                    >
                      {`${obj.change_percentage.toFixed(2)}`}
                    </div>
                    <div
                      className={`${styles.cross}`}
                      onClick={() => deleteBookmarked(obj.ticker)}
                    >
                      &times;
                    </div>
                  </li>
                </ul>
              ))
            : "Nil"}
        </div>
      )}
    </div>
  );
}

export default Bookmarked;
