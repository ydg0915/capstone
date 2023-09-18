import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Reset from "./styles/Reset";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./_reducers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Reset />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
