import Link from "next/link";

import styles from "./style.module.scss";
import { FaUsers, FaCashRegister } from "react-icons/fa";
import { GiBookshelf, GiNotebook } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/router";

export default function Header() {
  const { asPath } = useRouter();

  return (
    <div className={styles.headContainer}>
      <ul className={styles.navBar}>
        <li className={asPath == "/" ? styles.activeLink : ""}>
          <MdSpaceDashboard style={{ color: "var(--blue-icons)" }} />
          <Link href="/">
            <a className={asPath == "/" ? styles.activeLink : ""}>Dashboard</a>
          </Link>
        </li>
        <li className={asPath == "/rentals" ? styles.activeLink : ""}>
          <FaCashRegister style={{ color: "var(--blue-icons)" }} />
          <Link href="/rentals">
            <a className={asPath == "/rentals" ? styles.activeLink : ""}>
              Rentals
            </a>
          </Link>
        </li>
        <li className={asPath == "/books" ? styles.activeLink : ""}>
          <GiBookshelf style={{ color: "var(--blue-icons)" }} />
          <Link href="/books">
            <a className={asPath == "/books" ? styles.activeLink : ""}>Books</a>
          </Link>
        </li>
        <li className={asPath == "/publishers" ? styles.activeLink : ""}>
          <GiNotebook style={{ color: "var(--blue-icons)" }} />
          <Link href="/publishers">
            <a className={asPath == "/publishers" ? styles.activeLink : ""}>
              Publishers
            </a>
          </Link>
        </li>
        <li className={asPath == "/users" ? styles.activeLink : ""}>
          <FaUsers style={{ color: "var(--blue-icons)" }} />
          <Link href="/users">
            <a className={asPath == "/users" ? styles.activeLink : ""}>Users</a>
          </Link>
        </li>
      </ul>
      <h1 className={styles.logo}>WDA Digital Library</h1>
    </div>
  );
}
