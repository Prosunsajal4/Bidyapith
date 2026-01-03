import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../provider/PrivateRoute";
import ErrorComponent from "../components/ErrorComponent";
import Totalskills from "../pages/TotalSkills";
import SkillDetails from "../pages/SkillDetails";
import MyProfile from "../pages/MyProfile";
import ForgotPassword from "../pages/ForgotPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import MyEnrolled from "../pages/dashboard/MyEnrolled";
import AddCourse from "../pages/dashboard/AddCourse";
import MyAddedCourse from "../pages/dashboard/MyAddedCourse";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import Payment from "../pages/Payment";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Help from "../pages/Help";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            const arr = Array.isArray(data)
              ? data
              : data.courses || data.data || [];
            // Fallback to local skills.json if backend returned empty array
            if (!arr.length) {
              try {
                const fb = await fetch("/skills.json");
                const localData = await fb.json();
                return localData;
              } catch {
                return arr; // return empty if fallback fails
              }
            }
            return arr;
          } catch (error) {
            console.error("Error loading courses:", error);
            // Fallback to local JSON if API fails
            try {
              const fallback = await fetch("/skills.json");
              return await fallback.json();
            } catch {
              return [];
            }
          }
        },
      },
      {
        path: "/courses",
        element: <Totalskills></Totalskills>,
        loader: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            const arr = Array.isArray(data)
              ? data
              : data.courses || data.data || [];
            if (!arr.length) {
              try {
                const fb = await fetch("/skills.json");
                const localData = await fb.json();
                return localData;
              } catch {
                return arr;
              }
            }
            return arr;
          } catch (error) {
            console.error("Error loading courses:", error);
            // Fallback to local JSON if API fails
            try {
              const fallback = await fetch("/skills.json");
              return await fallback.json();
            } catch {
              return [];
            }
          }
        },
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <Help />,
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "overview", element: <DashboardOverview /> },
      { path: "my-enrolled", element: <MyEnrolled></MyEnrolled> },
      { path: "add-course", element: <AddCourse></AddCourse> },
      { path: "my-added", element: <MyAddedCourse></MyAddedCourse> },
      { path: "payment-history", element: <PaymentHistory></PaymentHistory> },
    ],
  },
  {
    path: "/skill-details/:id",
    element: (
      <PrivateRoute>
        <SkillDetails></SkillDetails>
      </PrivateRoute>
    ),
    loader: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        const arr = Array.isArray(data)
          ? data
          : data.courses || data.data || [];
        if (!arr.length) {
          try {
            const fb = await fetch("/skills.json");
            const localData = await fb.json();
            return localData;
          } catch {
            return arr;
          }
        }
        return arr;
      } catch (error) {
        console.error("Error loading courses:", error);
        // Fallback to local JSON if API fails
        try {
          const fallback = await fetch("/skills.json");
          return await fallback.json();
        } catch {
          return [];
        }
      }
    },
  },
  {
    path: "/*",
    element: <ErrorComponent />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        <Payment />
      </PrivateRoute>
    ),
  },
]);

export default router;
