import styles from "./Profileanalysis.module.css";
import { useContext } from "react";
import { StocksContext } from "../features/stocks/StocksProvider";

function Profileanalysis() {
  const { bookmarkedStocks } = useContext(StocksContext);
  const totalValue = bookmarkedStocks.reduce(
    (acc, obj) => obj.current_price + acc,
    0
  );
  const bookmarkedLength = bookmarkedStocks.length;
  const avgPeratio = (
    bookmarkedStocks.reduce((acc, obj) => obj.pe_ratio + acc, 0) /
    bookmarkedLength
  ).toFixed(2);
  const growthStocks = bookmarkedStocks.filter(
    (obj) => obj.pe_ratio >= 30 && obj.change_percentage > 3
  );
  const growthStocksNum = growthStocks.length;
  const valueStocksNum = bookmarkedLength - growthStocksNum;

  return (
    <div className={`bg-neutral-900 h-90  rounded ${styles.main} `}>
      <div className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
        <p>Portfolio Analysis</p>
      </div>
      <div>
        <p className="font-mono text-neutral-200 text-sm px-5 mt-7 text-stone-500">
          Total Value
        </p>
        <div className="font-mono text-neutral-200 text-5xl px-5 py-0  text-white-500">
          ${totalValue.toFixed(3)}
        </div>
      </div>

      <div>
        <p className="font-mono text-neutral-200 text-1xl px-5 mt-12 text-white-500">
          Avg. P/E Ratio : {avgPeratio}
        </p>
      </div>

      <div>
        <p
          className={`font-mono text-neutral-200 text-1xl px-5 mt-5 text-white-500 ${
            (growthStocksNum / bookmarkedLength) * 100 >= 65
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          No. of Growth Stocks : {growthStocksNum}
        </p>
      </div>

      <div>
        <p
          className={`font-mono text-neutral-200 text-1xl px-5 mt-5 text-white-500 ${
            (valueStocksNum / bookmarkedLength) * 100 <= 35
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          No. of Value Stocks : {valueStocksNum}
        </p>
      </div>
    </div>
  );
}

export default Profileanalysis;
