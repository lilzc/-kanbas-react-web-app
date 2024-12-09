import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import React from "react";
import { ProtectedRouteProps } from "./types";

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  return React.cloneElement(props.children as React.ReactElement, props);
}