import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginFrom() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isCheckButtonPass, setButtonPass] = useState(false);

  const divRef = useRef();
  const divRefPass = useRef(null);
  const refName = useRef(null);
  const refPass = useRef(null);

  const [checkPass, setPass] = useState({
    password: "",
    showPass: false,
  });

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsFocused(false); // Khi click ra ngoài div
    }
  };

  const handleInsidePass = (event) => {
    if (divRefPass.current && !divRefPass.current.contains(event.target)) {
      setIsFocusedPass(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleInsidePass);
    return () => {
      document.removeEventListener("mousedown", handleInsidePass);
    };
  });

  const handleClickShowPassword = () => {
    setPass({
      ...checkPass,
      showPass: !checkPass.showPass,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setButtonPass(true);
    setPass({
      ...checkPass,
      [prop]: event.target.value,
    });
  };

  const clickLogin = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8080/user/login`, {
        userName: refName.current.value,
        password: refPass.current.value,
      })
      .then((res) => {
        const user = jwtDecode(res.data.jwtToken.access);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("refreshToken", res.data.jwtToken.refresh);
        localStorage.setItem("acessToken", res.data.jwtToken.access);

        const dayObject = new Date(Date.now());
        const dayExpires = dayObject.toString();
        localStorage.setItem("expiresIn", dayExpires);

        if (res.status === 200)
          window.location.href = "http://localhost:3000/Facebook/Main/";
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="LoginFrom">
      <form>
        <div className="LoginFrom_text">
          <div
            ref={divRef}
            className="input"
            onClick={() => setIsFocused(true)}
            style={{
              border: isFocused
                ? "1px solid blue"
                : "1.5px solid rgb(203, 206, 214)",
            }}
          >
            <input placeholder="Email hoặc số điện thoại" ref={refName} />
          </div>
          <div
            className="input passText"
            ref={divRefPass}
            style={{
              border: isFocusedPass
                ? "1px solid blue"
                : "1.5px solid rgb(203, 206, 214)",
            }}
            onClick={() => setIsFocusedPass(true)}
          >
            <input
              ref={refPass}
              placeholder="Mật khẩu"
              type={checkPass.showPass ? "text" : "password"}
              value={checkPass.password}
              onChange={handlePasswordChange("password")}
            />
            <button
              className="btLogin"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{
                visibility: isCheckButtonPass ? "visible" : "hidden",
              }}
            >
              {checkPass.showPass ? (
                <RemoveRedEyeIcon className="eye" />
              ) : (
                <VisibilityOffIcon className="eye" />
              )}
            </button>
          </div>
        </div>
        <div className="LoginFrom_button">
          <button onClick={clickLogin}>Đăng nhập</button>
        </div>
        <div className="LoginFrom_forgot">
          <a>Quên mật khẩu</a>
        </div>
        <div
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          -------------------------------------------------------
        </div>
        <div className="LoginFrom_register">
          <button>
            <Link to="/Register">Tạo tài khoản mới</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFrom;
