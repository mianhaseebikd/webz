import { useState } from "react";
import { TiltWrapper } from "./tlintWrapper.jsx";
import Services from "../Content/services.js";
import ServiceModal from "./ServiceModal.jsx";

export default function ServicesCards() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {Services.map((service) => (
        <TiltWrapper
          className="service-card"
          key={service.id}
          onClick={() => setSelected(service)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="service-icon"
            style={{
              background: `url(${service.iconBg}) center center / cover no-repeat`,
            }}
          >
            <img src={service.icon} alt={service.title} width={40} />
          </div>
          <div className="services-content">
            <h3>{service.title}</h3>
            <div className="price-text">
              Starts from <span>$99</span>
            </div>
            <p>{service.shortDescription}</p>
          </div>
        </TiltWrapper>
      ))}

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}
