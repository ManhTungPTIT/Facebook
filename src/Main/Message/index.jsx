import "./message.scss";
import DetailMess from "./Detail-mess/DetailMess.jsx";
import ListMess from "./List-mess/listMess.jsx";

function Message() {
  return (
    <div className="mess">
      <ListMess />
      <DetailMess />
    </div>
  );
}

export default Message;
