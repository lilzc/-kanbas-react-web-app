import { ReactNode } from "react";
import { DashboardProps } from "../interfaces";

export interface ProtectedRouteProps extends DashboardProps {
  children: ReactNode;
}