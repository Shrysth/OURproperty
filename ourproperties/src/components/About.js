import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUsers, 
  faSearch, 
  faShieldAlt,
  faMobile,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

export default function About() {
  // Structured data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PropertyPro",
    "url": "https://propertypro.com",
    "logo": "https://propertypro.com/logo.png",
    "foundingDate": "2024",
    "description": "India's fastest growing property discovery platform connecting renters with verified properties since 2024."
  };

  return (
    <>
      <Helmet>
        <title>About PropertyPro - India's Trusted Property Discovery Platform</title>
        <meta name="description" content="PropertyPro is India's fastest growing property rental platform founded in 2024. Discover how we're revolutionizing property search with verified listings and AI matching." />
        <meta name="keywords" content="property rental, flatmate finder, house for rent, pg accommodation, propertypro india, verified listings" />
        <meta property="og:title" content="About PropertyPro - India's Trusted Property Discovery Platform" />
        <meta property="og:description" content="Discover how PropertyPro is changing the way people find rental properties in India since 2024." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://propertypro.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section with H1 */}
        <section className="about-hero" aria-labelledby="about-heading">
          <div className="container">
            <h1 id="about-heading">About PropertyPro - India's Most Trusted Property Platform</h1>
            <p className="lead-text">Founded in 2024, we've helped over 50,000+ users find their perfect homes across 25+ Indian cities</p>
          </div>
        </section>

        {/* Our Story with semantic HTML */}
        <article className="our-story" aria-labelledby="story-heading">
          <div className="container">
            
              <h2 id="story-heading">Our Story: Revolutionizing Property Search in India</h2>
              <p className="subheading">From startup to market leader in rental solutions</p>
            
            
            <div className="story-content">
              <div className="story-text">
                <p>PropertyPro was founded in <strong>2024</strong> by a team of IIT alumni and real estate experts who saw the challenges renters face in Indian cities. What began as a simple platform to <strong>connect flatmates in Bangalore</strong> has grown into India's most comprehensive property discovery service.</p>
                
                <p>Today, we serve major metropolitan areas including:</p>
                <ul>
                  <li>Mumbai</li>
                  <li>Delhi NCR</li>
                  <li>Bangalore</li>
                  <li>Hyderabad</li>
                  <li>Pune</li>
                  <li>Chennai</li>
                </ul>
              </div>
              
              <figure className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="PropertyPro team working in our Bangalore office" 
                  loading="lazy"
                />
                <figcaption>Our team in Bangalore helping users find perfect homes</figcaption>
              </figure>
            </div>
          </div>
        </article>

        {/* Value Proposition */}
        <section className="value-props" aria-labelledby="value-heading">
          <div className="container">
            <h2 id="value-heading">Why 50,000+ Users Trust PropertyPro</h2>
            
            <div className="props-grid">
              <div className="prop-card">
                <FontAwesomeIcon icon={faShieldAlt} aria-hidden="true" />
                <h3>Verified Listings Only</h3>
                <p>Every property undergoes our 7-step verification process to ensure authenticity and accurate details.</p>
              </div>
              
              <div className="prop-card">
                <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
                <h3>AI-Powered Search</h3>
                <p>Our matching algorithm learns your preferences to show the most relevant properties first.</p>
              </div>
              
              <div className="prop-card">
                <FontAwesomeIcon icon={faUsers} aria-hidden="true" />
                <h3>Flatmate Matching</h3>
                <p>Find compatible flatmates based on lifestyle, habits, and preferences - just like flatmate.in.</p>
              </div>
              
              <div className="prop-card">
                <FontAwesomeIcon icon={faMobile} aria-hidden="true" />
                <h3>Mobile-First Platform</h3>
                <p>Book viewings, chat with owners, and complete paperwork - all from our app.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section with microdata */}
        <section className="our-team" itemScope itemType="https://schema.org/Organization">
          <div className="container">
            <h2>Meet Our Leadership Team</h2>
            
            <div className="team-grid">
              <div className="team-member" itemProp="founder" itemScope itemType="https://schema.org/Person">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Priya Sharma, Co-Founder & CEO" 
                  loading="lazy"
                  itemProp="image"
                />
                <h3 itemProp="name">Priya Sharma</h3>
                <p itemProp="jobTitle">Co-Founder & CEO</p>
                <p className="bio" itemProp="description">Former Head of Product at Housing.com, with 10+ years in proptech innovation.</p>
              </div>
              
              <div className="team-member" itemProp="founder" itemScope itemType="https://schema.org/Person">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Rahul Patel, Co-Founder & CTO" 
                  loading="lazy"
                  itemProp="image"
                />
                <h3 itemProp="name">Rahul Patel</h3>
                <p itemProp="jobTitle">Co-Founder & CTO</p>
                <p className="bio" itemProp="description">Machine learning expert who built recommendation systems for MakeMyTrip.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA with semantic button */}
        <section className="about-cta" aria-labelledby="cta-heading">
          <div className="container">
            <h2 id="cta-heading">Ready to Find Your Perfect Home?</h2>
            <p>Join thousands of happy renters who found their ideal property through PropertyPro</p>
            <div className="cta-buttons">
              <a href="/listings" className="cta-button" role="button" aria-label="Browse available properties">
                Browse Properties
              </a>
              <a href="/add-listing" className="cta-button secondary" role="button" aria-label="List your property">
                List Your Property
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}