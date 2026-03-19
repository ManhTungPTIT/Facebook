import { useState } from "react";
import Header from "./Header";
import "./main.module.scss";
import styles from "./main.module.scss";

import { Outlet } from "react-router";

function Main() {
  const [isSearchData, setIsSearchData] = useState([]);
  console.log("Check: ", isSearchData);
  return (
    <div className={styles.Main}>
      <Header setIsSearchData={setIsSearchData} />
      <Outlet context={{ isSearchData }} />
    </div>
  );
}

export default Main;
