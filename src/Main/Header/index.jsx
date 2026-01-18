import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./header.module.scss";
import styles from "./header.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const userLocalStorage = localStorage.getItem("user");
  const userData = JSON.parse(userLocalStorage);
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");

  const handleActive = (value) => {
    if (active !== value) {
      setActive(value);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    axios.post(`http://localhost:8080/user/logout`, {
      userId: userData.id,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("acessToken");
    navigate("/Login");
  };

  const handleChangeMess = () => {
    navigate("/Main/message");
  };

  const redirectToLogin = (event) => {
    navigate("/Login");
  };
  return (
    <div className={styles.header}>
      <div className={styles.navLeft}>
        <div className={styles.logo} onClick={redirectToLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <linearGradient
              id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
              x1="9.993"
              x2="40.615"
              y1="9.993"
              y2="40.615"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#2aa4f4"></stop>
              <stop offset="1" stop-color="#007ad9"></stop>
            </linearGradient>
            <path
              fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
              d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
            ></path>
            <path
              fill="#fff"
              d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
            ></path>
          </svg>
        </div>
        <div className={styles.search}>
          <SearchIcon className={styles.iconSearch} />
          <input className="" placeholder="TÌm kiếm trên facebook" />
        </div>
      </div>
      <div className={styles.navCenter}>
        <div
          className={`${
            active === "Home" ? styles.activeIconControl : styles.iconControl
          }`}
          onClick={() => handleActive("Home")}
        >
          <div className={styles.contentIcon}>
            <HomeIcon className={styles.icon} />
          </div>
        </div>
        <div
          className={`${
            active === "Video" ? styles.activeIconControl : styles.iconControl
          }`}
          onClick={() => handleActive("Video")}
        >
          <div className={styles.contentIcon}>
            <OndemandVideoIcon className={styles.icon} />
          </div>
        </div>
        <div
          className={`${
            active === "Store" ? styles.activeIconControl : styles.iconControl
          }`}
          onClick={() => handleActive("Store")}
        >
          <div className={styles.contentIcon}>
            <StorefrontIcon className={styles.icon} />
          </div>
        </div>
        <div
          className={`${
            active === "Group" ? styles.activeIconControl : styles.iconControl
          }`}
          onClick={() => handleActive("Group")}
        >
          <div className={styles.contentIcon}>
            <GroupIcon className={styles.icon} />
          </div>
        </div>
        <div
          className={`${
            active === "Sport" ? styles.activeIconControl : styles.iconControl
          }`}
          onClick={() => handleActive("Sport")}
        >
          <div className={styles.contentIcon}>
            <SportsEsportsIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.navRight}>
        <div className={styles.iconRight}>
          <MenuIcon />
        </div>
        <div className={styles.iconRight} onClick={handleChangeMess}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
            fill="white"
          >
            <path d="M 25 2 C 12.347656 2 2 11.597656 2 23.5 C 2 30.007813 5.132813 35.785156 10 39.71875 L 10 48.65625 L 11.46875 47.875 L 18.6875 44.125 C 20.703125 44.664063 22.800781 45 25 45 C 37.652344 45 48 35.402344 48 23.5 C 48 11.597656 37.652344 2 25 2 Z M 25 4 C 36.644531 4 46 12.757813 46 23.5 C 46 34.242188 36.644531 43 25 43 C 22.835938 43 20.742188 42.6875 18.78125 42.125 L 18.40625 42.03125 L 18.0625 42.21875 L 12 45.375 L 12 38.8125 L 11.625 38.53125 C 6.960938 34.941406 4 29.539063 4 23.5 C 4 12.757813 13.355469 4 25 4 Z M 22.71875 17.71875 L 10.6875 30.46875 L 21.5 24.40625 L 27.28125 30.59375 L 39.15625 17.71875 L 28.625 23.625 Z"></path>
          </svg>
        </div>
        <div className={styles.iconRight}>
          <NotificationsIcon />
        </div>
        <div className={styles.iconRight}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            {userData?.img ? (
              <AccountCircleIcon />
            ) : (
              <img
                src={userData.img}
                alt="User img"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            disableScrollLock
          >
            <MenuItem onClick={handleLogout}>
              <i
                style={{
                  width: 20,
                  height: 20,
                  backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v4/yK/r/xAIErxldILZ.png?_nc_eui2=AeHwsOByjGGdlx8aADT5Hg3JsvQJVlaS-i-y9AlWVpL6L9vYj3OoVN1bt2rTZ-bGl8wazafCXV9jp1oI9xeg2Uo7&quot)`,
                  backgroundPosition: "0px -260px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "auto",
                }}
              />
              <p>Đăng xuất</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
