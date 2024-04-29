import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../consts/authStore";
import axios from "axios";
export const Auth = () => {
  const { setIsLoggedIn, setLoggedInUser } = authStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async () => {
    event.preventDefault();
    try {
      const data = {
        Username: username,
        Password: password,
      };
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        data
      );
      localStorage.clear();
      setIsLoggedIn(true);
      setLoggedInUser(response.data.username);
      setIsError(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };
  return (
    <div className="login_page">
      <div className={isError ? "login_container_error" : "login_container"}>
        <div className="login_inputs">
          <label>Имя пользователя</label>
          <input
            className="login_inputs_login"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          ></input>
          <label>Пароль</label>
          <input
            className="login_inputs_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          ></input>
        </div>
        {isError ? (
          <div className="login_error_message">Неправильно введены данные</div>
        ) : null}
        <div className="login_buttons">
          <button onClick={handleLogin}>Войти</button>
        </div>
      </div>
    </div>
  );
};
