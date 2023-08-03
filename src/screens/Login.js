import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);


    if (!json.success) {
      alert("Enter Valid Credentials")
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      //console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div style={{ 
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', 
            backgroundSize: 'cover',
            height: '100vh' 
    }}>
      <div>
        <Navbar />
      </div>


      <div className="container my-5">
        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"><span style={{ fontWeight: 'bold', color: 'white'}}>Email address</span></label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} style={{ width: '500px' }}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><span style={{ fontWeight: 'bold', color: 'white' }}>Password</span></label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} style={{ width: '500px' }} />
          </div>


          <button type="submit" className="m-3 btn btn-success custom-button">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger '>New User</Link>
        </form>
      </div >
    </div>
  );
}