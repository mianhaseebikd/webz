import { TiltWrapper } from "./tlintWrapper.jsx";
import Services from "../Content/services.js";

export default function ServicesCards() {
    return (
        <>
            {Services.map((service) => (
                <TiltWrapper className="service-card" key ={service.id}>
                    <div className="service-icon" style={{ background: `url(${service.iconBg}) center center / cover no-repeat` }}>
                        {service.icon}
                    </div>
                    <div className="services-content">
                        <h3>{service.title}</h3>
                        <p>
                            {service.shortDescription}
                        </p>
                    </div>
                </TiltWrapper>
            ))}
        </>
    )
}
