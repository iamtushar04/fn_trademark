import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const result = await login(username, password);
        
        if (result.success) {
            
            navigate('/'); // Navigate to home page after successful login
        } else {
            setErrorMessage(result.error || 'Login failed. Please try again.'); // Set error message
            console.error(result.error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Login</h2>
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, position: 'relative' }}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={styles.input}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            style={styles.toggleButton}
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <button type="submit" style={styles.submitButton}>Login</button>
                </form>
                <p style={styles.signupText}>
                    Don't have an account? <a href="/Signup" style={styles.link}>Sign up</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    formWrapper: {
        width: '100%',
        maxWidth: '400px',
        padding: '0px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333333',
    },
    inputGroup: {
        width: '100%',
        marginBottom: '16px',
        position: 'relative',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#555555',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #dddddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    toggleButton: {
        position: 'absolute',
        right: '10px',
        left:'80%',
        top: '70%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#b90000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    signupText: {
        marginTop: '16px',
        textAlign: 'center',
        color: '#555555',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    errorMessage: {
        color: '#b90000', // Red color for error message
        marginBottom: '16px',
        textAlign: 'center',
        fontSize: '14px',
    },
};

export default Login;
