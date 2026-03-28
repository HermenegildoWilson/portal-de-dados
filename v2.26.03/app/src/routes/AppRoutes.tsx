import { Routes, Route } from "react-router-dom";

import AppLayout from "@/Layout/AppLayout";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/public/NotFound";
import Home from "@/pages/public/Home";
import SignIn from "@/pages/public/SignIn";
import SignUp from "@/pages/public/SignUp";
import SignOut from "@/pages/public/SignOut";
import VerifyEmail from "@/pages/public/VerifyEmail";
import ValidateSignUp from "@/pages/public/ValidateSignUp";
import Main from "@/pages/screens";
import Profife from "@/pages/screens/Perfil";
import { useAuth } from "@/hooks/useAuth";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/**
         * PROTECTED PAGES (ROUTES)
         */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/profife" element={<Profife user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/**
         *  PUBLIC PAGES (ROUTES)
         */}
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/verify" element={<VerifyEmail />} />
        <Route path="/signup/validate" element={<ValidateSignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
