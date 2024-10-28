import { useContext } from "react";
import { UserContext } from "../features/auth/UserProvider";
import styles from "./Sucessfulllogin.module.css";

import pfp from "../assets/pfp.jpg";

function Sucessfulllogin() {
  const { email, setEmail, setPassword, setLoggedIn, setId } =
    useContext(UserContext);
  function logout() {
    setEmail("");
    setPassword("");
    setLoggedIn(false);
    setId("");
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
