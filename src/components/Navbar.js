
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false);
    let data = useCart();

   
    
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate("/login")
    }

    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{  filter: 'blur(20)', position: "fixed", zIndex: "1000", width: "100%", height:'60px' }}>
                <div className="container-fluid">
                    <div className="navbar-brand fs-1 fst-italic" to="/"><span style={{ fontWeight: 'bold', color: 'white'}}>GoFood</span>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-2 active" aria-current="page" to="/"><span style={{ fontWeight: 'bold', color: 'white'}}>Home</span></Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5  active" aria-current="page" to="/myOrder"><span style={{ fontWeight: 'bold', color: 'white'}}>My Orders</span></Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </form> :
                            <div>

                                <div className="btn bg-white text-success mx-2 " onClick={()=> {setCartView(true)}} >
                                    My Cart{" "}
                                    <Badge pill bg = "danger"> {data.length} </Badge>
                                    
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}

                                <button onClick={handleLogout} className="btn bg-white text-danger" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}