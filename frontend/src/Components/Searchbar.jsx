import styles from "./Searchbar.module.css";

function Searchbar() {
  return (
    <div
      className={`z-10 fixed bg-neutral-950 h-2/5 w-1/4 ml-96 rounded-md  shadow-zinc-950 ${styles.main}`}
    >
      I am search bar
    </div>
  );
}

export default Searchbar;
