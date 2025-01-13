import { Navigate, Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/others/Loading";
import Forbidden from "../pages/error/Forbidden";
import { AuthContext } from "./../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "user" | "viewer" | "app" | "anonymous")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);
  const { projectKey } = useParams();

  const [checked, setChecked] = useState(false); // To ensure re-checking occurs
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts
  const maxRetries = 3; // Maximum retry attempts

  useEffect(() => {
    // Retry logic for slow network / delayed user data
    if (authContext?.loading === false && retryCount < maxRetries) {
      setChecked(true); // Proceed after loading is complete
    } else if (retryCount < maxRetries) {
      const timeout = setTimeout(() => {
        setRetryCount((prev) => prev + 1); // Increment retry count
      }, 2000); // Retry every 2 seconds

      return () => clearTimeout(timeout); // Clean up timeout on component unmount or retry
    }
  }, [authContext?.loading, retryCount]);

  if (!authContext) {
    return <Navigate to="/:projectKey/login" replace />;
  }

  const { user, loading } = authContext;

  // Check before proceeding if context or loading state is incomplete
  if (loading && retryCount < maxRetries) {
    return (
      <Loading text={`Loading... Attempt ${retryCount + 1} of ${maxRetries}`} />
    );
  }

  if (!user && retryCount >= maxRetries) {
    return (
      <Navigate to={`/${projectKey ? projectKey + "/login" : ""}`} replace />
    );
  }
  if (
    !allowedRoles.includes(user?.type!) &&
    !loading &&
    retryCount >= maxRetries
  ) {
    return <Forbidden />;
  }

  return checked ? <Outlet /> : <Loading text="Rechecking..." />;
};

export default ProtectedRoute;
