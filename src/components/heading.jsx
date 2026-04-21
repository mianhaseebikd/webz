import { useEffect, useRef } from "react";

function TimelineHeading({ title, subtitle, description }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
  }, []);

  return (
    <div className="containers-heading" ref={headingRef}>
      <h3>{title}</h3>
      <h2>{subtitle}</h2>
      <p>{description}</p>
    </div>
  );
}

export default TimelineHeading;
