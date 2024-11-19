import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import About from "../components/About/About";

const router = createBrowserRouter([

  {
    path : "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element : <Home ></Home>
      },
      {
        path:"/about",
        element : <About />
      }

    ]

  }

])

export default router;