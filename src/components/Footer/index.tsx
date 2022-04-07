import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footContainer}>
      <div className={styles.devInfo}>
        <p>By: Rian F. de Mello(TheSadGuy)</p>
        <p>TheSadGuy@gmail.com</p>
      </div>
    </div>
  );
}
