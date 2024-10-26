import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

function Homepage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);
  const KEY = "cs90j1pr01qu0vk4jg60cs90j1pr01qu0vk4jg6g";

  //logic to fetch the news data
  useEffect(function () {
    async function getNews() {
      try {
        setLoading(true);
        const resp = await fetch(
          `https://finnhub.io/api/v1/news?category=general&token=${KEY}`
        );
        if (!resp) throw new Error("Response not loaded");
        const dta = await resp.json();
        setNews(dta.slice(3, 7));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getNews();
  }, []);

  //logic to fetch the stocks data
  useEffect(function () {
    async function getStocks() {
      try {
        setLoading(true);
        const resp = await fetch("http://127.0.0.1:5555/popular/stocks");
        if (!resp) throw new Error("Failed to fetch the response");
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

  return (
    <>
      <Header />
      <Sidebar />

      <div className={styles.main}>
        <div className="font-mono text-neutral-200 text-5xl">
          <h1>Empowering Your Investment Decisions</h1>
        </div>

        <div className={styles.main2}>
          <div className={styles.news}>
            <div className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
              <p>News</p>
            </div>

            <div>
              {loading ? (
                <div className="flex items-center justify-center h-52">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white-500 border-solid"></div>
                </div>
              ) : (
                <ul className={styles.newslist}>
                  {news.map((obj, ind) => (
                    <li key={ind} className={styles.title}>
                      <Link
                        to={obj.url}
                        className="font-mono text-neutral-200 text-sm"
                      >
                        {obj.headline}
                      </Link>
                      <br></br>
                    </li>
                  ))}
                  <div>
                    <Link
                      to="/news"
                      className="font-mono text-zinc-400 text-sm py-20 underline"
                    >
                      See more
                    </Link>
                  </div>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.stocks}>
            <div className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
              <p>Popular</p>
            </div>
            <div>
              {loading ? (
                <div className="flex items-center justify-center h-52">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white-500 border-solid"></div>
                </div>
              ) : (
                <div>
                  {stocks.map((obj, ind) => (
                    <ul key={ind} className={styles.stocksbox}>
                      <li className={styles.stockslist}>
                        <div className="font-mono text-neutral-200 text-1xl px-5 py-4 w-16 text-stone-500">
                          {obj.symbol}
                        </div>
                        <div className="font-mono text-neutral-200 px-7 text-1xl w-32">
                          {`$${obj.volume}`}
                        </div>
                        <div
                          className={`font-mono text-neutral-200 text-1xl px-10 w-16 ${
                            obj.percentage_change > 0
                              ? "text-green-700"
                              : "text-red-800"
                          }`}
                        >
                          {`${obj.percentage_change}%`}
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
