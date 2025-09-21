import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "./Landing.css";
import logo from "../../assets/The Logo.png";
import leftDecor from "../../assets/left.png";
import rightDecor from "../../assets/right.png";
import { Link } from "react-router-dom";

const NUM_PARTICLES = 20;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Landing = () => {
  const particlesRef = useRef();

  useEffect(() => {
    const container = particlesRef.current;
    container.innerHTML = ""; // Clear any existing circles

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const circle = document.createElement("div");
      circle.className = "particle";
      // Random position & delay
      circle.style.top = `${getRandomInt(3, 93)}%`;
      circle.style.left = `${getRandomInt(3, 97)}%`;
      circle.style.width = `${getRandomInt(16, 32)}px`;
      circle.style.height = circle.style.width;
      // Random animation delay so circles pulse differently
      circle.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(circle);
    }
  }, []);

  return (
    <div className="landing-bg d-flex align-items-center justify-content-center">
      {/* Animated particle circles */}
      <div className="particles-bg" ref={particlesRef} />

      {/* Decorative images left/right bottom */}
      <img src={leftDecor} alt="left decoration" className="decor-left" />
      <img src={rightDecor} alt="right decoration" className="decor-right" />

      <Container className="text-center landing-content">
        <img src={logo} alt="Annotate Me Logo" className="logo animated-bounceIn" />
        <h1 className="landing-title fade-in-text">ANNOTATE ME</h1>
        <p className="landing-subtitle fade-in-text" style={{animationDelay: "0.4s"}}>
          Simple data annotation management and progress tracking — all in one place.
        </p>
        <div className="landing-login fade-in-text" style={{animationDelay: "0.8s"}}>
          <span>Do you already have an account?</span>
          <Link to="/login" className="landing-link login-btn">Log in</Link>
        </div>

      </Container>
    </div>
  );
};

export default Landing;