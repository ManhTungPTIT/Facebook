import HelpIcon from "@mui/icons-material/Help";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./Register.scss";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const sexOptions = ["Nữ", "Nam", "Tùy chỉnh"];
  const [selectSex, setSelectSex] = useState(2);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [birthday, setDay] = useState("");
  const [month, setMonth] = useState();
  const [yearBorn, setYear] = useState();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({});

  const handleSex = (value) => {
    if (selectSex === value) {
      setSelectSex(false);
    } else setSelectSex(value);
  };
  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(password);
  };

  const validateEmail = (value) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^[0-9]{10,11}$/;

    if (regexEmail.test(value)) return true;
    if (regexPhone.test(value)) return true;
    return false;
  };

  const validate = () => {
    let newErrors = {};
    if (!usernameRef.current.value) newErrors.email = "Email_error";
    if (!passwordRef.current.value) newErrors.pass = "Pass_error";
    if (!firstNameRef.current.value) newErrors.firstname = "Firstname_error";
    if (!lastNameRef.current.value) newErrors.lastname = "Lastname_error";
    if (!birthday) newErrors.birthday = "Birthday_error";
    if (!month) newErrors.birthday = "Birthday_error";
    if (!yearBorn) newErrors.birthday = "Birthday_error";
    if (!validatePassword(passwordRef.current.value))
      newErrors.pass = "Pass_error";
    if (!validateEmail(usernameRef.current.value))
      newErrors.email = "Email_error";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clickButtonRegister = (event) => {
    event.preventDefault();
    console.log("Eror: ", typeof usernameRef.current.value);
    if (!validate()) return;
    const user = {
      userName: usernameRef.current.value,
      password: passwordRef.current.value,
      name: firstNameRef.current.value + " " + lastNameRef.current.value,
      date: `${yearBorn}-${String(Number(month)).padStart(2, "0")}-${String(
        birthday,
      ).padStart(2, "0")}`,
      sex: selectSex,
    };
    console.log(user);
    axios
      .post("http://localhost:8080/user/register", user)
      .then((response) => {
        if (response.status === 200) {
          console.log("susscess");
          window.location.href = "http://localhost:3000/Facebook/Login";
        } else {
          console.log(response.status);
        }
      })
      .catch(function (error) {
        alert("Tài khoản đã tồn tại");
        let newError = {
          email: "Email_error",
          pass: "Pass_error",
        };
        setError(newError);
      });
  };

  const handleClick = (e) => {
    const field = e.target.name;

    setError((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <div className="register">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
        alt="Logo"
      />
      <div className="formRegister">
        <div className="title">
          <div className="title1">Tạo tài khoản mới</div>
          <div className="title2">Nhanh chóng và dễ dàng</div>
        </div>
        <form>
          <div className="username">
            <div>
              <input
                name="firstname"
                placeholder="Họ"
                ref={firstNameRef}
                onFocus={handleClick}
                style={
                  error.firstname === "Firstname_error"
                    ? { border: "1px solid red" }
                    : {}
                }
              />
              {error.firstname === "Firstname_error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
                  <span>Họ của bạn là gì?</span>
                </div>
              )}
            </div>
            <div>
              <input
                name="lastname"
                placeholder="Tên"
                ref={lastNameRef}
                onFocus={handleClick}
                style={
                  error.lastname === "Lastname_error"
                    ? { border: "1px solid red" }
                    : {}
                }
              />
              {error.lastname === "Lastname_error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
                  <span>Tên của bạn là gì?</span>
                </div>
              )}
            </div>
          </div>
          <div className="bỉthday">
            <div className="birthdayTitle">
              Ngày sinh
              <p>
                <HelpIcon style={{ height: "0.9rem" }} />
              </p>
            </div>
            <div className="inputBirthday">
              <select
                name="birthday"
                onChange={handleChangeDay}
                onFocus={handleClick}
                value={birthday}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select name="month" value={month} onChange={handleChangeMonth}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="yearBorn"
                value={yearBorn}
                onChange={handleChangeYear}
              >
                {Array.from({ length: 62 }, (_, i) => {
                  const yearBir = 1964 + 61 - i;
                  return (
                    <option key={yearBir} value={yearBir}>
                      {yearBir}
                    </option>
                  );
                })}
              </select>
            </div>

            {error.birthday === "Birthday_error" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "red",
                  fontSize: "12px",
                }}
              >
                <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
                <span>
                  Chọn ngày sinh của bạn. Về sau, bạn có thể thay đổi ai nhìn
                  thấy thông tin này.
                </span>
              </div>
            )}
          </div>
          <div className="sex">
            <div className="sexTitle">
              Giới tính
              <p>
                <HelpIcon style={{ height: "0.9rem" }} />
              </p>
            </div>
            <div className="sexContent">
              {sexOptions.map((sex, index) => {
                return (
                  <label key={sex}>
                    {sex}
                    <input
                      type="radio"
                      name="sex"
                      value={sex}
                      checked={selectSex === index}
                      onChange={() => handleSex(index)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="account">
            <div>
              <input
                name="email"
                placeholder="Số di động hoặc email"
                ref={usernameRef}
                onFocus={handleClick}
              />
              {error.email === "Email_error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
                  <span>
                    Vui lòng nhập số di động hoặc địa chỉ email hợp lệ
                  </span>
                </div>
              )}
            </div>
            <div>
              <input
                name="pass"
                placeholder="Mật khẩu mới"
                type="password"
                onFocus={handleClick}
                ref={passwordRef}
              />
              {error.pass === "Pass_error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  <ErrorOutlineIcon style={{ width: "15px", height: "15px" }} />
                  <span style={{ width: "100%", textAlign: "start" }}>
                    Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và
                    dấu chấm câu (như ! và &)
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="footerTitle">
            Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên
            hệ của bạn lên Facebook
          </div>
          <div className="footerTitle">
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
            quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận
            được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
          </div>
          <div
            type="button"
            className="btRegister"
            onClick={clickButtonRegister}
          >
            <button>Đăng ký</button>
          </div>
          <div className="rdLogin">
            <Link to="/">Bạn đã có tài khoản ư?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
