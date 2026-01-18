import { SearchOutlined } from "@ant-design/icons";
import img1 from "../../../image/beautiful-girl-7686298_640.webp";
import "./listMess.scss";
import { Color } from "antd/es/color-picker";

function ListMess() {
  return (
    <div className="listMess">
      <h1>Đoạn chat</h1>
      <div className="search-contain">
        <label>
          <SearchOutlined
            style={{
              color: "rgb(138,140,144)",
              fontSize: "1.3rem",
              marginLeft: "0.3rem",
            }}
          />
          <input type="search" placeholder="Tìm kiếm trên Message" />
        </label>
      </div>
      <div className="listMess-contain">
        <div className="messItem">
          <img src={img1} alt="avata" />
          <p>Nguyen Van A</p>
        </div>
        <div className="messItem">
          <img src={img1} alt="avata" />
          <p>Hoi choi the thao dien tu va bay nhay----------</p>
        </div>
      </div>
    </div>
  );
}

export default ListMess;
