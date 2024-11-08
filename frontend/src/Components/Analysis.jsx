import { useEffect, useState } from "react";
import styles from "./Analysis.module.css";
import Plot from "react-plotly.js";
import Spinner from "../Components/Spinner";

function Analysis({ ticker }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function getData() {
        try {
          setLoading(true);
          const resp = await fetch(
            `http://127.0.0.1:5555/stocks/analysisdata/${ticker}`
          );
          if (!resp) throw new Error("Response was not fetched");
          const dta = await resp.json();
          setData(() => dta);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      getData();
    },
    [ticker]
  );

  console.log(data);
  //console.log(data.esg.esgScores);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.main}>
          <p className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
            Analysis
          </p>

          <div>
            <div className="flex">
              <p className="font-mono text-neutral-200 text-3xl px-5 py-4 text-white-500">
                BETA :{" "}
              </p>
              <div
                className={`font-mono text-neutral-200 text-3xl  mt-4 ${
                  data.beta >= 0 ? "text-green-700" : "text-red-500"
                }`}
              >
                {data.beta}
              </div>
            </div>
          </div>

          <div className="h-2/4 w-90  ml-5 mr-5 rounded-xl">
            <Plot
              data={[
                {
                  type: "bar",
                  x: [data?.esg?.esgScores || null],
                  y: [data.ticker],
                  orientation: "h",
                  marker: {
                    color: `#4CAF50`, // Bar color
                    opacity: 0.8, // Bar opacity
                  },
                },
              ]}
              layout={{
                width: 455,
                height: 240,
                plot_bgcolor: "#1a1919",
                paper_bgcolor: "#1a1919",
                title: {
                  text: `ESG Score for ${data.ticker}:`, // Title text
                  font: {
                    family: "monospace", // Change font family
                    size: 28, // Change font size
                    color: "white", // Change font color
                  },
                  x: 0.04, // Horizontal position (0 = left, 0.5 = center, 1 = right)
                  y: 1.1,
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Analysis;
