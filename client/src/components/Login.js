import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../JS/userSlice";
import Navbar from './Navbar';
import Footer from './Footer';
import "./styles/Login.css";
import imglogo from '../components/images/logo.png'

const Login = () => {
  const [login, setlogin] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await dispatch(userLogin(login));
      if (res.payload?.user?._id) {
        localStorage.setItem("user", JSON.stringify(res.payload.user));
        localStorage.setItem("token", res.payload.token);
        navigate("/profil");
        window.location.reload();
      } else {
        alert("Échec de la connexion. Vérifiez vos identifiants.");
      }
    } catch (error) {
      console.error("Erreur lors du login :", error);
      alert("Erreur serveur.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="form-signin">
          <img src={imglogo} alt="Logo" className="login-logo" />
          <h2 className="form-signin-heading">Connectez-vous à votre compte
          </h2>

          <input
            type="text"
            className="form-control"
            placeholder="Email Address"
            required
            autoFocus
            onChange={(e) => setlogin({ ...login, email: e.target.value })}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => setlogin({ ...login, password: e.target.value })}
          />

           <div className="checkbox-wrapper">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
           </div>



          <button className="btnlog" onClick={handleLogin}>
            Login
          </button>

          <p className="register-link">
            You don’t have an account? <Link to="/register">Register now</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
