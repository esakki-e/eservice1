import "./ServiceMarquee.css";
import { motion } from "framer-motion";

function ServiceMarquee({ services = [] }) {

    const marqueeServices = [
        ...services,
        ...services,
        ...services
    ];

    return (

        <section className="service-marquee-section">

            <h2 className="marquee-title">
                Explore Our Services
            </h2>

            <div className="marquee-container">

                <motion.div

                    className="marquee-track"

                    animate={{
                        x: ["0%", "-33.333%"]
                    }}

                    transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity
                    }}

                >

                    {

                        marqueeServices.map((service, index) => (

                            <div
                                key={index}
                                className="marquee-item"
                            >
                                {service.serviceName}
                            </div>

                        ))

                    }

                </motion.div>

            </div>

        </section>

    );

}

export default ServiceMarquee;