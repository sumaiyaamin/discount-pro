import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Brands from "../components/Brands/Brands"; 
import Login from "../components/Login/Login"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/brands", 
        element: <Brands />, 
      },
      {
        path: "/login", 
        element: <Login />, 
      },
    ],
  },
]);

export default router;