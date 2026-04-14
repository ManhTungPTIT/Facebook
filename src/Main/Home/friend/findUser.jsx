import axios from "axios";
import "./findUser.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import API_URL from "../../../config/api.ts";
import { useEffect, useState } from "react";

function FindUser({ searchData }) {
  const [userToRender, setUserToRender] = useState([]);

  useEffect(() => {
    const users = [
      ...(searchData.Users ?? []),
      ...(searchData.UserRequest ?? []),
      ...(searchData.UserFriend ?? []),
    ];
    setUserToRender(users);
  }, [searchData]);

  console.log(searchData);
  console.log(userToRender);
  const clickAddFriend = (user) => {
    const userCurrent = JSON.parse(localStorage.getItem("user"));
    console.log("Click add friend");
    console.log("ID: ", userCurrent.id, "and", user.id);

    if (user.relationStatus === "none") {
      axios
        .post(`${API_URL}/user/requestAddFriend`, {
          senderID: userCurrent.id,
          receiverID: user.id,
        })
        .then((res) => {
          console.log(res);
        });

      setUserToRender((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, relationStatus: "pending" } : u,
        ),
      );
    } else {
      axios.post(`${API_URL}/user/cancelFriendRequest`, {
        senderId: userCurrent.id,
        receiverId: user.id,
      });
      setUserToRender((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, relationStatus: "none" } : u,
        ),
      );
    }
  };

  return (
    <div className="findUser_container">
      {userToRender.length === 0 ? (
        <p
          style={{
            color: "white",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Không tìm thấy kết quả nào
        </p>
      ) : (
        userToRender.map((user) => (
          <div className="user_item">
            <div className="user_info" key={user.id}>
              {user.img ? (
                <img src={user.img} alt="Avartar" />
              ) : (
                <AccountCircleIcon
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.3rem",
                    cursor: "pointer",
                  }}
                />
              )}
              <p>{user.name}</p>
            </div>
            <button type="button" onClick={() => clickAddFriend(user)}>
              {user.relationStatus === "none"
                ? "Thêm bạn bè"
                : user.relationStatus === "pending"
                  ? "Hủy kết bạn"
                  : "Bạn bè"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FindUser;
