import { useEffect, useRef, useState } from "react";
import AnimatedNumber from "./animatedNumber";

function Skill() {
    const [visible, setVisible] = useState(false);
    const skillRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (skillRef.current) observer.observe(skillRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="skill-wrapper" ref={skillRef}>
            <div className="row80 skill-row">
                <div className={`col-2 skill-content ${visible ? "show" : ""}`}>
                    <h3 className="orange-text">Design is Life</h3>
                    <h2 className="headind-2">
                        I Develop Skills Regularly to Keep Me Update
                    </h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
                        nulla recusandae animi exercitationem natus quidem.
                    </p>
                    <div className="skill-bars">
                        <div className={`progress-box ${visible ? "fill-html" : ""}`}>
                            <div className="progress-lable progress-html">
                                <span className="progress-title">HTML, CSS & JavaScript</span>
                                <AnimatedNumber value={90} visible={visible} />
                            </div>
                            <div className="progress-bars css-bar"></div>
                        </div>

                        <div className={`progress-box ${visible ? "fill-js" : ""}`}>
                            <div className="progress-lable progress-js">
                                <span className="progress-title">React JS</span>
                                <AnimatedNumber value={60} visible={visible} />
                            </div>
                            <div className="progress-bars js-bar"></div>
                        </div>

                        <div className={`progress-box ${visible ? "fill-wp" : ""}`}>
                            <div className="progress-lable progress-wp">
                                <span className="progress-title">WordPress</span>
                                <AnimatedNumber value={85} visible={visible} />
                            </div>
                            <div className="progress-bars wp-bar"></div>
                        </div>
                        <div className={`progress-box ${visible ? "fill-html" : ""}`}>
                            <div className="progress-lable progress-html">
                                <span className="progress-title">Tailwind CSS</span>
                                <AnimatedNumber value={80} visible={visible} />
                            </div>
                            <div className="progress-bars css-bar"></div>
                        </div>

                    </div>
                </div>

                <div className={`col-2 skill-image ${visible ? "show" : ""}`}>
                    <img src="/images/skills.webp" alt="Skill" />
                </div>
            </div>
        </div>
    );
}

export default Skill;
