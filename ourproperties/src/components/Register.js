import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faLock, faHome, faStore } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [userType, setUser ] = useState('buyer');
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    mobile: '', // Add mobile field
    subscribe: false,
  });

  // Form errors
  const [errors, setErrors] = useState({});
  // Status message: success or error
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Simple frontend validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.repeatPassword) newErrors.repeatPassword = 'Please repeat your password';
    else if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phoneNumber: formData.mobile, // Include mobile in the request
          role: userType,
          subscribeNewsletter: formData.subscribe,
        }),
      });

      if (res.ok) {
        setStatusMessage('Registration successful! You can now log in.');
        setFormData({
          name: '',
          email: '',
          password: '',
          repeatPassword: '',
          mobile: '', // Reset mobile field
          subscribe: false,
        });
        setErrors({});
      } else {
        const data = await res.text();
        setStatusMessage(data || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Server error. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <MDBCard className="text-black m-4 p-1" style={{ borderRadius: '0.75rem', maxWidth: '900px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <MDBCardBody>
          <MDBRow className="g-0 align-items-center">
            <MDBCol md="6" className="d-none d-md-flex justify-content-center">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="Registration Illustration"
                fluid
                style={{ borderRadius: '0.75rem' }}
              />
            </MDBCol>

            <MDBCol md="6">
              <h1 className="fw-bold mb-4" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827' }}>Create an account</h1>
              <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' }}>
                Join PropertyPro to find your perfect home and connect with the best listings.
              </p>

              <form onSubmit={handleSubmit} noValidate aria-label="Registration form">
                <MDBInput
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'is-invalid' : ''}
                  required
                  autoComplete="name"
                />
                {errors.name && <div className="invalid-feedback" style={{ display: 'block', marginBottom: '1rem' }}>{errors.name}</div>}
                <br></br>
                <div className="user-type-toggle mb-3">
                  <button
                    className={`toggle-btn ${userType === 'buyer' ? 'active' : ''}`}
                    onClick={() => setUser ('buyer')}
                    aria-label="Login as buyer"
                  >
                    <FontAwesomeIcon icon={faHome} />
                    <span>Buyer</span>
                  </button>
                  <button
                    className={`toggle-btn ${userType === 'seller' ? 'active' : ''}`}
                    onClick={() => setUser ('seller')}
                    aria-label="Login as seller"
                  >
                    <FontAwesomeIcon icon={faStore} />
                    <span>Seller</span>
                  </button>
                </div>

                <MDBInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'is-invalid' : ''}
                  required
                  autoComplete="email"
                />
                {errors.email && <div className="invalid-feedback" style={{ display: 'block', marginBottom: '1rem' }}>{errors.email}</div>}
                <br></br>
                
                <MDBInput
                  label="Mobile No."
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? 'is-invalid' : ''}
                  required
                  autoComplete="tel"
                />
                {errors.mobile && <div className="invalid-feedback" style={{ display: 'block', marginBottom: '1rem' }}>{errors.mobile}</div>}
                <br></br>

                <MDBInput
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'is-invalid' : ''}
                  required
                  autoComplete="new-password"
                />
                {errors.password && <div className="invalid-feedback" style={{ display: 'block', marginBottom: '1rem' }}>{errors.password}</div>}
                <br></br>
                
                <MDBInput
                  label="Repeat Password"
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className={errors.repeatPassword ? 'is-invalid' : ''}
                  required
                  autoComplete="new-password"
                />
                {errors.repeatPassword && <div className="invalid-feedback" style={{ display: 'block', marginBottom: '1rem' }}>{errors.repeatPassword}</div>}
                <br></br>
                
                <div className="mb-4 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                  />
                  <label htmlFor="subscribe" className="form-check-label" style={{ color: '#6b7280' }}>
                    Subscribe to our newsletter
                  </label>
                </div>

                <MDBBtn
                  type="submit"
                  color="dark"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                  style={{ fontWeight: '600', borderRadius: '0.5rem', transition: 'background-color 0.3s ease' }}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </MDBBtn>
              </form>

              {statusMessage && (
                <div
                  role="alert"
                  style={{
                    marginTop: '1rem',
                    color: statusMessage.toLowerCase().includes('success') ? '#16a34a' : '#dc2626',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {statusMessage}
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
