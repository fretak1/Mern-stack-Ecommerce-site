import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // 1️⃣ Not authenticated and trying to access protected routes
  if (
    !isAuthenticated &&
    !(path.includes("/login") || path.includes("/register"))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2️⃣ Authenticated but trying to access login/register
  if (
    isAuthenticated &&
    (path.includes("/login") || path.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/customer/home" replace />;
    }
  }

  // 3️⃣ Unauthorized role trying to access wrong section
  if (isAuthenticated && user?.role !== "admin" && path.includes("admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && user?.role === "admin" && path.includes("customer")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 4️⃣ Special case: root path `/`
  if (path === "/") {
    if (isAuthenticated) {
      return user?.role === "admin" ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <Navigate to="/customer/home" replace />
      );
    } else {
      return <Navigate to="/auth/login" replace />;
    }
  }

  // ✅ Otherwise allow access
  return <>{children}</>;
}

export default CheckAuth;
