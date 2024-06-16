import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./index.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { StateContextProvider } from "./context";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const number = 11155111;
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider
        activeChain={Sepolia}
        clientId="f3ea69940e1d22967b67532367fa8f5b" // You can get a client id from dashboard settings
      >
        <StateContextProvider>
          {" "}
          <App />
        </StateContextProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);
