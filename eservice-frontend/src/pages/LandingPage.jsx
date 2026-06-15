// LandingPage.jsx

import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <div className="hero-container">

                <div className="hero-content">

            <span className="hero-badge">
                Tamil Nadu E-Service Portal
            </span>

                    <h1 className="hero-title">
                        Government Services,
                        <br />
                        Simplified.
                    </h1>

                    <p className="hero-subtitle">

                        Apply for certificates,
                        track requests,
                        upload documents and receive approvals
                        from anywhere.

                    </p>
                    <div className="hero-stats">

                        <div>
                            <h3>25+</h3>
                            <p>Services</p>
                        </div>

                        <div>
                            <h3>24/7</h3>
                            <p>Availability</p>
                        </div>

                        <div>
                            <h3>100%</h3>
                            <p>Digital</p>
                        </div>

                    </div>

                    <div className="hero-buttons">

                        <button
                            className="customer-btn"
                            onClick={() =>
                                navigate("/customer-login")
                            }
                        >
                            Citizen Login
                        </button>

                        <button
                            className="staff-btn"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Staff Login
                        </button>

                    </div>

                </div>

                <div className="hero-card">

                    <div className="service-preview">

                        <div className="preview-header">
                            Available Services
                        </div>

                        <div className="preview-item">
                            📜 Community Certificate
                        </div>

                        <div className="preview-item">
                            💰 Income Certificate
                        </div>

                        <div className="preview-item">
                            🏠 Nativity Certificate
                        </div>

                        <div className="preview-item">
                            👶 Birth Certificate
                        </div>

                    </div>

                </div>
            </div>

        </div>);
}

export default LandingPage;