import React from "react";
import "./Start.scss";
import { Link ,useNavigate} from 'react-router-dom';


const WelcomePage = () => {
    const navigate=useNavigate()
    const handleRegister = () => {
        setTimeout(() => {
            navigate("register")
        }, 500);
        
    }
  return (
    <div >

      <div className="welcome-image-container">
        <img src={`${process.env.PUBLIC_URL}/images/logo-main.png`} />
        <div className="welcome-header-title">
            <div className="welcome-form-title">Fundoo-Notes</div>
            </div>
    </div>
      <div className="welcome-container">
        <img src={`${process.env.PUBLIC_URL}/images/start1.png`} />
        <div className="welcome-sub-container">
            <div className="welcome-title">Organize your thoughts, unleash your creativity, and keep your ideas alive – all in one place.</div>
            <div className="buttons">
                <button className="get-started" onClick={handleRegister}>Get Started</button>
                <Link to="/login" className="already-account">I Already Have an Account</Link>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomePage;
