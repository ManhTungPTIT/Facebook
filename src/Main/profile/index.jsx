import styles from "./profile.module.scss";
import img1 from "../../image/125796022_191191549168188_8437059786598980563_n.jpg";
import New from "./new/new";

import { PlusOutlined, CameraFilled } from "@ant-design/icons";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Routes, Route } from "react-router";

function Profile() {
  const [act, setAct] = useState(null);

  const handleActive = (value) => {
    if (act !== value) {
      setAct(value);
    }
  };
  return (
    <div className={styles.profile_contain}>
      <div className={styles.profile_header}>
        <div className={styles.profile_img}>
          <img src={img1} alt="Anh" />
          <button className={styles.profile_header_control}>
            <CameraFilled /> Chỉnh sửa ảnh bìa
          </button>
        </div>
        <div className={styles.profile_header_content}>
          <div className={styles.profile_header_content_avatar}>
            <img src={img1} alt="Anh" />
          </div>
          <div className={styles.profile_header_content_avatar_control}>
            <p>Nguyễn Mạnh Tùng</p>
            <a href="sahfjkash">so nguoi ban</a>
          </div>
          <div className={styles.profile_header_content_control}>
            <button className={styles.bt1}>
              <PlusOutlined />
              Thêm vào tin
            </button>
            <button className={styles.bt2}>
              <EditIcon></EditIcon>
              Chỉnh sửa trang cá nhân
            </button>
          </div>
        </div>

        <div className={styles.profile_header_control}>
          <div
            className={`${
              act === "News"
                ? styles.profile_header_control_item_active
                : styles.profile_header_control_item
            }`}
            onClick={() => handleActive("News")}
          >
            Bài viết
          </div>
          <div
            className={`${
              act === "Intro"
                ? styles.profile_header_control_item_active
                : styles.profile_header_control_item
            }`}
            onClick={() => handleActive("Intro")}
          >
            Giới thiệu
          </div>
          <div
            className={`${
              act === "Friend"
                ? styles.profile_header_control_item_active
                : styles.profile_header_control_item
            }`}
            onClick={() => handleActive("Friend")}
          >
            Bạn bè
          </div>
          <div
            className={`${
              act === "Img"
                ? styles.profile_header_control_item_active
                : styles.profile_header_control_item
            }`}
            onClick={() => handleActive("Img")}
          >
            Ảnh
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/Profile" element={<Profile />}>
          <Route index element={<New />} />
        </Route>
      </Routes>
    </div>
  );
}
export default Profile;
