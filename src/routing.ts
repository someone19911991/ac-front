import { IRoutes } from "./types";
import Contact from "./features/Contact/Contact";
import Calculator from "./features/Calculator/Calculator";
import Home from "./features/Home/Home";
import OrderCall from "./features/OrderCall/OrderCall";

const routing: IRoutes = {
    publicRoutes: [
        { path: "", element: Home },
        // { path: "contact", element: Contact },
        { path: "calculator", element: Calculator },
        { path: "order_call", element: OrderCall },
    ]
};

export default routing;
