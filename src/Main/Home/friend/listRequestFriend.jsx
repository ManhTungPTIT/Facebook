import axios from "axios";
import img1 from "../../../image/anh.jpg";
import "./listRequestFriend.scss";
import API_URL from "../../../config/api.ts";
import { useEffect, useState } from "react";

function ListRequestFriend() {
  const [listRequestFriend, setListRequestFriend] = useState([]);
  const userCurrent = JSON.parse(localStorage.getItem("user")); //senderId

  useEffect(() => {
    axios
      .get(`${API_URL}/user/findAllFriendRequest`, {
        params: {
          id: userCurrent.id,
        },
      })
      .then((res) => {
        setListRequestFriend(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userCurrent.id]);

  const handleConfirm = (senderId, id) => {
    console.log("Confirm add friend", id);
    axios.post(`${API_URL}/user/acceptFriendRequest`, {
      senderId: senderId,
      receiverId: userCurrent.id,
    });

    setListRequestFriend((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (senderId, id) => {
    console.log("Reject add friend", id);
    axios.post(`${API_URL}/user/cancelFriendRequest`, {
      senderId: senderId,
      receiverId: userCurrent.id,
    });
    setListRequestFriend((prev) => prev.filter((item) => item.id !== id));
  };
  console.log(listRequestFriend);
  return (
    <div className="listRequestFriend_container">
      <h2>Lời mời kết bạn</h2>
      <div className="listRequestFriend">
        {listRequestFriend.map((item) => (
          <div className="requestFriend" key={item.id}>
            <img src={item.sender?.img ? item.sender.img : img1} alt="Avatar" />
            <p>{item.sender?.name}</p>
            <button
              type="button"
              className="btConfirm"
              onClick={() => handleConfirm(item.sender.id, item.id)}
            >
              Xác nhận
            </button>
            <button
              type="button"
              className="btReject"
              onClick={() => handleReject(item.sender.id, item.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListRequestFriend;
