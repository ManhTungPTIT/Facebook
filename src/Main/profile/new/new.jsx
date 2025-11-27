import "./new.scss";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Outlet } from "react-router";

function New() {
  return (
    <div className="profile_new">
      <Outlet />
      <div className="profile_new_left">
        <h2>Giới thiệu</h2>
        <div className="profile_new_left_item">
          <BusinessCenterIcon />
          <p>Lam viec tai .....</p>
        </div>
        <div className="profile_new_left_item">
          <HouseIcon />
          <p>Hien tai o ...</p>
        </div>
        <div className="profile_new_left_item">
          <LocationOnIcon />
          <p>Den tu ...</p>
        </div>
        <div className="profile_new_left_item">
          <FavoriteIcon />
          <p>Doc than </p>
        </div>
      </div>
      <div className="profile_new_right">
        
      </div>
    </div>
  );
}

export default New;
