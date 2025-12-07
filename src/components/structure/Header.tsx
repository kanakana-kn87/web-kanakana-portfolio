import R3FLogo from "../logo";
import styles from "@/resource/style/module/header.module.scss"
import NavigationMenu from "../Navigation";

export default function Header() {
  return (
    <header className={styles.header} data-aos="fade-down">
      <aside className={styles.header__aside}>
        <div className={styles.header__logo}>
          <R3FLogo />
          <h1>kanakana</h1>
        </div>
        <NavigationMenu />
      </aside>
    </header>
  );
}