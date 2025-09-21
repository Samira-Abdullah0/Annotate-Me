import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/The Logo.png";
import loginImg from "../../assets/Login.png";
import "../Login/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username) => {
    // Username: no spaces, only alphanumeric, hyphens, and underscores
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    return usernameRegex.test(username) && !username.includes(' ');
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    
    // Check minimum length
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    
    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    
    // Check for number
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    
    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character";
    }
    
    return "";
  };

  const validateEmailOrUsername = (value) => {
    if (!value.trim()) {
      return "Email or Username is required";
    }
    
    // Check if it looks like an email (contains @)
    if (value.includes('@')) {
      if (!isValidEmail(value)) {
        return "Please enter a valid email address";
      }
    } else {
      // It's a username
      if (!isValidUsername(value)) {
        return "Username can only contain letters, numbers, hyphens (-), and underscores (_). No spaces allowed.";
      }
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email/username
    const emailUsernameError = validateEmailOrUsername(formData.emailOrUsername);
    
    // Validate password
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      emailOrUsername: emailUsernameError,
      password: passwordError
    };

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!emailUsernameError && !passwordError) {
      console.log('Login successful:', formData);
      // Add your login logic here
    }
  };
  return (
    <div className="login-root">
      <Container fluid className="login-container">
        <Row className="login-row">
          {/* LEFT SIDE */}
          <Col
            xs={12}
            md={6}
            className="login-left d-flex flex-column align-items-center justify-content-between"
          >
            {/* Logo and Title */}
            <div className="login-logo-title w-100 d-flex align-items-center justify-content-center mt-4 mb-2">
              <img src={logo} className="login-logo" alt="Logo" />
              <span className="login-title ms-2">ANNOTATE ME</span>
            </div>
            {/* Main Illustration */}
            <div className="login-img-wrapper w-100 d-flex justify-content-center align-items-center mb-3">
              <img src={loginImg} alt="Login Illustration" className="login-img" />
            </div>
            {/* Tagline and Paragraph */}
            <div className="login-text-section text-center w-100 mb-4">
              <div className="login-tagline mb-3">
                DATA ANNOTATION MANAGEMENT<br />& TRACKING PLATFORM
              </div>
              <div className="login-description">
                Collaborate, assign, and monitor annotation tasks. Track progress, manage projects, and unlock the full potential of your data team — all in one place.
              </div>
            </div>
          </Col>
          {/* RIGHT SIDE */}
          <Col
            xs={12}
            md={6}
            className="login-right d-flex flex-column justify-content-center align-items-center"
          >
            <div className="login-form-wrapper w-100 px-4 px-md-5">
              <h5 className="login-welcome mb-1 text-center">Welcome back to</h5>
              <h3 className="login-annotate-title mb-4 text-center">Annotate me</h3>
              <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Email or Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="johndadev or john@example.com"
                    name="emailOrUsername"
                    value={formData.emailOrUsername}
                    onChange={handleInputChange}
                    isInvalid={!!errors.emailOrUsername}
                  />
                  {errors.emailOrUsername && (
                    <div className="error-message text-danger mt-1" style={{fontSize: '0.85rem'}}>
                      {errors.emailOrUsername}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="login-password-row d-flex align-items-center">
                    <Form.Control 
                      type={showPassword ? "text" : "password"}
                      placeholder="***************"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      isInvalid={!!errors.password}
                    />
                    <span 
                      className="login-eye ms-2" 
                      onClick={togglePasswordVisibility}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="error-message text-danger mt-1" style={{fontSize: '0.85rem'}}>
                      {errors.password}
                    </div>
                  )}
                  <div className="login-forgot">
                    <Link to="/forget-password" className="login-forgot-link">Forget password?</Link>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check type="checkbox" label="Remember me" className="login-remember" />
                </Form.Group>
                <button type="submit" className="login-bttn w-100">LOG IN</button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;