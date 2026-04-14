import { useEffect, useState } from "react";
import styles from "./friend.module.scss";
import API_URL from "../../../config/api.ts";
import axios from "axios";
import img from "../../../image/125796022_191191549168188_8437059786598980563_n.jpg";

function ListFriend() {
  const [listFriend, setListFriend] = useState([]);
  const userCurrent = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${API_URL}/user/findAllFriendShip`, {
        params: {
          id: userCurrent.id,
        },
      })
      .then((res) => {
        console.log(res.data.list);
        setListFriend(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userCurrent.id]);

  return (
    <div className={styles.listFriend}>
      {listFriend.map((item) =>
        item.userId === userCurrent.id ? (
          <div className={styles.friend}>
            <img
              src={item.friend.img ? item.friend.img : img}
              alt="Hinh anh"
              className={styles.avatar}
            />
            <p>{item.friend.name}</p>
          </div>
        ) : (
          <div className={styles.friend}>
            <img
              src={item.user.img ? item.user.img : img}
              alt="Hinh anh"
              className={styles.avatar}
            />
            <p>{item.user.name}</p>
          </div>
        ),
      )}
    </div>
  );
}

export default ListFriend;
