import Sidebar from "./sidebar/sidebar.jsx";
import styles from "./home.module.scss";
import ListFriend from "./friend/index.jsx";
import Content from "./content/index.jsx";

function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
      <Content />
      <ListFriend />
    </div>
  );
}

export default Home;
