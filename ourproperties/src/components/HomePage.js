import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faHome, faInbox,faUser, faBookmark,faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import { getUserName } from "../services/getUserName";
const HomePage = () => {
    const username = getUserName();
    const navigate = useNavigate();

    const handleAddProperty = () => {
        navigate('/add-property');
    };

    return (
        <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <h1 style={{ 
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 8px 0'
                    }}>Welcome back, {username}</h1>
                    <p style={{ 
                        color: '#64748b',
                        margin: 0,
                        fontSize: '14px'
                    }}>Here's what's happening with your listings today</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#f8fafc'
                        }
                    }}>
                        <span style={{ 
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#1e293b'
                        }}>Export Report</span>
                    </button>
                    <button onClick={handleAddProperty} style={{ 
                        backgroundColor: '#3b82f6',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#2563eb'
                        }
                    }}>
                        <span style={{ 
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'white'
                        }}>Add New Listing</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ 
                                color: '#64748b',
                                fontSize: '14px',
                                margin: '0 0 8px 0'
                            }}>Total Listings</p>
                            <h3 style={{ 
                                color: '#1e293b',
                                fontSize: '24px',
                                fontWeight: '600',
                                margin: 0
                            }}>15</h3>
                        </div>
                        <div style={{ 
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#f0f9ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FontAwesomeIcon icon={faHome} style={{ color: '#3b82f6' }} />
                        </div>
                    </div>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '12px'
                    }}>
                        <span style={{ 
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{ marginRight: '4px' }}>↑</span> 10%
                        </span>
                        <span style={{ 
                            color: '#64748b',
                            fontSize: '12px',
                            marginLeft: '8px'
                        }}>vs last month</span>
                    </div>
                </div>

                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ 
                                color: '#64748b',
                                fontSize: '14px',
                                margin: '0 0 8px 0'
                            }}>Active Listings</p>
                            <h3 style={{ 
                                color: '#1e293b',
                                fontSize: '24px',
                                fontWeight: '600',
                                margin: 0
                            }}>10</h3>
                        </div>
                        <div style={{ 
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#f0fdf4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FontAwesomeIcon icon={faHome} style={{ color: '#22c55e' }} />
                        </div>
                    </div>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '12px'
                    }}>
                        <span style={{ 
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{ marginRight: '4px' }}>↑</span> 5%
                        </span>
                        <span style={{ 
                            color: '#64748b',
                            fontSize: '12px',
                            marginLeft: '8px'
                        }}>vs last month</span>
                    </div>
                </div>

                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ 
                                color: '#64748b',
                                fontSize: '14px',
                                margin: '0 0 8px 0'
                            }}>Leads Generated</p>
                            <h3 style={{ 
                                color: '#1e293b',
                                fontSize: '24px',
                                fontWeight: '600',
                                margin: 0
                            }}>45</h3>
                        </div>
                        <div style={{ 
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#eff6ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#3b82f6' }} />
                        </div>
                    </div>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '12px'
                    }}>
                        <span style={{ 
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{ marginRight: '4px' }}>↑</span> 20%
                        </span>
                        <span style={{ 
                            color: '#64748b',
                            fontSize: '12px',
                            marginLeft: '8px'
                        }}>vs last month</span>
                    </div>
                </div>

                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ 
                                color: '#64748b',
                                fontSize: '14px',
                                margin: '0 0 8px 0'
                            }}>Avg. Response Time</p>
                            <h3 style={{ 
                                color: '#1e293b',
                                fontSize: '24px',
                                fontWeight: '600',
                                margin: 0
                            }}>2.4h</h3>
                        </div>
                        <div style={{ 
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#fef2f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FontAwesomeIcon icon={faInbox} style={{ color: '#ef4444' }} />
                        </div>
                    </div>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '12px'
                    }}>
                        <span style={{ 
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{ marginRight: '4px' }}>↓</span> 15%
                        </span>
                        <span style={{ 
                            color: '#64748b',
                            fontSize: '12px',
                            marginLeft: '8px'
                        }}>vs last month</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
            }}>
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ 
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                    }}>Recent Activity</h2>
                    <button style={{ 
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#3b82f6',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        ':hover': {
                            textDecoration: 'underline'
                        }
                    }}>View All</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '12px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#f8fafc'
                        }
                    }}>
                        <div style={{ 
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#e0f2fe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            flexShrink: 0
                        }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#0369a1' }} />
                        </div>
                        <div>
                            <p style={{ 
                                margin: '0 0 4px 0',
                                fontSize: '14px',
                                color: '#1e293b'
                            }}>
                                <strong>New lead</strong> on Modern house with pool
                            </p>
                            <p style={{ 
                                margin: 0,
                                fontSize: '12px',
                                color: '#64748b'
                            }}>2 hours ago</p>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '12px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#f8fafc'
                        }
                    }}>
                        <div style={{ 
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#ecfdf5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            flexShrink: 0
                        }}>
                            <FontAwesomeIcon icon={faHome} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                            <p style={{ 
                                margin: '0 0 4px 0',
                                fontSize: '14px',
                                color: '#1e293b'
                            }}>
                                <strong>Listing updated</strong> for Cozy apartment in the city
                            </p>
                            <p style={{ 
                                margin: 0,
                                fontSize: '12px',
                                color: '#64748b'
                            }}>1 day ago</p>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '12px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#f8fafc'
                        }
                    }}>
                        <div style={{ 
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#fef2f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            flexShrink: 0
                        }}>
                            <FontAwesomeIcon icon={faBookmark} style={{ color: '#ef4444' }} />
                        </div>
                        <div>
                            <p style={{ 
                                margin: '0 0 4px 0',
                                fontSize: '14px',
                                color: '#1e293b'
                            }}>
                                <strong>Luxury villa</strong> with ocean view marked as active
                            </p>
                            <p style={{ 
                                margin: 0,
                                fontSize: '12px',
                                color: '#64748b'
                            }}>3 days ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ 
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 20px 0'
                }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ 
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#2563eb'
                        }
                    }}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Add New Listing</span>
                    </button>
                    <button style={{ 
                        backgroundColor: 'white',
                        color: '#3b82f6',
                        border: '1px solid #e2e8f0',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#f8fafc'
                        }
                    }}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Manage Listings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;