import { useContext } from "react";
import { UserContext } from "../features/auth/UserProvider";
import pfp from "../assets/pfp.jpg";
import styles from "./Account.module.css";
function Account() {
  const { email } = useContext(UserContext);
  console.log(email);
  return (
    <div className={`bg-neutral-900 h-52 w-128 rounded ${styles.main} `}>
      <div className={styles.img}>
        <img src={pfp} alt="Pfp of the user" />
      </div>

      <div className={styles.email}>
        <p className="font-mono text-neutral-200 text-4xl">{email}</p>
      </div>
    </div>
  );
}

export default Account;
