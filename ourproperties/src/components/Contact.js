import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus('');

    // Simulate form submission
    setTimeout(() => {
      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="mb-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <MDBContainer className="py-4">
        <h2 className="h1-responsive font-weight-bold text-center mb-4" style={{ color: '#3b71ca' }}>
          Contact Us
        </h2>
        <p className="text-center w-responsive mx-auto mb-5 lead">
          Have questions or feedback? We're here to help. Our team typically responds within a few hours.
        </p>

        <MDBRow className="justify-content-center">
          <MDBCol lg="9" xl="7">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol md="6" className="mb-3">
                      <MDBInput
                        label="Your Name"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                      <MDBInput
                        label="Your Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12" className="mb-3">
                      <MDBInput
                        label="Subject"
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12" className="mb-3">
                      <MDBInput
                        type="textarea"
                        id="message"
                        name="message"
                        rows="4"
                        label="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </MDBCol>
                  </MDBRow>

                  <div className="text-center">
                    <MDBBtn 
                      color="primary" 
                      type="submit" 
                      disabled={isSubmitting}
                      className="rounded-pill px-4 py-2"
                      style={{ minWidth: '150px' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <MDBIcon far icon="paper-plane" className="me-2" />
                          Send Message
                        </>
                      )}
                    </MDBBtn>
                  </div>
                  
                  {status && (
                    <div className={`alert mt-4 text-center ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                      {status}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-5 justify-content-center">
          <MDBCol md="10" lg="8" xl="7">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <MDBRow>
                  <MDBCol md="4" className="text-center mb-4 mb-md-0">
                    <div className="p-3">
                      <MDBIcon icon="map-marker-alt" size="2x" className="mb-3" style={{ color: '#3b71ca' }} />
                      <h5 className="font-weight-bold mb-3">Our Location</h5>
                      <p className="mb-0">San Francisco, CA 94126</p>
                      <p>United States</p>
                    </div>
                  </MDBCol>
                  <MDBCol md="4" className="text-center mb-4 mb-md-0">
                    <div className="p-3">
                      <MDBIcon icon="phone-alt" size="2x" className="mb-3" style={{ color: '#3b71ca' }} />
                      <h5 className="font-weight-bold mb-3">Call Us</h5>
                      <p className="mb-0">+1 234 567 890</p>
                      <p>Mon-Fri, 9am-6pm</p>
                    </div>
                  </MDBCol>
                  <MDBCol md="4" className="text-center">
                    <div className="p-3">
                      <MDBIcon icon="envelope" size="2x" className="mb-3" style={{ color: '#3b71ca' }} />
                      <h5 className="font-weight-bold mb-3">Email Us</h5>
                      <p className="mb-0">contact@example.com</p>
                      <p>support@example.com</p>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Contact;