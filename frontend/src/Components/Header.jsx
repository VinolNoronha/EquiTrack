import styles from "./Header.module.css";

function Header() {
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

      <div>
        <button className={styles.btn}>Login</button>
        <button className="font-mono text-neutral-200">Sign-in</button>
      </div>
    </header>
  );
}

export default Header;
