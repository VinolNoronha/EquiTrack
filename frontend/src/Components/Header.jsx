import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../features/auth/UserProvider";
import Sucessfulllogin from "./Sucessfulllogin";
import Searchbar from "./Searchbar";

function Header() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);

  function openAuth() {
    navigate("/auth");
  }

  function openSignIn() {
    navigate("login");
  }

  function handleInput() {
    setClicked((c) => !c);
  }

  return (
    <>
      <header className={`${styles.head} fixed`}>
        <div className={styles.logo}>EquiTrack</div>

        <div className={styles.search}>
          <input
            className={styles.searchip}
            type="text"
            placeholder="Enter any TICKER symbol Eg: AAPL"
            onClick={() => handleInput()}
          />
          {clicked ? <Searchbar /> : ""}
        </div>

        {loggedIn ? (
          <Sucessfulllogin />
        ) : (
          <div>
            <button className={styles.btn} onClick={openSignIn}>
              Sign-In
            </button>

            <button className="font-mono text-neutral-200" onClick={openAuth}>
              Sign-Up
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
