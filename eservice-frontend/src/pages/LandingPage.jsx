// LandingPage.jsx

import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
//import PageTransition from "../../components/PageTransition";
import PageTransition from "../components/PageTransition";

import { motion } from "framer-motion";
function LandingPage() {

    const navigate = useNavigate();

    return (
        <PageTransition>
        <div className="landing-page">

            <div className="hero-container">

                <div className="hero-content">

            <span className="hero-badge">
                Vinayaga E-Service Portal
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
                        <motion.button
                            whileHover={{
                                scale: 1.04
                            }}
                            whileTap={{
                                scale: 0.96
                            }}
                            className="customer-btn"

                            onClick={() =>
                                navigate("/customer-login")
                            }
                        >
                            Citizen Login
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.04
                            }}
                            whileTap={{
                                scale: 0.96
                            }}
                            className="staff-btn"

                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Staff Login
                        </motion.button>

                    </div>
                    <div className="trust-row">

                        🔒 Secure

                        <span>•</span>

                        📱 Mobile Friendly

                        <span>•</span>

                        ⚡ Instant Tracking

                    </div>
                </div>

                <motion.div
                    className="hero-card"
                    whileHover={{
                        rotateY: 5,
                        rotateX: 5,
                        scale: 1.02
                    }}
                >
                   {/* <div className="hero-visual">

                        <div className="floating-icon icon1">
                            📜
                        </div>

                        <div className="floating-icon icon2">
                            🏛️
                        </div>

                        <div className="floating-icon icon3">
                            🪪
                        </div>

                        <div className="floating-icon icon4">
                            📄
                        </div>

                    </div>*/}
                    <div className="service-preview">

                        <div className="preview-header">
                            Available Services

                            <span className="service-count">
                25+
            </span>
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

                </motion.div>
        </div>

        </div>

            </PageTransition>);
}

export default LandingPage;