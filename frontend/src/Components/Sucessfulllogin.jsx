import { useContext } from "react";
import { UserContext } from "../features/auth/UserProvider";
import styles from "./Sucessfulllogin.module.css";
import pfp from "../assets/pfp.jpg";
import { StocksContext } from "../features/stocks/StocksProvider";
import { supabase } from "../SupabaseClient";

function Sucessfulllogin() {
  const { email, setEmail, setPassword, setLoggedIn, setId } =
    useContext(UserContext);
  const { bookmarkedStocks } = useContext(StocksContext);
  function logout() {
    async function setSupabaseBookmarked() {
      const { data, error } = await supabase.from("bookmarked").insert([
        {
          email,
          bookmarked_stocks: JSON.stringify(bookmarkedStocks),
        },
      ]);

      if (error) {
        console.error("Error saving bookmarked stocks:", error);
      } else {
        console.log("Bookmarked stocks saved:", data);
      }
    }

    setSupabaseBookmarked();

    setEmail("");
    setPassword("");
    setLoggedIn(false);
    setId("");
    alert("Logout sucessfull");
  }
  return (
    <>
      <button className={styles.btn} onClick={logout}>
        Log Out
      </button>
      <div className={styles.main}>
        <div className={styles.pic}>
          <img src={pfp} alt="users profile pic" />
        </div>

        <div>
          <p className="font-mono text-neutral-200 text-sm">{email}</p>
        </div>
      </div>
    </>
  );
}

export default Sucessfulllogin;
