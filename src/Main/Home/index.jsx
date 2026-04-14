import styles from "./home.module.scss";
import Content from "./content/index.jsx";

import { useOutletContext } from "react-router-dom";
import FindUser from "./friend/findUser.jsx";
import ListFriend from "./friend/index.jsx";
import ListRequestFriend from "./friend/listRequestFriend.jsx";

function Home() {
  const { isSearchData, feature } = useOutletContext();

  const arr = Object.values(isSearchData);
  return (
    <div className={styles.home}>
      {arr.length > 0 ? (
        <FindUser searchData={isSearchData} />
      ) : feature === "Group" ? (
        <ListRequestFriend />
      ) : (
        <>
          <Content />
          <ListFriend />
        </>
      )}
    </div>
  );
}

export default Home;
