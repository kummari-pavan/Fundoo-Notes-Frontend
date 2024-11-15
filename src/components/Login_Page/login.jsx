import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom'; 
import { loginApiCall } from '../../utils/Api';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setErrors] = useState({});

  const handleLogin = () => {
    let newErrors = {};
 

    if (!email.trim()) {
        newErrors.email = '*Email is required';
    }

    if (!password) {
        newErrors.password = '*Password is required';
    } else if (password.length < 8) {
        newErrors.password = '*Password should be at least 8 characters';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        loginApiCall()
        console.log('Login Successful !');
    }
   
};

  return (
    <div>
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-form-title">Fundoo-Notes</h1>
        <h2 className="login-form-sub-title">Sign In</h2>
        <p className="login-form-subtitle">Use your Fundo Account</p>

        <div className={loginErrors.email ? 'login-form-group-full-err' : 'login-form-group-full '}>
          <input type="text" placeholder="Email or Username*" value={email} onChange={(e) => setEmail(e.target.value)} />
          {loginErrors.email && <div className="login-error">{loginErrors.email}</div>}
        </div>

        <div className={loginErrors.password ? 'login-form-group-full-err' : 'login-form-group-full '}>
          <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
          {loginErrors.password && <div className="login-error">{loginErrors.password}</div>}
          <a href="#" className="login-pass-link">Forgot Password?</a>
        </div>

        <div className="login-form-group-btn">
        <Link to="/register" className="login-create-link" >Create Account</Link>
          <button className="login-button" onClick={handleLogin} >Login</button>
        </div>
      </div>
    </div>
     <footer className='login-footer-cnt'>
     <div className="login-language-selector-cnt">
         <select>
         <option>English (United States)</option>
         <option>Telugu (AP)</option>
         <option>Kannada (Karnataka)</option>
         <option>Hindi (India)</option>
         </select>
     </div>
     <div className="login-footer-links">
         <a href="#">Help</a>
         <a href="#">Privacy</a>
         <a href="#">Terms</a>
     </div>
     
     </footer>
     </div>
    
  );
}

export default Login;
