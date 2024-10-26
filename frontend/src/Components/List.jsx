import { useEffect, useState } from "react";
import styles from "./List.module.css";
import Spinner from "./Spinner";

function List() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function getStocks() {
      try {
        setLoading(true);
        const resp = await fetch("http://127.0.0.1:5555/stocks/list");
        if (!resp) throw new Error("Response not fetched");
        const data = await resp.json();
        setStocks(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getStocks();
  }, []);

  console.log(stocks);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {stocks.map((obj, ind) => (
            <ul className={styles.main} key={ind}>
              <li className={styles.list}>
                <div className={styles.image}>
                  <img src={obj.logo_url} alt={`Logo of ${obj.conpany_name}`} />
                </div>
                <div
                  className={`${styles.ticker} font-mono text-neutral-200 text-1xl text-stone-500`}
                >
                  {obj.ticker}
                </div>
                <div
                  className={`${styles.name}  font-mono text-neutral-200 text-1xl text-white-500`}
                >
                  {`${
                    obj.conpany_name.length > 15
                      ? `${obj.conpany_name.slice(0, 15)}...`
                      : obj.conpany_name
                  }`}
                </div>
                <div
                  className={`${styles.price} font-mono text-neutral-200 text-1xl text-white-500 `}
                >
                  {`$${obj.current_price.toFixed(2)}`}
                </div>
                <div
                  className={`${styles.percentage} ${
                    obj.change_percentage > 0
                      ? "text-green-700"
                      : "text-red-700"
                  } font-mono text-neutral-200 text-1xl text-white-500`}
                >
                  {`${obj.change_percentage.toFixed(2)}`}
                </div>
                <div
                  className={`${styles.cap} font-mono text-neutral-200 text-1xl text-white-500`}
                >
                  {`$${obj.market_cap}`}
                </div>
                <div
                  className={`${styles.ratio} font-mono text-neutral-200 text-1xl text-white-500`}
                >
                  {`${obj.pe_ratio === "N/A" ? "-" : obj.pe_ratio.toFixed(2)}`}
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}

export default List;
