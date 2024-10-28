import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../features/auth/UserProvider";
import Sucessfulllogin from "./Sucessfulllogin";

function Header() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

  function openAuth() {
    navigate("/auth");
  }

  function openSignIn() {
    navigate("login");
  }
  return (
    <header className={styles.head}>
      <div className={styles.logo}>EquiTrack</div>

      <div className={styles.search}>
        <input
          className={styles.searchip}
          type="text"
          placeholder="Enter any TICKER symbol Eg: AAPL"
        />
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
  );
}

export default Header;
