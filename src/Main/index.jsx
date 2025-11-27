import Header from "./Header";
import "./main.module.scss";
import styles from "./main.module.scss";

import { Outlet } from "react-router";

function Main() {
  return (
    <div className={styles.Main}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
