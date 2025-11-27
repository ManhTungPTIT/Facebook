import styles from "./friend.module.scss";

function ListFriend() {
  return (
    <div className={styles.listFriend}>
      <div className={styles.friend}>
        <img
          src="https://cdn.pixabay.com/photo/2018/10/23/08/23/asian-3767281_640.jpg"
          alt="Hinh anh"
          className={styles.avatar}
        />
        <p>Nguyen Manh Tung</p>
      </div>
      <div className={styles.friend}>
        <img
          src="https://cdn.pixabay.com/photo/2018/10/23/08/23/asian-3767281_640.jpg"
          alt="Hinh anh"
          className={styles.avatar}
        />
        <p>Nguyen Manh Tung</p>
      </div>
      <div className={styles.friend}>
        <img
          src="https://cdn.pixabay.com/photo/2018/10/23/08/23/asian-3767281_640.jpg"
          alt="Hinh anh"
          className={styles.avatar}
        />
        <p>Nguyen Manh Tung</p>
      </div>
    </div>
  );
}

export default ListFriend;
