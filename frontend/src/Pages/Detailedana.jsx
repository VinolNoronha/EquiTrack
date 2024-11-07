import Anaheader from "../Components/Anaheader";
import Analysis from "../Components/Analysis";
import Graph from "../Components/Graph";
import Header from "../Components/Header";
import styles from "./Detailedana.module.css";
import { useLocation } from "react-router-dom";

function Detailedana() {
  const location = useLocation(); //used to receive the state from the prev page which used navigate to pass state
  const stockData = location.state; //accessing the state

  console.log(stockData);
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div>
          <Anaheader stockData={stockData} />
        </div>
        <div className={styles.graphana}>
          <Graph ticker={stockData.obj.ticker} />
          <Analysis />
        </div>
      </div>
    </>
  );
}

export default Detailedana;
