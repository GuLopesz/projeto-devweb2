import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;