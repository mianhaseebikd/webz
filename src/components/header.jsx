import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const navRef = useRef(null);

  // Animate on load
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Close menu when clicking outside nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.classList.contains("menu-btn") &&
        !event.target.closest(".menu-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="first-container" ref={sectionRef}>
      <div
        className={`header-container ${isSticky ? "sticky" : ""} ${isVisible ? "show" : ""
          } ${isMenuOpen ? "menu-open" : ""}`}
      >
        <div className="navigation-bar">
          <div className="site-logo">
            <a href="#">
              <img src="/images/ha-webz.png" alt="ha-webz logo" />
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`menu-btn ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav
            ref={navRef}
            className={`${isMenuOpen ? "menu-active" : ""}`}
          >
            <a href="index.html" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#resume" onClick={() => setIsMenuOpen(false)}>Resume</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#service" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <a href="/images/my-resume.png" download>
              <button className="button">Download CV</button>
            </a>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="menu-overlay active" onClick={() => setIsMenuOpen(false)}></div>}

      {/* Hero Section */}
      <div className="row80 hero-row">
        <div className={`col-2 hero-left ${isVisible ? "show" : ""}`}>
          <div className="inner-box">
            <h3 className="orange-text">Hello, I'm</h3>
          </div>
          <div className="inner-box">
            <h2 className="name">Haseeb Ahmad</h2>
          </div>
          <div className="inner-box">
            <p className="short-para">
              A <span className="green-text"> Creative Web Designer</span> From{" "}
              <span className="blue-text">Pakistan</span>
            </p>
          </div>
          <div className="inner-box">
            <p className="intro-para">
              I'm a creative WordPress & Web Designer from Pakistan, turning ideas
              into visually stunning and fully functional websites with passion and precision.
            </p>
          </div>
          <div className="inner-box scial-icon-btn">
            <a href="#about">
              <button className="button">About Me</button>
            </a>
            <div className="social-icons">
              <a href="#"><FaFacebookF className="icon" /></a>
              <a href="#"><FaTwitter className="icon" /></a>
              <a href="#"><FaLinkedinIn className="icon" /></a>
              <a href="#"><FaInstagram className="icon" /></a>
            </div>
          </div>
        </div>

        <div className={`col-2 my-image hero-right ${isVisible ? "show" : ""}`}>
          <img src="/images/Haseeb-dsk.png" alt="Haseeb" />
        </div>
      </div>
      <div className="mouse-wheel"> <a className="anchor" href="#process"> <svg width="26px" height="100%" viewBox="0 0 247 390" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5, }} > <path id="wheel" d="M123.359,79.775l0,72.843" style={{ fill: "none", stroke: "#E74E2B", strokeWidth: "24px" }} /> <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style={{ fill: "none", stroke: "#000", strokeWidth: "20px" }} /> </svg> </a> </div>
    </div>
  );
}

export default Header;
