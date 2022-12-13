import Button from "components/Button";
import Logo from "components/Icons/Logo";
import { useRouter } from "next/router";
import styles from "./styles.module.css"

export default function NoDevit() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/compose/tweet");
  }

  return (
    <div className={styles.container}>
      <Logo width="80" />
      <h2 className={styles.h2}>No hay Devits</h2>
      <Button onClick={handleClick} /* disabled={isButtonDisabled} */>Devitear algo</Button>
    </div >
  );
}
