import { useEffect, useRef, useState } from "react";
import { Projects } from "../Content/projects.js";
import ProjectModal from "./ProjectModal.jsx";

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(Projects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const refs = useRef([]);
  const buttonsRef = useRef([]);

  const categories = ["All", ...new Set(Projects.map((p) => p.category))];

  // Intersection Observer for buttons
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setButtonsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    buttonsRef.current.forEach((btn) => {
      if (btn) observer.observe(btn);
    });

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for gallery items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setVisibleItems((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  const handleFilter = (category) => {
    setActiveFilter(category);

    const newProjects =
      category === "All"
        ? Projects
        : Projects.filter((p) => p.category === category);

    setFilteredProjects(newProjects);
    setVisibleItems([]);
    refs.current = [];
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((cat, index) => (
          <button
            key={cat}
            ref={(el) => (buttonsRef.current[index] = el)}
            className={`${activeFilter === cat ? "active" : ""} ${
              buttonsVisible ? "animate" : ""
            }`}
            style={{ transitionDelay: `${index * 0.2}s` }} // staggered delay
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="gallery">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id + activeFilter}
            ref={(el) => (refs.current[index] = el)}
            data-id={project.id}
            className={`gallery-item ${
              visibleItems.includes(project.id.toString()) ? "animate" : ""
            }`}
            style={{ transitionDelay: `${index * 0.2}s` }} // staggered cards
            onClick={() => setSelectedProject(project)}
          >
            <img src={project.image} alt={project.title} />
            <div className="content-holder">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Gallery;
