import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/userSlice";
import Navbar from "./Navbar";
import './styles/Register.css';
import imglogo from '../components/images/logo.png'

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    Address: "",
    mobile: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(register));
  };

  useEffect(() => {
    if (status === "succeeded" && user) {
      alert("Success Register! 🎉");
      navigate("/profil");
    }
  }, [status, user, navigate]);

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <img src={imglogo} alt="Logo" className="register-logo" />
          <h2 className="register-title">Créer Votre Compte !</h2>

          <div className="input-group">
            Name :
            <input
              type="text"
              className="register-input"
              placeholder="First Name"
              required
              value={register.name}
              onChange={(e) => setRegister({ ...register, name: e.target.value })}
            />
            Prénom :
            <input
              type="text"
              className="register-input"
              placeholder="Last Name"
              required
              value={register.lastname}
              onChange={(e) =>
                setRegister({ ...register, lastname: e.target.value })
              }
            />
          </div>
          Email :
          <input
            type="email"
            className="register-input"
            placeholder="Email Address"
            required
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          Mode de passe :
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            required
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
           Addresse :
          <input
            type="text"
            className="register-input"
            placeholder="Address"
            required
            value={register.Address}
            onChange={(e) =>
              setRegister({ ...register, Address: e.target.value })
            }
          />
           Telephone :
          <input
            type="tel"
            className="register-input"
            placeholder="Phone Number"
            required
            value={register.mobile}
            onChange={(e) =>
              setRegister({ ...register, mobile: e.target.value })
            }
          />

          <button
            type="submit"
            className="buttonregister"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="button-spinner">Processing...</span>
            ) : (
              "Register Now"
            )}
          </button>

          {status === "failed" && (
            <p className="register-error">❌ {error}</p>
          )}

          <p className="register-login-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;