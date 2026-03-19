import img from "../../../image/beautiful-girl-7686298_640.webp";
import "./findUser.scss";

function FindUser({ searchData }) {
  searchData.map((item, index) => {
    console.log("Item: ", item);
  });
  console.log("Data search: ", searchData);
  return (
    <div className="findUser_container">
      {searchData.map((user, index) => (
        <div className="user_item">
          <div className="user_info">
            <img src={user.img} alt="Avartar" />
            <p>{user.name}</p>
          </div>
          <button>Thêm bạn bè</button>
        </div>
      ))}
    </div>
  );
}

export default FindUser;
