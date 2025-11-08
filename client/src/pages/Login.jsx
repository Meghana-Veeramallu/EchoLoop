import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login', {email, password}) 
        .then(result => {
            console.log(result)
            if(result.data === "Success"){
                navigate('/landing')
            }
            
        })
        .catch(err => console.log(err))
    }

    return(
      
        <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
            <div className=" p-3 rounded w-25" style={{ background: "#070A26", color:"#ffffff", border: "0.5px solid #CBFF2E"}}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn w-100 rounded-0" style={{ background: "#CBFF2E", color:"#070A26"}}>
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/signup" className="btn btn-dark text-white w-100 rounded-0 text-decoration-none">
                  SignUp
                </Link>
            </div>
        </div>
    );
}

export default Login;