import React, { useState } from 'react'
    
const Login = (props) => {
    const [credentials, setCredentials]=useState({email:"",password:""})
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:5000/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({email:credentials.email,password:credentials.password})
            },
        );
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.JWT_DATA);
            props.showAlert("Successfully Logged in","success");
            window.location.href="/";
        }
        else{
            props.showAlert("Invalid Credentials","danger");
            window.location.href="/login";
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
           <h2 className='my-5'>Login in to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"id="password" onChange={onChange} value={credentials.password} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
