import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return children;
};
