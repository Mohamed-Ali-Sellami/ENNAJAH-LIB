import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../JS/userSlice";
import Navbar from './Navbar'
import Footer from './Footer'
import "./styles/Login.css";

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await dispatch(userLogin(login));

      if (res.payload?.user?._id) {
        // Stocke correctement le user et le token
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
       <Navbar/>
    <div className="wrapper">
     
      <form onSubmit={(e) => e.preventDefault()} className="form-signin">
        <h2 className="form-signin-heading">Please login</h2>

        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Email Address"
          required
          autoFocus
          onChange={(e) => setlogin({ ...login, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setlogin({ ...login, password: e.target.value })}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            value="remember-me"
            id="rememberMe"
            name="rememberMe"
          />{" "}
          Remember me
        </label>

        <button
          className="btnlog btnlog-lg btnlog-primary btnlog-block"
          onClick={handleLogin}
        >
          Login
        </button>

        <p>
          You already have an account?{" "}
          <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
    
    </div>
  );
};

export default Login;
