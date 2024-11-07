import styles from "./Graph.module.css";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function Graph({ ticker }) {
  console.log(ticker);
  const [data, setData] = useState([]);
  //const [Xvalue, setXValue] = useState([]);
  //const [Yvalue, setYValue] = useState([]);
  const X = data.map((obj) => {
    const splitStr = obj.Date.split(" "); //splitted array
    const indexToSel = [3, 2, 1]; //index to select
    const selectedStr = splitStr.filter((str, ind) => indexToSel.includes(ind)); //selecting the strings at a particular index
    const newStr = selectedStr.join(" "); //joinin those selected index
    return newStr;
  }); //consists of the date data
  const Y = data.map((obj) => obj.High); //consists of the high of the stock

  const URL = `http://127.0.0.1:5555/stocks/data/${ticker}`;

  useEffect(
    function () {
      async function getStockData() {
        try {
          const resp = await fetch(URL);
          if (!resp.ok) throw new Error("Failed to load the response");
          const dta = await resp.json();
          setData(dta);
        } catch (err) {
          console.log(err);
        }
      }
      getStockData();
    },
    [URL]
  );
  console.log(X);
  console.log(Y);

  return (
    <div className={styles.main}>
      <Plot
        data={[
          {
            x: X,
            y: Y,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#f24405" },
          },
        ]}
        layout={{
          width: 773,
          height: 433,
          plot_bgcolor: "#0d0d0d", // background inside the plot area
          paper_bgcolor: "#0d0d0d", // background outside the plot area
          xaxis: {
            title: "Date",
            tickformat: "%b", // Display month abbreviation
            tickmode: "auto", // Automatically choose the number of ticks
            nticks: 4, // Adjust this to show fewer ticks (more ticks = more congested)
            ticks: "outside", // Ticks outside the axis line
            tickfont: {
              size: 10, // Reduce font size for x-axis labels
            },
          },
          yaxis: {
            title: "Price (USD)",
          },
          showlegend: false,
        }}
      />
    </div>
  );
}

export default Graph;
