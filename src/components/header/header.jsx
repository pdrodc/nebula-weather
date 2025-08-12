import { useState } from "react";
import styles from "./header.module.css";
import iconCloser from "../../assets/menu-closer.svg";
import iconBars from "../../assets/menu-togle.svg";
import Logo from "../../../public/cloud.png";
import { ArrowRight } from "lucide";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return (
    <header
      className={`${styles.Header} ${menuActive ? styles.active : ""}`}
      style={{}}
    >
      <div className={styles.wrapperHeader}>
        <div className={styles.Logo}>
          <img src={Logo} alt="" />
          <h1 className={styles.title}>Nebula Weather</h1>
        </div>
        <button onClick={toggleMenu} id={styles.buttonMobile}>
          <img
            src={menuActive ? iconCloser : iconBars}
            id={styles.menuIcons}
            alt=""
          />
        </button>
        <nav className={menuActive ? styles.active : ""}>
          <ul className={styles.ulMenu}>
            <li className={styles.navLi}>
              <a href="">Home</a>
            </li>
            <li className={styles.navLi}>
              <a href="">Cities</a>
            </li>
            <li className={styles.navLi}>
              <a href="">Favorites</a>
            </li>
            <li className={styles.navLi}>
              <a href="">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
