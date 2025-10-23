import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import NewsDetails from "../pages/SkillDetails";
import PrivateRoute from "../provider/PrivateRoute";
import ErrorComponent from "../components/ErrorComponent";
import Totalskills from "../pages/TotalSkills";
import SkillDetails from "../pages/SkillDetails";
import MyProfile from "../pages/MyProfile";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        index: true,
        path: "",
        element: <Totalskills></Totalskills>,
        loader: () => fetch("/skills.json"),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/skill-details/:id",
    element: (
      <PrivateRoute>
        <SkillDetails></SkillDetails>
      </PrivateRoute>
    ),
    loader: () => fetch("/skills.json"),
  },
  {
    path: "/myprofile",
    element: (
      <PrivateRoute>
        <MyProfile></MyProfile>
      </PrivateRoute>
    ),
    loader: () => fetch("/skills.json"),
  },
  {
    path: "/*",
    element: <ErrorComponent />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
