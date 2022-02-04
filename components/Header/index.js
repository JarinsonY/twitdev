import Logo from "components/Icons/Logo";
import styles from "./styles.module.css"

export default function Header({ titlePage }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo width="18" />
      </div>
      <h2 className={styles.h2}>{titlePage}</h2>
    </header>
  );
}
