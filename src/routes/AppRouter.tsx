import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import { PageRoutes } from "../utils/pageRoutes";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import Header from "../components/Header";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path={PageRoutes.HOME} element={<Home />} />
        <Route path={PageRoutes.LOGIN} element={<Login />} />
        <Route path={PageRoutes.SIGNUP} element={<Signup />} />

        <Route
          path={PageRoutes.PROFILE + "/:uid"}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PageRoutes.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
