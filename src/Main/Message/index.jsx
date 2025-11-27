import { Route, Routes } from "react-router-dom";
import "./message.scss";
import DetailMess from "./Detail-mess/detailMess";

function Message() {
  return (
    <div className="mess">
      <Routes>
        <Route path="/Message" element={<Message />}>
          <Route index element={<DetailMess />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Message;
