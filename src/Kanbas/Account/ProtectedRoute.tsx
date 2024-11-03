import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/Kanbas/Account/signin");
    }
  }, [currentUser, navigate]);

  if (currentUser) {
    return children;
  }
  return null;
}