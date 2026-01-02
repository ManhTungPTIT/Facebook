import HelpIcon from "@mui/icons-material/Help";
import "./Register.scss";
import { useRef, useState } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";

function Register() {
  const sexOptions = ["Nữ", "Nam", "Tùy chỉnh"];
  const [selectSex, setSelectSex] = useState(2);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [birthday, setDay] = useState("01");
  const [month, setMonth] = useState(1);
  const [yearBorn, setYear] = useState(new Date().getFullYear());
  const usernameRef = useRef();
  const passwordRef = useRef();

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

  const clickButtonRegister = (event) => {
    event.preventDefault();
    const user = {
      userName: usernameRef.current.value,
      password: passwordRef.current.value,
      name: firstNameRef.current.value + " " + lastNameRef.current.value,
      date: `${yearBorn}-${String(Number(month)).padStart(2, "0")}-${String(
        birthday
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
        console.error(error);
      });
  };

  return (
    <div className="register">
      <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" />
      <div className="formRegister">
        <div className="title">
          <div className="title1">Tạo tài khoản mới</div>
          <div className="title2">Nhanh chóng và dễ dàng</div>
        </div>
        <form>
          <div className="username">
            <input placeholder="Họ" ref={firstNameRef} />
            <input placeholder="Tên" ref={lastNameRef} />
          </div>
          <div className="bỉthday">
            <div className="birthdayTitle">
              Ngày sinh
              <a>
                <HelpIcon style={{ height: "0.9rem" }} />
              </a>
            </div>
            <div className="inputBirthday">
              <select onChange={handleChangeDay} value={birthday}>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select value={month} onChange={handleChangeMonth}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select value={yearBorn} onChange={handleChangeYear}>
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
          </div>
          <div className="sex">
            <div className="sexTitle">
              Giới tính
              <a>
                <HelpIcon style={{ height: "0.9rem" }} />
              </a>
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
            <input placeholder="Số di động hoặc email" ref={usernameRef} />
            <input
              placeholder="Mật khẩu mới"
              type="password"
              ref={passwordRef}
            />
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
