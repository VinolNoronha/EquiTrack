import Anaheader from "../Components/Anaheader";
import Analysis from "../Components/Analysis";
import Graph from "../Components/Graph";
import Header from "../Components/Header";
import styles from "./Detailedana.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Detailedana() {
  const location = useLocation(); //used to receive the state from the prev page which used navigate to pass state
  const stockData = location.state; //accessing the state
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  console.log(stockData);
  return (
    <>
      <Header />
      <button
        onClick={goBack}
        className="inline-flex items-center pb-1 justify-center text-stone-500 h-7 rounded-full w-7 bg-neutral-900 mt-20 ml-6 "
      >
        <span className="text-2xl">&larr;</span> {/* Left Arrow symbol */}
      </button>
      <div className={styles.main}>
        <div>
          <Anaheader stockData={stockData} />
        </div>
        <div className={styles.graphana}>
          <Graph ticker={stockData.obj.ticker} />
          <Analysis ticker={stockData.obj.ticker} />
        </div>
      </div>
    </>
  );
}

export default Detailedana;
