import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faShareAlt,
  faArrowLeft,
  faBed,
  faBath,
  faRulerCombined,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faSearch,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import PropertyService from '../services/PropertyService';
import { isAuthenticated } from '../services/isAuthenticated';
import { getUser } from '../services/getUser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    city: '',
    state: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFootage: 0,
    description: '',
    amenities: [],
    likes: 0,
    shares: 0,
    image: '',
    agent: null,
    isNew: false,
    pricePerSqFt: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleContactAgent = async () => {
    try {
      const user = getUser();
      console.log("Authenticated user:", user);
      
      const contactData = {
        propertyId: id,
        propertyTitle: property.title,
        agentId: property.agent?.id,
        name: property.agent?.name || '',
        email: user,
        userPhone: user.phone || '',
        message: `I'm interested in the property at ${property.city}, ${property.state}`
      };

      const response = await PropertyService.contactAgent(contactData);
      console.log("Contact agent response:", contactData);
      alert('Your contact request has been sent successfully!');
    } catch (error) {
      console.error("Error contacting agent:", error);
      alert('Failed to send contact request. Please try again.');
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await PropertyService.getPropertyById(id);
        setProperty(prev => ({
          ...prev,
          ...data,
          title: data.title || 'Untitled Property',
          description: data.description || 'No description available',
          amenities: data.amenities || [],
          image: data.image
        }));
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleLike = async () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    setProperty(prev => ({
      ...prev,
      likes: newLikeStatus ? prev.likes + 1 : Math.max(0, prev.likes - 1)
    }));

    try {
      // await PropertyService.updateLike(id, newLikeStatus);
    } catch (error) {
      console.error("Error updating like:", error);
      setIsLiked(!newLikeStatus);
      setProperty(prev => ({
        ...prev,
        likes: newLikeStatus ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title || 'Property Listing',
        text: `Check out this property: ${property.title || 'Amazing property'}`,
        url: window.location.href,
      })
        .then(() => {
          setProperty(prev => ({
            ...prev,
            shares: (prev.shares || 0) + 1
          }));
        })
        .catch(console.error);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
          setProperty(prev => ({
            ...prev,
            shares: (prev.shares || 0) + 1
          }));
        })
        .catch(() => {
          alert('Failed to copy link. Please try again.');
        });
    } else {
      alert('Sharing not supported on this device.');
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '1280px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
        <div className="breadcrumb-container" style={{ maxWidth: '1280px', margin: '1.5rem auto 0', padding: '0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} style={{ color: '#3b82f6' }}>Back to search</a>
        </div>
        
        <div className="image-slider" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', aspectRatio: '16 / 7', marginBottom: '2rem' }}>
          <Skeleton height="100%" />
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <Skeleton height={32} width={300} />
          <Skeleton height={20} width={250} />
        </div>
        
        <div>
          <h2 className="section-title" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>About</h2>
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ maxWidth: '1280px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
        <div className="breadcrumb-container" style={{ maxWidth: '1280px', margin: '1.5rem auto 0', padding: '0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} style={{ color: '#3b82f6' }}>Back to search</a>
        </div>
        <div style={{ color: '#ef4444', padding: '1rem', background: '#fee2e2', borderRadius: '8px', margin: '1rem 0' }}>
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '12px', 
            fontWeight: '600', 
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isAuthenticated()) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", color: '#1f2937', backgroundColor: '#f9fafb', lineHeight: '1.5', fontSize: '16px' }}>

        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
          {/* Breadcrumb */}
          <div className="breadcrumb-container" style={{ maxWidth: '1280px', margin: '1.5rem auto 0', padding: '0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} style={{ color: '#3b82f6' }}>Back to search</a> 
            <span aria-hidden="true" style={{ margin: '0 0.25rem' }}>/</span> 
            <span style={{ fontWeight: '600', color: '#111827' }}>{property.title || 'Property'}</span>
          </div>

          {/* Property Image */}
          <div className="image-slider" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', aspectRatio: '16 / 7', marginBottom: '2rem' }}>
            {!imageLoaded && <Skeleton height="100%" />}
            <img
              src={`http://localhost:8080/api/properties/images/${property.image}`}
              alt={property.title || 'Property image'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = '/default-property.jpg';
                setImageLoaded(true);
              }}
            />
          </div>

          {/* Property Summary */}
          <section className="property-summary">
            <h1 className="address" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
              {property.title || 'Untitled Property'}
            </h1>
            <p className="summary" style={{ fontSize: '0.925rem', color: '#6b7280', marginBottom: '2rem', justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap' }}>
              <span>
                <FontAwesomeIcon icon={faBed} style={{ marginRight: '0.5rem' }} />
                {property.bedrooms || 'N/A'} beds
              </span>
              <span>
                <FontAwesomeIcon icon={faBath} style={{ marginRight: '0.5rem' }} />
                {property.bathrooms || 'N/A'} baths
              </span>
              <span>
                <FontAwesomeIcon icon={faRulerCombined} style={{ marginRight: '0.5rem' }} />
                {property.squareFootage ? property.squareFootage.toLocaleString() : 'N/A'} sqft
              </span>
            </p>
          </section>

          {/* Price */}
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6', marginBottom: '2rem' }}>
            {formatPrice(property.price)}
            {property.pricePerSqFt && (
              <span style={{ fontSize: '1rem', color: '#6b7280', marginLeft: '0.5rem' }}>
                (${property.pricePerSqFt}/sqft)
              </span>
            )}
          </div>

          {/* About Section */}
          <section className="about">
            <h2 className="section-title" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>About</h2>
            <p style={{ fontSize: '1rem', color: '#374151', maxWidth: '850px', lineHeight: '1.7' }}>
              {property.description || 'No description available for this property.'}
            </p>
          </section>

          {/* Key Features */}
          <section className="key-features" style={{ marginTop: '2rem', maxWidth: '100%', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            <h2 className="section-title" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>Key Features</h2>

            <div className="key-features-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <div className="feat-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Bedrooms</div>
              <div className="feat-value" style={{ fontSize: '0.9rem', color: '#374151', justifySelf: 'end' }}>{property.bedrooms || 'N/A'}</div>
            </div>
            <div className="key-features-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <div className="feat-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Bathrooms</div>
              <div className="feat-value" style={{ fontSize: '0.9rem', color: '#374151', justifySelf: 'end' }}>{property.bathrooms || 'N/A'}</div>
            </div>
            <div className="key-features-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <div className="feat-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Square Footage</div>
              <div className="feat-value" style={{ fontSize: '0.9rem', color: '#374151', justifySelf: 'end' }}>{property.squareFootage ? property.squareFootage.toLocaleString() : 'N/A'} sqft</div>
            </div>
            {property.amenities?.length > 0 && (
              <div className="key-features-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                <div className="feat-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Amenities</div>
                <div className="feat-value" style={{ fontSize: '0.9rem', color: '#374151', justifySelf: 'end' }}>
                  {property.amenities.join(', ')}
                </div>
              </div>
            )}
          </section>

          {/* Contact Section */}
          <section className="contact-section" style={{ maxWidth: '850px', marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className="section-title" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>Contact</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '9999px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {property.agent?.name?.charAt(0) || 'A'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="agent-name" style={{ fontWeight: '700', fontSize: '1.1rem', color: '#111827', marginBottom: '2px' }}>
                  {property.agent?.name || 'Property Agent'}
                </div>
                <div className="agent-title" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {property.agent?.company || 'Real Estate Agency'}
                </div>
              </div>
            </div>
            <button 
              onClick={handleContactAgent}
              style={{ 
                backgroundColor: '#f3f4f6', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '0.5rem 1.25rem', 
                fontWeight: '600', 
                color: '#374151', 
                cursor: 'pointer'
              }}
            >
              Contact Agent
            </button>
          </section>

          {/* Like and Share Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', maxWidth: '850px' }}>
            <button 
              onClick={handleLike}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.5rem 1rem', 
                borderRadius: '12px', 
                border: 'none', 
                backgroundColor: isLiked ? '#fee2e2' : '#f3f4f6', 
                color: isLiked ? '#dc2626' : '#374151', 
                cursor: 'pointer'
              }}
            >
              <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} />
              <span>{property.likes || 0}</span>
            </button>
            <button 
              onClick={handleShare}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.5rem 1rem', 
                borderRadius: '12px', 
                border: 'none', 
                backgroundColor: '#f3f4f6', 
                color: '#374151', 
                cursor: 'pointer'
              }}
            >
              <FontAwesomeIcon icon={faShareAlt} />
              <span>{property.shares || 0}</span>
            </button>
          </div>
        </main>
      </div>
    );
  }else{
    return (
      <div className="container" style={{ maxWidth: '100%',height:'80%', margin: '1.5rem auto 3rem', padding: '0 1rem' }}>
        <div className="breadcrumb-container" style={{ maxWidth: '100%', marginTop:'10%',  margin: '1.5rem auto 0', padding: '0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} style={{ color: '#3b82f6', justifyContent:'left' }}>Back to search</a>
        </div>
        <div style={{ color: '#ef4444', padding: '1rem', background: '#fee2e2', borderRadius: '8px', margin: '1rem 0', marginTop: '2rem', textAlign: 'center', maxWidth:'100%'}}>
          You must be logged in to view this property.
        </div>
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '12px', 
            fontWeight: '600', 
            cursor: 'pointer',
            marginTop: '1rem',
            marginBottom:'10%'
          }}
        >
          Login
        </button>
      </div>
    );
  }
}