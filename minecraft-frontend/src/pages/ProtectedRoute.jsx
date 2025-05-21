import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const session = Cookies.get("session");

    if (!session) {
        return <Navigate to="/login" replace></Navigate>
    }

    return children
}

export default ProtectedRoute