const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
                <img src={project.image} alt={project.title} />
                <div className="project-links-box">
                    <a href={project.liveDemo} className="underLine" target="_blank">Live Demo</a>
                    <a href={project.sourceCode} className="underLine" target="_blank">Source Code</a>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {/* Agar aur details ho to yahan add karo */}
            </div>
        </div>
    );
};

export default ProjectModal;
