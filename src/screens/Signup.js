import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""});
    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        //console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials")
        }else{
            localStorage.setItem("authToken", json.authToken);
            //console.log(localStorage.getItem("authToken"))
            navigate("/");
        }
    };


    const onChange = (event)=>{
        setcredentials({...credentials, [event.target.name] : event.target.value})
    }



    return (
        <div style={{ 
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://w.forfun.com/fetch/40/40ac34477c27d8c69bf840ab5f33d398.jpeg")', 
            backgroundSize: 'cover',
            height: '100vh' 
        }}>
        <div>
            <Navbar />
        </div>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label"><span style={{ fontWeight: 'bold', color: 'white', fontSize:'16px'}}>Name</span></label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} style={{ width: '500px' }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label"><span style={{ fontWeight: 'bold', color: 'white'}}>Email address</span></label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} style={{ width: '500px' }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="exampleInputPassword1" className="form-label"><span style={{ fontWeight: 'bold', color: 'white'}}>Password</span></label>
                        <input type="password" className="form-control" name = 'password' value={credentials.password} onChange={onChange} style={{ width: '500px' }}/>
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to = '/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div >
        </div>
    )
}