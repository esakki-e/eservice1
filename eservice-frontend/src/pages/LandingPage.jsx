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
            <div className="page-bg">

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

                        <div className="stat-card">



                            <div>

                                <h3>25+</h3>

                                <p>Services</p>

                            </div>

                        </div>

                        <div className="stat-card">


                            <div>

                                <h3>24/7</h3>

                                <p>Availability</p>

                            </div>

                        </div>

                        <div className="stat-card">


                            <div>

                                <h3>100%</h3>

                                <p>Digital</p>

                            </div>

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

                        <div className="trust-item">

                            🔒

                            <span>Secure</span>

                        </div>

                        <div className="trust-item">

                            📱

                            <span>Mobile Friendly</span>

                        </div>

                        <div className="trust-item">

                            ✈️

                            <span>Instant Tracking</span>

                        </div>

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

        <span>
            Available Services
        </span>

                            <span className="service-count">
            25+
        </span>

                        </div>

                        <div className="preview-item">

                            <div className="preview-icon">
                                📜
                            </div>

                            <span>
            Community Certificate
        </span>

                        </div>

                        <div className="preview-item">

                            <div className="preview-icon">
                                🪙
                            </div>

                            <span>
            Income Certificate
        </span>

                        </div>

                        <div className="preview-item">

                            <div className="preview-icon">
                                🏠
                            </div>

                            <span>
            Nativity Certificate
        </span>

                        </div>

                        <div className="preview-item">

                            <div className="preview-icon">
                                👶
                            </div>

                            <span>
            Birth Certificate
        </span>

                        </div>

                    </div>

                </motion.div>
        </div>

        </div>
            </div>
            </PageTransition>);
}

export default LandingPage;