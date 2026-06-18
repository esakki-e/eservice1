import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/owner/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Services from "./pages/owner/Services";
import CreateService from "./pages/owner/CreateService.jsx";
import EditService
    from "./pages/owner/EditService";
import CreateRequest
    from "./pages/customer/CreateRequest";
import Requests
    from "./pages/owner/Requests";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyRequests from "./pages/customer/MyRequests";
import Employees from "./pages/owner/Employees";
import ServiceDocuments
    from "./pages/customer/ServiceDocuments";
import CustomerServices
    from "./pages/customer/CustomerServices";
import Users
    from "./pages/owner/Users";
import LandingPage from "./pages/LandingPage";
import CustomerLogin
    from "./pages/customer/CustomerLogin";
import CustomerProfile
    from "./pages/customer/CustomerProfile";

import CustomerProfileCheck
    from "./pages/customer/CustomerProfileCheck";
import CustomerProtectedRoute
    from "./components/CustomerProtectedRoute";
import CustomerProfileView
    from "./pages/customer/CustomerProfileView";

import CustomerProfileEdit
    from "./pages/customer/CustomerProfileEdit";
import { AnimatePresence }
    from "framer-motion";

import {
    useLocation
} from "react-router-dom";
import ServiceFieldManager
    from "./pages/owner/ServiceFieldManager";
import RequestDetails
    from "./pages/common/RequestDetails";
function AnimatedRoutes() {

    const location =
        useLocation();

    return (

        <AnimatePresence mode="wait">

            <Routes
                location={location}
                key={location.pathname}
            >


                    <Route
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/customer-login"
                        element={<CustomerLogin />}
                    />


                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/services"
                        element={
                            <ProtectedRoute>
                                <Services />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/services/create"
                        element={
                            <ProtectedRoute>
                                <CreateService />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/services/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditService />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/requests/create"
                        element={
                            <ProtectedRoute>
                                <CreateRequest />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/requests"
                        element={
                            <ProtectedRoute>
                                <Requests />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employee-dashboard"
                        element={
                            <ProtectedRoute>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-requests"
                        element={
                            <CustomerProtectedRoute>
                                <MyRequests />
                            </CustomerProtectedRoute>
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute>
                                <Employees />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<Login />}
                    />

                    <Route
                        path="/service-documents/:id"
                        element={
                            <CustomerProtectedRoute>
                                <ServiceDocuments />
                            </CustomerProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer-services"
                        element={
                            <CustomerProtectedRoute>
                                <CustomerServices />
                            </CustomerProtectedRoute>
                        }
                    />
                    <Route
                        path="/customer-profile"
                        element={
                            <CustomerProtectedRoute>
                                <CustomerProfile />
                            </CustomerProtectedRoute>
                        }
                    />
                    <Route
                        path="/customer-profile-check"
                        element={
                            <CustomerProtectedRoute>
                                <CustomerProfileCheck />
                            </CustomerProtectedRoute>
                        }
                    />
                    <Route
                        path="/customer-profile-view"
                        element={
                            <CustomerProtectedRoute>
                                <CustomerProfileView />
                            </CustomerProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer-profile-edit"
                        element={
                            <CustomerProtectedRoute>
                                <CustomerProfileEdit />
                            </CustomerProtectedRoute>
                        }
                    />
                <Route
                    path="/service-fields/:serviceId"
                    element={<ServiceFieldManager />}
                />
                <Route
                    path="/request-details/:id"
                    element={<RequestDetails />}
                />
            </Routes>

        </AnimatePresence>
    );
}
function App() {

    return (
        <BrowserRouter>

            <AnimatedRoutes />

        </BrowserRouter>
    );
}

export default App;