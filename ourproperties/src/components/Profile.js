import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDashboardKey } from '../services/getDashboardKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faExclamationTriangle,
    faSync,
    faHeart,
    faShareAlt,
    faCheck,
    faExclamationCircle,
    faFilterCircleXmark,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { getUserName } from '../services/getUserName';

export default function Profile() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const dashboardKey = getDashboardKey();
    const navigate = useNavigate();
    const username = getUserName();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                if (dashboardKey) {
                    const response = await axios.get(`http://localhost:8080/api/properties/dashboard/${dashboardKey}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setProperties(response.data || []);
                } else {
                    setError('Unable to identify user properties');
                }
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError('Failed to load properties. Please try again later.');
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [dashboardKey]);

    const formatNumber = (num) => {
        return num?.toLocaleString() || '0';
    };
    const handlePropertyClick = (propertyId) => {
        navigate(`/view/${propertyId}`);
    };

    const filteredProperties = properties.filter(property => {
        const name = property?.title?.toLowerCase() || '';
        const address = property?.address?.toLowerCase() || '';
        const searchTermLower = searchTerm.toLowerCase();

        const matchesSearch = name.includes(searchTermLower) ||
            address.includes(searchTermLower);
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'sold' && property?.sold) ||
            (filterStatus === 'available' && !property?.sold);
        return matchesSearch && matchesStatus;
    });

    return (
        <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
            {/* Profile Header Section */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
                borderRadius: '8px'
            }}>
                <h1 style={{ marginTop: 0 }}>Profile</h1>
                <p>Manage your profile information</p>
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px'
                    }}>
                        {/* Placeholder for profile image */}
                        <span style={{ fontSize: '24px' }}>👤</span>
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0' }}> {username} </h3>
                        <p style={{ margin: '0 0 5px 0', color: '#666' }}>Real Estate Agent</p>
                        <p style={{ margin: '0 0 5px 0', color: '#666' }}>Joined in 2021</p>
                    </div>
                </div>
                
                <p style={{ marginTop: '15px' }}>
                    Experienced real estate agent specializing in residential properties in the city. 
                    Passionate about helping clients find their dream homes and achieve their real estate goals.
                </p>
            </div>

            {/* Listings Section */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Listings</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', marginRight: '15px' }}>
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '8px 35px 8px 15px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    width: '200px'
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#666'
                                }}
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="all">All Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div style={{
                            display: 'inline-block',
                            width: '3rem',
                            height: '3rem',
                            border: '0.25em solid #f3f3f3',
                            borderTop: '0.25em solid #007bff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '15px'
                        }}></div>
                        <p>Loading properties...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff8f8', borderRadius: '8px' }}>
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{
                                fontSize: '48px',
                                color: '#dc3545',
                                marginBottom: '15px'
                            }}
                        />
                        <h5 style={{ color: '#dc3545', marginBottom: '15px' }}>{error}</h5>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '8px 15px',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            <FontAwesomeIcon icon={faSync} style={{ marginRight: '8px' }} />
                            Retry
                        </button>
                    </div>
                )}

                {/* Properties Grid */}
                {!loading && !error && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '20px'
                    }}>
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map(property => (
                                <div key={property.id} onClick={() => handlePropertyClick(property.id)} style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s',
                                    ':hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                    }
                                }}>
                                    {property.image ? (
                                        <img
                                            src={`http://localhost:8080/api/properties/images/${property.image}`}
                                            alt={property.title || 'Property'}
                                            style={{
                                                width: '100%',
                                                height: '180px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '180px',
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faHome} style={{ color: '#666', fontSize: '48px' }} />
                                        </div>
                                    )}
                                    <div style={{ padding: '15px' }}>
                                        <h4 style={{ margin: '0 0 5px 0' }}>{property.title || 'Unnamed Property'}</h4>
                                        <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9em' }}>
                                            {property.address || 'No address provided'}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{
                                                padding: '3px 10px',
                                                borderRadius: '20px',
                                                backgroundColor: property.sold ? '#f8d7da' : '#d4edda',
                                                color: property.sold ? '#721c24' : '#155724',
                                                fontSize: '0.8em'
                                            }}>
                                                {property.sold ? 'Sold' : 'Available'}
                                            </span>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em' }}>
                                                    <FontAwesomeIcon
                                                        icon={faHeart}
                                                        style={{
                                                            color: '#dc3545',
                                                            marginRight: '5px'
                                                        }}
                                                    />
                                                    {formatNumber(property.likes)}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em' }}>
                                                    <FontAwesomeIcon
                                                        icon={faShareAlt}
                                                        style={{
                                                            color: '#007bff',
                                                            marginRight: '5px'
                                                        }}
                                                    />
                                                    {formatNumber(property.shares)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: '40px'
                            }}>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{
                                        fontSize: '48px',
                                        color: '#666',
                                        marginBottom: '15px'
                                    }}
                                />
                                <h5 style={{ marginBottom: '10px' }}>No properties found</h5>
                                <p style={{ color: '#666', marginBottom: '20px' }}>Try adjusting your search or filters</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterStatus('all');
                                    }}
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 15px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '0 auto'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFilterCircleXmark} style={{ marginRight: '8px' }} />
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}