import "./App.css";
import Login from "./Authen/Login/index";
import Register from "./Authen/Register/index";
import Main from "./Main/index";
import { Navigate, Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import Home from "./Main/Home";
import Profile from "./Main/profile";
import PrivateRoute from "./Main/privateRoute";
import Message from "./Main/Message";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="message" element={<Message />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
