import React, { useState } from 'react';
import './Login.scss';
import { Link,useNavigate } from 'react-router-dom'; 
import { loginApiCall } from '../../utils/Api';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const {data}=result

    console.log(data.message)
    console.log(data.user)
 
    //  console.log(data);
     
        if(data.message==="Login successful"){
          
          
          localStorage.setItem('token',data.user)

          toast.success("Login Successfully !!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          setTimeout(() => {
            navigate("/dashboard/notes")
        }, 2000);
          
       }
       else{
        toast.error("User Not Logged!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
       }
   
    })
    .catch((error)=>{
        console.log(error)
        toast.error("Server Error!!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
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

    <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
            />

     </div>
    
  );
}

export default Login;
