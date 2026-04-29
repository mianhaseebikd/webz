import React, { useEffect, useRef, useState } from "react";
import TimelineHeading from "./heading.jsx";
import { Clients } from "../content/clients.js";

const Testimonial = () => {
  return (
    <div className="review-wrapper" id="review">
      <TimelineHeading
        title="Services"
        subtitle="What I Do for Clients"
        description=" Most common methods for designing websites that work well on desktop
            is responsive and adaptive design"
      />
      <div className="row80 services-row">
        <div className="review-slider-wraper">
          {Clients.map((client) => (
            <div className="sldie-item" key={client.id}>
              <div className="review-icon">
                <img src="/public/images/testimonials.svg" alt="testimonial" />
              </div>
              <div className="text-holder">{client.review}</div>
              <div className="client-detail">
                <div className="clint-image">
                  <img src={client.imageUrl} alt={client.clientName} />
                </div>
                <h4>{client.clientName}</h4>
                <span>{client.whichServices}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
