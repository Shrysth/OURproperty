import { useState } from 'react';
import { faHome, faInbox, faBookmark, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Homepage from './HomePage';
import MyListings from './MyListings';
import Inbox from './Inbox';
import Profile from './Profile';
import { getUserName } from '../services/getUserName'; 

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState(<Homepage />);
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (component, tabName) => {
        setActiveComponent(component);
        setActiveTab(tabName);
    };

    const username= getUserName(); 
    return (
        <div style={{
            fontFamily: "'Inter', sans-serif",
            backgroundColor: '#f8fafc',
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Navigation Bar */}
            

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar */}
                <div style={{
                    width: '240px',
                    backgroundColor: '#ffffff',
                    padding: '24px 16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '32px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: activeTab === 'profile' ? '#f0f9ff' : 'transparent'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: '#e0f2fe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px'
                        }}>
                            <span style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#0369a1'
                            }}>{username}</span>
                        </div>
                        <div>
                            <h3 style={{ 
                                margin: 0, 
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1e293b'
                            }}>{username}</h3>
                            <p style={{ 
                                margin: 0, 
                                fontSize: '14px',
                                color: '#64748b'
                            }}>Premium Agent</p>
                        </div>
                    </div>

                    <nav>
                        <button 
                            onClick={() => handleTabClick(<Homepage />, 'home')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '12px',
                                marginBottom: '8px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: activeTab === 'home' ? '#f0f9ff' : 'transparent',
                                color: activeTab === 'home' ? '#0369a1' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                ':hover': {
                                    backgroundColor: '#f0f9ff',
                                    color: '#0369a1'
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faHome} style={{ marginRight: '12px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
                        </button>

                        <button 
                            onClick={() => handleTabClick(<MyListings />, 'listings')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '12px',
                                marginBottom: '8px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: activeTab === 'listings' ? '#f0f9ff' : 'transparent',
                                color: activeTab === 'listings' ? '#0369a1' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                ':hover': {
                                    backgroundColor: '#f0f9ff',
                                    color: '#0369a1'
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '12px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>My Listings</span>
                        </button>

                        <button 
                            onClick={() => handleTabClick(<Inbox />, 'inbox')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '12px',
                                marginBottom: '8px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: activeTab === 'inbox' ? '#f0f9ff' : 'transparent',
                                color: activeTab === 'inbox' ? '#0369a1' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                ':hover': {
                                    backgroundColor: '#f0f9ff',
                                    color: '#0369a1'
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faInbox} style={{ marginRight: '12px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Inbox</span>
                            {/* <span style={{
                                marginLeft: 'auto',
                                backgroundColor: '#f43f5e',
                                color: 'white',
                                borderRadius: '9999px',
                                padding: '2px 8px',
                                fontSize: '12px'
                            }}>3</span> */}
                        </button>

                        <button 
                            onClick={() => handleTabClick(<Profile />, 'profile')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '12px',
                                marginBottom: '8px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: activeTab === 'profile' ? '#f0f9ff' : 'transparent',
                                color: activeTab === 'profile' ? '#0369a1' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                ':hover': {
                                    backgroundColor: '#f0f9ff',
                                    color: '#0369a1'
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '12px', width: '20px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Profile</span>
                        </button>
                    </nav>

                    <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <FontAwesomeIcon icon={faChartLine} style={{ color: '#0369a1', marginRight: '8px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#0369a1' }}>Upgrade Plan</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Get access to premium features and analytics</p>
                    </div>
                </div>

                {/* Main Content */}
                <main style={{ 
                    flex: 1, 
                    padding: '24px',
                    backgroundColor: '#f8fafc',
                    overflowY: 'auto'
                }}>
                    {activeComponent}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;