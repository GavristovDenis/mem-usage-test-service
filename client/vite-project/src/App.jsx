import { useEffect } from "react";
import { Auth } from "./pages/auth/Auth";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Graph } from "./pages/graph/graph";
import authStore from "./consts/authStore";
export const App = () => {
  const { isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser } =
    authStore();
  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    const loggedInUserLocalStorage = localStorage.getItem("loggedInUser");

    if (isLoggedInLocalStorage !== null && loggedInUserLocalStorage !== null) {
      setIsLoggedIn(JSON.parse(isLoggedInLocalStorage));
      setLoggedInUser(JSON.parse(loggedInUserLocalStorage));
    }
  }, [setIsLoggedIn, setLoggedInUser]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [isLoggedIn, loggedInUser]);

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Graph />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
