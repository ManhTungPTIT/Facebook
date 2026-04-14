import { useState } from "react";
import Header from "./Header";
import Sidebar from "../Main/Home/sidebar/sidebar.jsx";
import "./main.module.scss";
import styles from "./main.module.scss";

import { Outlet } from "react-router-dom";

function Main() {
  const [isSearchData, setIsSearchData] = useState([]);
  const [feature, setFeature] = useState("Home");

  return (
    <div className={styles.Main}>
      <Header setIsSearchData={setIsSearchData} setFeature={setFeature} />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet context={{ isSearchData, feature }} />
      </div>
    </div>
  );
}

export default Main;
