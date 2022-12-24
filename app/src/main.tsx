import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { store } from "@store";
import { Provider as ReduxProvider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleConfig } from "@config";
const theme = createTheme({
  direction: "rtl",
  palette: {
    text: {
      primary: "#252d6d",
      secondary: "#000000",
    },
    primary: {
      light: "#55569c",
      main: "#252d6d",
      dark: "#000441",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#f3e8ff",
      main: "#c1c9ff",
      dark: "#9098cc",
      contrastText: "#000000",
    },
  },
  typography: {
    h1: {
      color: "#252d6d",
      fontSize: "2.5rem",
    },
    h2: {
      color: "#252d6d",
      fontSize: "2.25rem",
    },
    h3: {
      color: "#252d6d",
      fontSize: "2rem",
    },
    h4: {
      color: "#252d6d",
      fontSize: "1.75rem",
    },
    h5: {
      color: "#252d6d",
      fontSize: "1.5rem",
    },
    h6: {
      color: "#252d6d",
      fontSize: "1.25rem",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GoogleConfig.clientId}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
