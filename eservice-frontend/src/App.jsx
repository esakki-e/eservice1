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
function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
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
                    <ProtectedRoute>
                        <MyRequests />
                    </ProtectedRoute>
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
                        <ProtectedRoute>
                            <ServiceDocuments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer-services"
                    element={
                        <ProtectedRoute>
                            <CustomerServices />
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;