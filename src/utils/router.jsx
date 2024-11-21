import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Brands from "../components/Brands/Brands"; 
import Login from "../components/Login/Login"; 
import Register from "../components/Register/Register"; // Import the Register component

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
      {
        path: "/register", // Add the registration route
        element: <Register />, // Render the Register component
      },
      {
        path: "*", // Catch-all route for 404 Not Found
        element: <h2>404 Not Found</h2>, // You can create a NotFound component instead
      },
    ],
  },
]);

export default router;