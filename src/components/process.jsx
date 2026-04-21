import { useRef, useEffect, useState } from "react";

function TiltCard({ children, index, visible, forwardRef }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "transform 0s";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = "transform 0.3s ease";
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (forwardRef) forwardRef(el);
      }}
      data-id={index}
      className={`col-3 card process-card ${visible ? "show" : ""}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

function Process() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute("data-id"), 10); // 👉 number
            setVisibleCards((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const cardData = [
    {
      title: "WordPress HA-Developers",
      text: "Most common methods for designing websites that work well on desktop is responsive and adaptive design.",
    },
    {
      title: "Frontend Development",
      text: "Crafting interactive, user-friendly designs that adapt seamlessly to any screen size.",
    },
    {
      title: "Ecommerce Solutions",
      text: "Building scalable, secure, and fast online stores to grow your business.",
    },
  ];

  return (
    <div className="second-container" id="process">
      <div className="row-3">
        {cardData.map((card, index) => (
          <TiltCard
            key={index}
            index={index}
            visible={visibleCards.includes(index)} // 👉 ab number compare hoga
            forwardRef={(el) => (cardsRef.current[index] = el)}
          >
            <div className="inner-box-process process-circle">
              <span className="pcircle-bg">
                <img src="/images/process-bg-1.png" alt={card.title} />
                <img src="/images/process-icon-1.svg" alt={card.title} />
              </span>
            </div>
            <div className="inner-box-process process-heading">
              <h3>{card.title}</h3>
            </div>
            <div className="inner-box-process process-text">
              <p>{card.text}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

export default Process;
