import styles from "./Listsparameters.module.css";

function Listsparameters() {
  return (
    <div className={styles.main}>
      <div className="font-sans text-neutral-200 text-1xl font-bold">
        TICKER
      </div>

      <div className="font-sans text-neutral-200 text-1xl font-bold">Name</div>

      <div className="font-sans text-neutral-200 text-1xl font-bold">Price</div>

      <div className="font-sans text-neutral-200 text-1xl font-bold">
        Change %
      </div>

      <div className="font-sans text-neutral-200 text-1xl font-bold">
        Market Cap
      </div>

      <div className="font-sans text-neutral-200 text-1xl font-bold ">
        P/E Ratio
      </div>
    </div>
  );
}

export default Listsparameters;
