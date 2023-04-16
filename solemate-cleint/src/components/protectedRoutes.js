import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



function ProtectedRoute({ children }) {

    const { getIsLoggedIn } = useContext(AuthContext);
    const isLoggedIn = getIsLoggedIn();

    if (isLoggedIn) {
        return children;
    }
    else {
        return <Navigate to="/signup" />
    }

};

export default ProtectedRoute;