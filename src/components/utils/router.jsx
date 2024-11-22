import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import Login from "../Login/Login"; 
import Register from "../Register/Register"; 
import CouponPage from "../CouponPage/CouponPage"; 
import AboutUs from "../About/About"; 
import Brands from "../Brands/Brands";
import MyProfile from "../MyProfile/MyProfile"; 
import UpdateProfile from "../UpdateProfile/UpdateProfile"; 
import PrivateRoute from "../PrivateRoute/PrivateRoute"; 
import NotFound from "../NotFound/NotFound"; 
import ForgotPassword from "../ForgotPassword/ForgotPassword"; // Import ForgotPassword component

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // Home route
        element: <Home />,
      },
      {
        path: "/login", 
        element: <Login />, 
      },
      {
        path: "/register", 
        element: <Register />, 
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/brand/:id", 
        element: (
          <PrivateRoute>
            <CouponPage />
          </PrivateRoute>
        ), // Use PrivateRoute for CouponPage
      },
      {
        path: "/my-profile", 
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ), // Use PrivateRoute for MyProfile
      },
      {
        path: "/my-profile/update", 
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ), // Use PrivateRoute for UpdateProfile
      },
      {
        path: "/about", 
        element: <AboutUs />, 
      },
      {
        path: "/forgot-password", 
        element: <ForgotPassword />, // Route for Forgot Password
      },
      {
        path: "*", // Catch-all for undefined routes
        element: <NotFound />, // Use NotFound component for undefined routes
      },
    ],
  },
]);

export default router; // Export the router