import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App"; // Replace with your main app component file
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material";

// Removed Stripe-related imports

const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/*<ThemeProvider theme={theme}>*/}
          <App />
          {/*</ThemeProvider>*/}
        </PersistGate>
      </Provider>
    </React.StrictMode>
);
