import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faHome, faStore } from '@fortawesome/free-solid-svg-icons';
import { getDashboardKey } from '../services/getDashboardKey';
import { loginUser, validateLoginForm } from '../services/getLoggedIn';

export default function Login() {
  const [userType, setUser] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const dashboardKey = getDashboardKey();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    const { isValid, errors: validationErrors } = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (isValid) {
      setIsSubmitting(true);
      const { success, token, error } = await loginUser(email, password);
      
      if (success) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setLoginError(error || 'Login failed. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Login illustration"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="login-card property-card">
              <h2>Welcome to PropertyPro</h2>
              <p className="subtitle">Login to continue</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className={`form-outline mb-4 ${errors.email ? 'error' : ''}`}>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <label className="form-label">Email address</label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className={`form-outline mb-4 ${errors.password ? 'error' : ''}`}>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <label className="form-label">Password</label>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                  <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                </div>

                {loginError && <div className="alert alert-danger">{loginError}</div>}

                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <div className="signup-link mt-3">
                  Don't have an account? <a href="/Register">Sign up</a> as {userType}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}