import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, userCurrent } from "./JS/userSlice";
import Profil from "./components/Profil";
import PrivateRoute from "./routes/PrivateRoute";
import { NotificationContainer } from "react-notifications";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Accessoires from "./components/Accessoires";
import Smartphones from "./components/Smartphones";
import Produitscolaire from "./components/Produitscolaire";
import IPTV from "./components/IPTV";
import { getproduct } from "./JS/ProductsSlice";
import Shoppingcard from "./components/Shoppingcard";
import HomeAdmin from "./components/Dashboard/Components/HomeAdmin";
import GestionUser from "./components/Dashboard/Components/GestionUser";
import GestiondesProduits from "./components/Dashboard/Components/GestiondesProduits";
import CommandesAdmin from "./components/Dashboard/Components/CommandesAdmin";

function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, []);

  useEffect(() => {
    dispatch(getproduct())
    
    
   
   
     }, [dispatch])
     const [ping, setPing] = useState(false);
  return (
    <div className="App">
      {/* <div className="header">
        <h1>Auth workshop</h1>
        {isAuth ? (
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : null}
      </div> */}

      {/* Autres composants */}
      <NotificationContainer />

      <Routes>
       <Route  path="/" element={<Home />} />
       <Route exact path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/Accessoires" element={<Accessoires />} />
        <Route path="/smartphones" element={<Smartphones />} />
        <Route path="/produitsscolaire" element={<Produitscolaire />} />
        <Route path="/iptv" element={<IPTV />} />
        
        



        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/shoppingcard" element={<Shoppingcard ping={ping} setping={setPing} />} />
          <Route path="/Dashboard" element={<HomeAdmin />} />
          <Route path="/gestionusers" element={<GestionUser />} />
          <Route path="/gestionproduits" element={<GestiondesProduits />} />
          <Route path="/commandes" element={<CommandesAdmin />} />
          
        </Route>{" "}


      </Routes>
    </div> 
  );
}

export default App;
