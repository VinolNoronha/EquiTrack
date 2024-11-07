import styles from "./Anaheader.module.css";

function Anaheader({ stockData }) {
  console.log(stockData);
  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <img
          src={stockData.obj.logo_url}
          alt={`Logo of ${stockData.obj.ticker}`}
        />
      </div>
      <div>
        <div className="font-mono text-6xl text-neutral-200 px-10 mt-14 flex">
          <p>{stockData.obj.conpany_name}</p>
          <p className="font-mono text-3xl text-stone-700 px-4 mt-4">
            ({stockData.obj.ticker})
          </p>
        </div>

        <div className={`${styles.txt} flex mt-2`}>
          <div className="font-mono text-xl text-neutral-200 px-10 mb-16 flex ml-4">
            <p>${stockData.obj.current_price.toFixed(2)}</p>
          </div>
          <div
            className={`${
              stockData.obj.change_percentage > 0
                ? "text-green-400"
                : "text-red-700"
            } font-mono text-xl text-neutral-200 mb-16 mr-22 flex`}
          >
            <p>{stockData.obj.change_percentage.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anaheader;
