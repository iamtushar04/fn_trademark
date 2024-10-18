import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Adjust the path as necessary
import logo from '../assets/logo.jpg'; // Replace with your logo path

function Navbar() {
  const { logout } = useAuth(); // Use the AuthContext
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    logout(); 
    navigate('/login'); // Redirect to login page
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f1f1f1', // Header background color
    color: 'black', // Text color
    fontSize: '18px',
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyle = {
    width: '190px', // Adjust the size as needed
    height: '45px',
    marginRight: '10px', // Space between logo and text
  };

  const rightStyle = {
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white background on hover
  };

  return (
    <header style={headerStyle}>
      <div style={leftStyle}>
        {/* <img src={logo} alt="Logo" style={logoStyle} /> */}
        {/* <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/data" style={linkStyle}>Data Coverage</Link> */}
      </div>
      <div style={rightStyle}>
        <Link to="#" onClick={handleLogout} style={linkStyle}>Logout</Link>
      </div>
    </header>
  );
}

export default Navbar;
