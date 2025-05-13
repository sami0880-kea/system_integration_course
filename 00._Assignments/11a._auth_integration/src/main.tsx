import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <Auth0Provider
        domain="dev-zpsfap1rfqtvew6b.us.auth0.com"
        clientId="YW8EB4ozF8sdjiXMRt1DT1CSAOrfBu63"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Theme>
  </React.StrictMode>
);
