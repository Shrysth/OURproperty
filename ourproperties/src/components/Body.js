import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropertyService from '../services/PropertyService';
import { faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';


export default function Body() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    setProperties(prev => ({
      ...prev,
      likes: newLikeStatus ? prev.likes + 1 : Math.max(0, prev.likes - 1)
    }));

    try {
      // await PropertyService.updateLike(id, newLikeStatus);
    } catch (error) {
      console.error("Error updating like:", error);
      setIsLiked(!newLikeStatus);
      setProperties(prev => ({
        ...prev,
        likes: newLikeStatus ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await PropertyService.getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  
  const handleShare = async (id) => {
    setProperties(properties.map(property =>
      property.id === id
        ? { ...property, shares: property.shares + 1 }
        : property
    ));
    alert('Property shared successfully!');
  };

  const filteredProperties = properties.filter(property => {
    const name = property?.title?.toLowerCase() || ''; // Changed from name to title
    const address = property?.address?.toLowerCase() || '';
    const searchQueryLower = searchQuery.toLowerCase();

    const matchesSearch = name.includes(searchQueryLower) ||
      address.includes(searchQueryLower);

    return matchesSearch;
  });
  if (loading) return <div className="text-center py-10">Loading properties...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}. Please ensure the backend server is running.</div>;
  if (properties.length === 0) return <div className="text-center py-10">No properties found</div>;

  return (
    <div className="relative flex size-full flex-col bg-slate-50 " style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', marginTop: '0px', paddingTop: '0px' }}>
      <div className="layout-container w-full">
        <div className="px-0 md:px-40 py-0 w-full">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div >
              <div >
                <div className="flex  flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center p-5"
                  style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuAUyskVm7jUnjX_OGxLUX_5mEPJMsNCChOmyRSXP4cq6Kl7Xs9tKhizmn_VxhhP4e6IyZozIh7ogJFJ6KisHVLRXDzD8E9EVcZJu-FhuwbF9wtjyihfZ3QLj4_wlZWY1qzzc8pTjn95JckihhswNilNDU8MUgR4qK47ZpeL8UzGubzJnabZkA2dlRBh0T9RrGB-xjOoFNbfxWff9BGKX-TF0JGqDw82CTe9rZnO0zNlTK0ZeZl4q86QJIQixXKbI5IvFUXcSvNjekvd)' }}>
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Find your dream home
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Explore a wide range of properties for sale and rent in your desired location.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <label className='mx-2 mt-4'>
              <div >
                <div className='input' >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>

                  <input
                    type="text"
                    placeholder="Enter an address, neighborhood, city, or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </label>

            <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Listings</h2>
            <div className="property-grid" id="propertyGrid">
              {filteredProperties.map(property => (
                <div className="property-card" key={property.id}>
                  <img
                    src={`http://localhost:8080/api/properties/images/${property.image}`}
                    alt={property.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <h3>{property.title}</h3>
                  <p>{property.description}</p>
                  <div className="price">{property.price}</div>
                  <div className="actions">
                    <button onClick={() => handleLike(property.id)}>
                      <FontAwesomeIcon icon={faHeart} color='red' /> {property.likes}
                    </button>
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
                    <button onClick={() => handleShare(property.id)}>
                      <FontAwesomeIcon icon={faShareAlt} /> {property.shares}
                    </button>
                    <Link to={`/view/${property.id}`} className="view-btn">
                      <FontAwesomeIcon icon={faEye} /> View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}