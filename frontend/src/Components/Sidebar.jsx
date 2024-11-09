import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.main}>
      <div className="flex justify-start items-center py-7 pt-28 pb-17">
        <p className="font-mono text-neutral-200 text-1xl underline pl-4">
          Pages
        </p>
      </div>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.activeLink : "")}
      >
        <div className={`${styles.navItem} flex items-center text-gray-600`}>
          <p className="mr-2">Homepage</p>
          <p>{">"}</p>
        </div>
      </NavLink>

      <NavLink
        to="/market"
        className={({ isActive }) => (isActive ? styles.activeLink : "")}
      >
        <div className={`${styles.navItem} flex items-center text-gray-600`}>
          <p className="mr-2">Market</p>
          <p>{">"}</p>
        </div>
      </NavLink>

      <NavLink
        to="/portfolio"
        className={({ isActive }) => (isActive ? styles.activeLink : "")}
      >
        <div className={`${styles.navItem} flex items-center text-gray-600`}>
          <p className="mr-2">Portfolio</p>
          <p>{">"}</p>
        </div>
      </NavLink>

      <NavLink
        to="/news"
        className={({ isActive }) => (isActive ? styles.activeLink : "")}
      >
        <div className={`${styles.navItem} flex items-center text-gray-600`}>
          <p className="mr-2">News</p>
          <p>{">"}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
