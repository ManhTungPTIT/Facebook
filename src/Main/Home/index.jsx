import Sidebar from "./sidebar/sidebar.jsx";
import styles from "./home.module.scss";
import Content from "./content/index.jsx";

import { useOutletContext } from "react-router-dom";
import FindUser from "./friend/findUser.jsx";
import ListFriend from "./friend/index.jsx";

function Home() {
  const searchDataObject = useOutletContext();
  const searchDataArray = Object.values(searchDataObject);
  console.log("Data: ", searchDataArray[0]);

  return (
    <div className={styles.home}>
      <Sidebar />
      {searchDataArray[0].length > 0 ? (
        <FindUser searchData={searchDataArray[0]} />
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
