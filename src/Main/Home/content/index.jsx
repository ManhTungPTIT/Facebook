// import styles from "./content.module.scss";
import "./content.scss";

import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Content() {
  const userLocalStorage = localStorage.getItem("user");
  const userData = JSON.parse(userLocalStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileChange = useRef();
  const [fileImg, setFileImg] = useState([]);
  const postText = useRef();
  const [postRes, setPostRes] = useState({});
  const [listImgRes, setImgRes] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    const uploadImg = new FormData();
    fileImg.forEach((img) => {
      uploadImg.append("image", img);
    });

    uploadImg.append("content", postText.current.value);

    uploadImg.append("userId", userObject.id);

    axios
      .post(`http://localhost:8080/post/createPost`, uploadImg, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setPostRes(res.data.newPost);
      });
    postText.current.value = "";
    setFileImg([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickFile = () => {
    fileChange.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileImg(files);
  };

  useEffect(() => {
    if (postRes?.img) {
      const imgs = postRes.img
        .split(",")
        .map((item) => item.replace(/"/g, "").trim());
      setImgRes(imgs);
    }
  }, [postRes]);

  return (
    <div className="content">
      <div className="createContent">
        <div className="create">
          <img src={userData.img} alt="Hinh anh" className="avatar" />
          <button className="btCreateContent" onClick={showModal}>
            {`${userData.name}, bạn đang nghĩ gì thế?`}
          </button>
          <Modal
            title="Tạo bài viết"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className="modalCreate"
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{
              style: { width: "100%" },
            }}
            okText="Đăng"
            getContainer={false}
          >
            <div className="modal_avatar">
              <img src={userData.img} alt="Hinh anh" />
              <inline>{userData.name}</inline>
            </div>
            <div className="modal_content">
              <textarea
                ref={postText}
                className="modal_input"
                placeholder={`${userData.name}, bạn đang nghĩ gì thế?`}
              ></textarea>
              <div className="modal_img">
                {fileImg.map((img, index) => (
                  <div key={index}>
                    <img src={img.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal_file">
              <p>Thêm vào bài viết của bạn</p>
              <div className="modal_file_button">
                <button onClick={handleClickFile}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileChange}
                    onChange={handleFileChange}
                  />
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeFrcJTM5xaTNSVRq-MHRLlJkBVQC4m7dx6QFVALibt3HmEQhhOI8jyiZEG-qky0AzMFNjoyI_rNivdHtIgClZgO"
                    alt="icon"
                  />
                </button>
                <button>
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png?_nc_eui2=AeHQmyDhIuLYh9T5310KS5C9fPQ6N5_OUfV89Do3n85R9YFkhW51tZNGzf913sUgDbD2OyLxLhYLCa5TyEmJ9n9a"
                    alt="icon"
                  />
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="line"></div>
        <div className="content_feature_create">
          <div className="content_feature">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png?_nc_eui2=AeHnTGVQqxXaYUnAPi7zXd7ZueRic5Ym8Wm55GJzlibxacCY7M-u6QHPu3_SG5_D3X2uGC9Pt-rB1fnrntydr0Hk"
              alt="hinh anh"
            />
            <p>Video trực tiếp</p>
          </div>
          <div className="content_feature">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeFrcJTM5xaTNSVRq-MHRLlJkBVQC4m7dx6QFVALibt3HmEQhhOI8jyiZEG-qky0AzMFNjoyI_rNivdHtIgClZgO"
              alt="hinh anh"
            />
            <p>Ảnh/video</p>
          </div>
          <div className="content_feature">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png?_nc_eui2=AeHQmyDhIuLYh9T5310KS5C9fPQ6N5_OUfV89Do3n85R9YFkhW51tZNGzf913sUgDbD2OyLxLhYLCa5TyEmJ9n9a"
              alt="hinh anh"
            />
            <p>Cảm xúc/hoạt động</p>
          </div>
        </div>
      </div>
      <div className="content_list">
        {Object.keys(postRes).length > 0 ? (
          <div className="content_list_item">
            <div className="item_header">
              <div className="item_header_name">
                <img src={userObject.img} alt="hinh anh" />
                <p>{userObject.name}</p>
              </div>
              <CloseIcon className="item_header_icon" />
            </div>
            <div className="item_body">
              <p className={`item_body_text ${expanded ? "show-full" : ""}`}>
                {postRes.des}
              </p>
              {postRes.des.split("\n").join("").length > 100 && (
                <span
                  className="toggle-label"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Thu gọn" : "Xem thêm"}
                </span>
              )}

              <div className="item_body_listImg">
                {Array.isArray(listImgRes) &&
                  listImgRes.length > 0 &&
                  listImgRes
                    .filter((img) => img && img.trim() !== "")
                    .map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="hình ảnh"
                        className="item_body_img"
                      />
                    ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Không có bài viết nào</p>
        )}
      </div>
    </div>
  );
}

export default Content;
