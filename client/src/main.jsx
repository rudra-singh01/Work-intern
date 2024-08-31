import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-i8ifsf3a8wecj6du.us.auth0.com"
    clientId="vkkKnNNgzOPLLkw1ra9iNtEE1Ya0TwMM"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>
);
