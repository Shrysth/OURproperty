import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { isAuthenticated } from '../services/isAuthenticated';
import { getUserRole } from '../services/getUserRole';
import { getDashboardKey } from '../services/getDashboardKey';
import '../css/Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const userRole = getUserRole();
    const Dashboard = getDashboardKey();

    return (
        <header className="navbar-container">
            <div className="navbar-logo-container">
                <svg className="navbar-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="#101418"></path>
                </svg>
                <h2 className="navbar-logo-text">PropertyPro</h2>
            </div>
            
            <div className="navbar-links-container">
                <a className="navbar-link navbar-button" onClick={() => handleNavigation('/')}>Home</a>
                <a className="navbar-link navbar-button" onClick={() => handleNavigation('/pricing')}>Pricing</a>
                <a className="navbar-link navbar-button" onClick={() => handleNavigation('/about')}>About</a>
                <a className="navbar-link navbar-button" onClick={() => handleNavigation('/contact')}>Contact</a>
                
                {isAuthenticated() ? (
                    <>
                        {userRole === 'seller' && (
                            <>
                                <Link className="navbar-link navbar-button" to={`/dashboard/${Dashboard}`}>Dashboard</Link>
                                <a className="navbar-link navbar-button" onClick={() => handleNavigation('/add-property')}>Add Property</a>
                            </>
                        )}
                        
                        <a className="navbar-link navbar-button" onClick={() => handleNavigation('/logout')}><FontAwesomeIcon icon={faUser} style={{ color: '#64748b' }} /> &nbsp; Logout</a>
                    </>
                ) : (
                    <div className="navbar-auth-buttons">
                        <button className="navbar-button navbar-button-register" onClick={() => handleNavigation('/register')}>
                            Register
                        </button>
                        <button className="navbar-button navbar-button-login" onClick={() => handleNavigation('/login')}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}