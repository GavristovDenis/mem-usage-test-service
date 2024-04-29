import authStore from "../consts/authStore";
import { IconButton } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
export const Header = () => {
  const { loggedInUser, setLoggedUser, setIsLoggedIn } = authStore();
  const handleLogout = () => {
    setIsLoggedIn(false), setLoggedUser("");
  };
  return (
    <div className="header_container">
      <div className="header_wrapper">
        <div className="header_title">Очёты о потреблении ОЗУ</div>
        <div className="header_user_block">
          <div className="header_user_info">{loggedInUser}</div>{" "}
          <IconButton onClick={handleLogout}>
            <MeetingRoomIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
