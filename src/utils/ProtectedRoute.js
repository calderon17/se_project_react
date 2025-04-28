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
