import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials, setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const navigate=useNavigate();
      const handleSubmit = async(e) => {
          e.preventDefault();
          if(credentials.password!==credentials.cpassword){
                props.showAlert("Password and Confirm Password do not match","danger");
                return;
          }
          const response = await fetch(
              `http://localhost:5000/api/auth/createuser`,
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
              },
          );
          const json=await response.json();
            console.log(json);
            if(json.success){
                localStorage.setItem('token',json.token);
                navigate("/login");
                props.showAlert("Logged In Successfully","success");
            }
            else{
                props.showAlert("User already exists","danger");
            }    
      }
      const onChange = (e) => {
          setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    return (
    <div className="container">
      <form onSubmit={handleSubmit}>
                <h2>Signup to continue</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  required aria-describedby="emailHelp" minLength={5} placeholder="Enter email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">UserName</label>
                    <input type="text" className="form-control" id="name" name="name"  required aria-describedby="text" minLength={5} placeholder="Enter email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"id="password" required placeholder="Password" minLength={5} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword"id="cpassword" required placeholder="Confirm Password" minLength={5} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
