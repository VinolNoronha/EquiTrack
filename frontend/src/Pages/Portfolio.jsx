import Account from "../Components/Account";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Bookmarked from "../Components/Bookmarked";
import styles from "./Portfolio.module.css";
import Profileanalysis from "../Components/Profileanalysis";
import { UserContext } from "../features/auth/UserProvider";
import { useContext } from "react";

function Portfolio() {
  const { loggedIn } = useContext(UserContext);

  return (
    <>
      <Header />
      <Sidebar />

      <div className={styles.main}>
        {loggedIn ? (
          <>
            <Account />

            <div className={styles.info}>
              <Profileanalysis />
              <Bookmarked />
            </div>
          </>
        ) : (
          <div className="font-mono text-neutral-200 text-7xl mt-40 ml-20">
            <p>Please Sign-in/Sign-up to view your portfolio</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Portfolio;
