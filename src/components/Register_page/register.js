import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
   

    const handleRegister = () => {
        let newErrors = {};
        if (!firstName.trim()) {
            newErrors.firstName = '*First name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = '*Last name is required';
        }
        if (!userName.trim()) {
            newErrors.userName = '*Username is required';
        }

        if (!email.trim()) {
            newErrors.email = '*Email is required';
        }

        if (!password) {
            newErrors.password = '*Password is required';
        } else if (password.length < 8) {
            newErrors.password = '*Password should be at least 8 characters';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = '*Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = '*Passwords do not match';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted');
        }
       
    };

    return (
        <div>
            <div className="register-container">
                <div className="register-form-container">
                    <div className="register-image-row">
                    <img src="images/fundo-logo.png" alt="Logo" className="register-header-logo" />
                        <div className="register-header-title">
                        <div className="register-form-title">Fundoo-Notes</div>
                        <div className="register-form-subtitle">Create your Fundo Account</div>
                        </div>
                    </div>
                    
                    <div className="register-form-row">
                    <div className={errors.firstName ? 'register-form-group-err' : 'register-form-group'}>
                        <input
                            type="text"
                            placeholder="First Name*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            
                        />
                        {errors.firstName && <div className="error">{errors.firstName}</div>}
                    </div>

                    <div className={errors.lastName ? 'register-form-group-err' : 'register-form-group'}>
                        <input
                            type="text"
                            placeholder="Last Name*"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <div className="error">{errors.lastName}</div>}
                    </div>
                    </div>
                
                    <div className={errors.email ? 'register-form-group-full-err' : 'register-form-group-full'}>
                        <input type="email" placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className={errors.userName ? 'register-form-group-full-err' : 'register-form-group-full'}>
                        <input
                            type="text"
                            placeholder="Username*"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        {errors.userName && <div className="error">{errors.userName}</div>}
                    </div>

                    <div className="register-form-row">
                    <div className={errors.password ? 'register-form-group-err' : 'register-form-group'}>
                        <input
                            type="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className={errors.confirmPassword ? 'register-form-group-err' : 'register-form-group'}>
                        <input
                            type="password"
                            placeholder="Confirm Password*"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    </div>
                    </div>

                    <div className="register-form-group-btn">
                        <Link to="/login" className="register-link">Sign in instead</Link>
                        <button className="register-button" onClick={handleRegister}>Register</button>
                    </div>
                </div>

                <div className="register-image-container">
                    <img src="images/43849699.jpg" alt="img is not loaded" />
                    <div className="register-image-text">One account. All of Fundo working for you.</div>
                </div>
            </div>
            
            <footer className="register-footer-cnt">
                <div className="register-language-selector-cnt">
                    <select>
                        <option>English (United States)</option>
                        <option>Telugu (AP)</option>
                        <option>Kannada (Karnataka)</option>
                        <option>Hindi (India)</option>
                    </select>
                </div>
                <div className="register-footer-links">
                    <a href="#">Help</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </footer>
        </div>
    );
}

export default Register;
