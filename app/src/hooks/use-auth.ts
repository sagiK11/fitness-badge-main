import { useDispatch, useSelector } from "react-redux";
import {
  logout as logoutAction,
  login as loginAction,
  selectAuthUser,
} from "@store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { routesTree } from "@routes";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(selectAuthUser);

  const logout = (): void => {
    dispatch(logoutAction());
    navigate(routesTree.auth);
  };

  const login = (token: string): void => {
    dispatch(loginAction(jwtDecode(token)));
    navigate(routesTree.home);
    localStorage.setItem("auth", token);
  };

  return { logout, login, isAuthenticated: !!authUser, authUser };
};
