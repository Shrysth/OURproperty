import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import View from './components/View';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import NewProperty from './components/NewProperty';
import {isAuthenticated} from './services/isAuthenticated'; // Import the authentication check
import Logout from './components/Logout';
import HomePage from './components/HomePage';
import Pricing from './components/Pricing';



function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/view/:id" element={<View />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard/:dashboardKey" element={<Dashboard />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-property" element={<NewProperty />} />         
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 
