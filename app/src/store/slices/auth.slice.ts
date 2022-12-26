import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const name = "auth";

interface AuthUser {
  iss: string;
  nbf: string;
  email: string;
  aud: string;
  sub: string;
  hd: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface AuthState {
  user: AuthUser;
  loading: false;
  jwtToken: string;
}
const jwtToken = localStorage.getItem("auth");
const initialState = {
  jwtToken,
  user: jwtToken ? jwtDecode(jwtToken) : null,
} as AuthState;

export const selectAuthUser = createSelector(
  [(state) => state[name]],
  (slice): AuthUser => {
    return slice.user;
  }
);

export const selectAuthToken = createSelector(
  [(state) => state[name]],
  (slice): string => {
    return slice.jwtToken;
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthUser>) {
      const { payload } = action;
      state.user = payload;
    },
    logout(state) {
      localStorage.removeItem("auth");
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice;
