import React, { useState } from 'react';
import './Login.scss';
import { Link,useNavigate } from 'react-router-dom'; 
import { loginApiCall } from '../../utils/Api';


function Login() {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setErrors] = useState({});
  const navigate=useNavigate()

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

    loginApiCall({email,password},`users/login`)
    
    .then((result)=>{
     console.log(result);
 
    //  const {data} =result
    const {message,user}=result

    console.log(message)
    console.log(user)
 
    //  console.log(data);
     
        if(message==="Login successful"){
         navigate("/dashboard/notes")
         alert("User successfully Login")
        localStorage.setItem('token',user)
        
       }
       else if(message==="User is not registered !"){
         alert("User is not registered !")
       }
       else if(message==="User Password Is Wrong !"){
         alert("User Password Is Wrong !")
       }
       else{
         alert("User not Login")
       }
   
    })
    .catch((error)=>{
        console.log(error)
        alert("User not Login due to backend Error")
    })

    setErrors(newErrors);
    
   
};

  return (
    <div className="login-body">
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
     </div>
    
  );
}

export default Login;
