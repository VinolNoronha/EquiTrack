import { useState, useEffect } from "react";
import styles from "./NewsCom.module.css";
import { Link } from "react-router-dom";

function NewsCom() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setNews(dta.slice(3, 40));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getNews();
  }, []);
  console.log(news);

  return (
    <div className={styles.main}>
      <div className={styles.newsdiv}>
        <div className="font-mono text-neutral-200 text-1xl px-5 py-4 text-stone-500">
          <p>News</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-52">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white-500 border-solid"></div>
          </div>
        ) : (
          <div className={styles.newscontent}>
            {news.map((obj, ind) => (
              <ul key={ind} className={styles.news}>
                <li className="pl-4 pt-3">
                  <Link
                    to={obj.url}
                    className="font-sans text-neutral-200 text-1xl font-bold"
                  >
                    {obj.headline}
                  </Link>
                  <div className="font-sans text-zinc-400 text-sm py-5 ">
                    {obj.summary}
                  </div>
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsCom;
