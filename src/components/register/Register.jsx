import React, { useState } from 'react';
import './Register.css';
import { Link ,useNavigate} from 'react-router-dom';
import { signupApiCall } from '../../utils/Api';
import JSConfetti from 'js-confetti';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate=useNavigate()
        
       const jsConfetti = new JSConfetti();

    const handleRegister = () => {
        let newErrors = {};
        if (!name.trim()) {
            newErrors.name = '*name is required';
        }
        if (!username.trim()) {
            newErrors.username = '*Username is required';
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

        signupApiCall({name,username,email,password},`users`)
            .then((result)=>{
            const {message}=result
                if(message==="User registered successfully"){
                    toast.success("User Successfully Created!!", {
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
                jsConfetti.addConfetti({
                    emojis: ['✨','🟩','✨','🟥','✨','🟦','✨','🟨','✨','🟪','🟧','🟩','🟨','🔴','🟠','🟡','🟢','🟣','🔵'],
                    emojiSize: 18,
                    confettiNumber: 150,
                });
                
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
                
                }
                else{
                    toast.error("User Not Created!", {
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
            toast.error("Backend Error!!", {
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
        <div className="register-body">
            <div className="register-container">
                <div className="register-form-container">
                    <div className="register-image-row">
                    <img src="images/fundo-logo.png" alt="Logo" className="register-header-logo" />
                        <div className="register-header-title">
                        <div className="register-form-title">Fundoo-Notes</div>
                        <div className="register-form-subtitle">Create your Fundo Account</div>
                        </div>
                    </div>
                        
                    <div className={errors.name ? 'register-form-group-full-err' : 'register-form-group-full'}>
                        <input
                            type="text"
                            placeholder="Full Name*"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                
                    <div className={errors.email ? 'register-form-group-full-err' : 'register-form-group-full'}>
                        <input type="email" placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className={errors.username ? 'register-form-group-full-err' : 'register-form-group-full'}>
                        <input
                            type="text"
                            placeholder="Username*"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        {errors.username && <div className="error">{errors.username}</div>}
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
export default Register;



