import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { userToken, user } = useContext(AuthContext);

  if (userToken && !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          <p className="text-blue-400 font-medium text-sm animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  console.log(userToken,user);

  if (!userToken) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
}
