import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/userSlice";
import Navbar from "./Navbar";

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
    <div>
      <Navbar/>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form-signin">
          <h2 className="form-signin-heading">Please register</h2>

          <input
            type="text"
            className="form-control"
            placeholder="Name"
            required
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            required
            value={register.lastname}
            onChange={(e) =>
              setRegister({ ...register, lastname: e.target.value })
            }
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            required
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            required
            value={register.Address}
            onChange={(e) =>
              setRegister({ ...register, Address: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Phone"
            required
            value={register.mobile}
            onChange={(e) =>
              setRegister({ ...register, mobile: e.target.value })
            }
          />

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Processing..." : "Register"}
          </button>

          {status === "failed" && <p style={{ color: "red" }}>❌ {error}</p>}

          <h5>
            Already have an account? <Link to="/login">Sign in</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Register;