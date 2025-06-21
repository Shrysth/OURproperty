import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getDashboardKey } from '../services/getDashboardKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faPlus,
    faExclamationTriangle,
    faSync,
    faHeart,
    faShareAlt,
    faCheck,
    faExclamationCircle,
    faFilterCircleXmark,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';




    export default function MyListings() {
    
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();
    const dashboardKey = getDashboardKey();

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
                    setError('Unable to identify user properties'+error.message);
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

    const handleAddProperty = () => {
        navigate('/add-property');
    };

    const handleMarkAsSold = async (propertyId) => {
        try {
            await axios.patch(
                `http://localhost:8080/api/properties/${propertyId}`,
                { sold: true },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setProperties(prevProperties =>
                prevProperties.map(prop =>
                    prop.id === propertyId ? { ...prop, sold: true } : prop
                )
            );
        } catch (err) {
            console.error('Error updating property:', err);
            setError('Failed to update property status');
        }
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

    const formatNumber = (num) => {
        return num?.toLocaleString() || '0';
    };
        
        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>My Listings</h1>
                    <button
                        onClick={handleAddProperty}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                        Add New Listing
                    </button>
                </div>

                {/* Search and Filter */}
                <div style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <div style={{ position: 'relative', flexGrow: 1, marginRight: '15px' }}>
                            <input
                                type="text"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 15px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px' }}>Status:</span>
                            <button
                                onClick={() => setFilterStatus('all')}
                                style={{
                                    backgroundColor: filterStatus === 'all' ? '#007bff' : 'transparent',
                                    color: filterStatus === 'all' ? 'white' : '#007bff',
                                    border: '1px solid #007bff',
                                    padding: '5px 10px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterStatus('available')}
                                style={{
                                    backgroundColor: filterStatus === 'available' ? '#28a745' : 'transparent',
                                    color: filterStatus === 'available' ? 'white' : '#28a745',
                                    border: '1px solid #28a745',
                                    padding: '5px 10px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                Available
                            </button>
                            <button
                                onClick={() => setFilterStatus('sold')}
                                style={{
                                    backgroundColor: filterStatus === 'sold' ? '#dc3545' : 'transparent',
                                    color: filterStatus === 'sold' ? 'white' : '#dc3545',
                                    border: '1px solid #dc3545',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                Sold
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    console.error('Error:', error),
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
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

                {/* Loading State */}
                {loading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        backgroundColor: '#fff',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                    }}>
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

                {/* Properties Table */}
                {!loading && !error && (
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ margin: 0 }}>
                                Properties <span style={{
                                    backgroundColor: '#f0f0f0',
                                    padding: '3px 8px',
                                    borderRadius: '10px',
                                    fontSize: '0.9em',
                                    marginLeft: '10px'
                                }}>{formatNumber(filteredProperties.length)}</span>
                            </h3>
                            {filteredProperties.length > 0 && (
                                <small style={{ color: '#666' }}>
                                    Showing {formatNumber(filteredProperties.length)} of {formatNumber(properties.length)}
                                </small>
                            )}
                        </div>

                        {filteredProperties.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse'
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'left',
                                                backgroundColor: '#f0f0f0'
                                            }}>Property</th>
                                            <th style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'left',
                                                backgroundColor: '#f0f0f0'
                                            }}>Status</th>
                                            <th style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'left',
                                                backgroundColor: '#f0f0f0'
                                            }}>Likes</th>
                                            <th style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'left',
                                                backgroundColor: '#f0f0f0'
                                            }}>Shares</th>
                                            <th style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'left',
                                                backgroundColor: '#f0f0f0'
                                            }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProperties.map(property => (
                                            <tr
                                                key={property.id}
                                                onClick={() => handlePropertyClick(property.id)}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #ccc',
                                                    ':hover': {
                                                        backgroundColor: '#f9f9f9'
                                                    }
                                                }}
                                            >
                                                <td style={{
                                                    border: '1px solid #ccc',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {property.image ? (
                                                            <img
                                                                src={`http://localhost:8080/api/properties/images/${property.image}`}
                                                                alt={property.title || 'Property'}
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '4px',
                                                                    marginRight: '15px'
                                                                }}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px',
                                                                marginRight: '15px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <FontAwesomeIcon icon={faHome} style={{ color: '#666' }} />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p style={{
                                                                fontWeight: 'bold',
                                                                margin: '0 0 5px 0'
                                                            }}>
                                                                {property.title || 'Unnamed Property'}
                                                            </p>
                                                            <p style={{
                                                                color: '#666',
                                                                margin: 0,
                                                                fontSize: '0.9em'
                                                            }}>
                                                                {property.address || 'No address provided'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{
                                                    border: '1px solid #ccc',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '5px 10px',
                                                        borderRadius: '20px',
                                                        backgroundColor: property.sold ? '#f8d7da' : '#d4edda',
                                                        color: property.sold ? '#721c24' : '#155724',
                                                        fontSize: '0.9em'
                                                    }}>
                                                        {property.sold ? 'Sold' : 'Available'}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    border: '1px solid #ccc',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FontAwesomeIcon
                                                            icon={faHeart}
                                                            style={{
                                                                color: '#dc3545',
                                                                marginRight: '8px'
                                                            }}
                                                        />
                                                        {formatNumber(property.likes)}
                                                    </div>
                                                </td>
                                                <td style={{
                                                    border: '1px solid #ccc',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FontAwesomeIcon
                                                            icon={faShareAlt}
                                                            style={{
                                                                color: '#007bff',
                                                                marginRight: '8px'
                                                            }}
                                                        />
                                                        {formatNumber(property.shares)}
                                                    </div>
                                                </td>
                                                <td style={{
                                                    border: '1px solid #ccc',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    {!property.sold && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMarkAsSold(property.id);
                                                            }}
                                                            style={{
                                                                backgroundColor: '#28a745',
                                                                color: 'white',
                                                                border: 'none',
                                                                padding: '5px 10px',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                                                            Sold
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '40px',
                                backgroundColor: '#fff'
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
        )};


