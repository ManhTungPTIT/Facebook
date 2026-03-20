import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginFrom() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isCheckButtonPass, setButtonPass] = useState(false);
  const [error, setError] = useState({});

  const divRef = useRef();
  const divRefPass = useRef(null);
  const refName = useRef("email");
  const refPass = useRef("password");

  const [checkPass, setPass] = useState({
    password: "",
    showPass: false,
  });

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsFocused(false); // Khi click ra ngoài div
    }
  };

  const validate = () => {
    let newError = {};
    if (!refName.current.value) newError.email = "Email_not_found";
    if (!refPass.current.value) newError.pass = "Password_not_found";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleClick = (event) => {
    {
      let newError = {};
      setError(newError);
      setIsFocused(true);
      setIsFocusedPass(true);
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
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleInsidePass);
    return () => {
      document.removeEventListener("mousedown", handleInsidePass);
    };
  }, []);

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

    if (!validate()) return;
    axios
      .post(`http://localhost:8080/user/login`, {
        userName: refName.current.value,
        password: refPass.current.value,
      })
      .then((res) => {
        const user = jwtDecode(res.data.jwtToken.access);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("refreshToken", res.data.jwtToken.refresh);
        localStorage.setItem("accessToken", res.data.jwtToken.access);

        const dayObject = new Date(Date.now());
        const dayExpires = dayObject.toString();
        localStorage.setItem("expiresIn", dayExpires);

        if (res.status === 200)
          window.location.href = "http://localhost:3000/Facebook/Main/";
      })
      .catch(function (error) {
        const message = error.response?.data?.error;
        console.log(message);
        setError(message);
      });
  };

  return (
    <div className="LoginFrom">
      <form>
        <div className="LoginFrom_text">
          <div
            ref={divRef}
            className="input"
            onClick={handleClick}
            style={
              error.email === "Email_not_found"
                ? {
                    border: "1px solid red",
                    borderRadius: "10px",
                  }
                : {
                    border: isFocused
                      ? "1px solid blue"
                      : "1.5px solid rgb(203, 206, 214)",
                    borderRadius: "10px",
                  }
            }
          >
            <input placeholder="Email hoặc số di động" ref={refName} />
          </div>
          {error.email === "Email_not_found" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "red",
                fontSize: "12px",
                marginLeft: "5px",
              }}
            >
              <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
              <span>
                Email hoặc số di động bạn nhập không kết nối với tài khoản nào
              </span>
            </div>
          )}

          <div
            className="input passText"
            ref={divRefPass}
            style={
              error.pass === "Password_not_found"
                ? {
                    border: "1px solid red",
                    borderRadius: "10px",
                  }
                : {
                    border: isFocusedPass
                      ? "1px solid blue"
                      : "1.5px solid rgb(203, 206, 214)",
                    borderRadius: "10px",
                  }
            }
            onClick={handleClick}
          >
            <input
              ref={refPass}
              placeholder="Mật khẩu"
              type={checkPass.showPass ? "text" : "password"}
              value={checkPass.password}
              defaultValue="Empty"
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
          {error.pass === "Password_not_found" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "red",
                fontSize: "12px",
                marginLeft: "5px",
              }}
            >
              <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
              Mật khẩu bạn đã nhập không chính xác
            </div>
          )}
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
