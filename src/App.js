import "./App.css";
import Login from "./Authen/Login/index";
import Register from "./Authen/Register/index";
import Main from "./Main/index";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import Home from "./Main/Home";
import Profile from "./Main/profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
