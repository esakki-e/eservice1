import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {

    const phoneNumber =
        localStorage.getItem(
            "customerPhone"
        );

    if (!phoneNumber) {

        return (
            <Navigate
                to="/customer-login"
            />
        );
    }

    return children;
}

export default CustomerProtectedRoute;