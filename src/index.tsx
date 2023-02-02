import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import {
    faSquareFacebook,
    faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./app/store";

library.add(fab, faPhone, faBars, faClose, faSquareFacebook, faInstagramSquare);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>
);
