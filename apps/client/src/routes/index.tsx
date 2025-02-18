import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layout/base_layout";
import ProtectedRoute from "./protected-route";
import { Dashboard } from "../pages/dashboard.page";
import AdminLoginPage from "../pages/login/admin-login-page";
import { RegisterPage } from "../pages/register/admin-register-page";
import UserLoginPage from "../pages/login/user-login-page";
import { HomeLayout } from "../layout/home_layout";
import { UserList } from "../pages/user";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: (
      <BaseLayout>
        <AdminLoginPage />
      </BaseLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <BaseLayout>
        <UserLoginPage />
      </BaseLayout>
    ),
  },
  {
    path: "/admin/signup",
    element: (
      <BaseLayout>
        <RegisterPage />
      </BaseLayout>
    ),
  },
  {
    path: "*",
    element: <HomeLayout />,
  },
  {
    path: "/",
    element: (
      //  <ProtectedRoute>
      <HomeLayout />
      // </ProtectedRout
      // e>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/user",
        element: <UserList />,
      },
    ],
  },
]);
