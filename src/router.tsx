import { createBrowserRouter } from "react-router";
import App from "./App";
import { HowToUse } from "./Pages/HowToUse";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/como-usar", element: <HowToUse /> },
]);
