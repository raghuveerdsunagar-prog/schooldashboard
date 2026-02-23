import React from "react";
import { useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import "./Admin.css"

function Adminlogin(updaterole){


    const [formdata,setformdata]=useState({email:"",password:""});
    const navigate=useNavigate();





    const datahandler=(e)=>{
        const {name,value}=e.target;
        setformdata((prevData)=>({
            ...prevData,
            [name]:value
        }));
    };

      console.log(formdata)
  const submithandler = async (e) => {
  e.preventDefault();
  
  let response = await fetch("http://localhost:3001/adminlogin", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata)
  });
  let result = await response.json();

  if (response.status == 200) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.role);
    
    // ✅ FIXED: Make optional
    if (updaterole && typeof updaterole === 'function') {
      updaterole(result.role);
    }
    
    navigate('/');
  } else {
    alert(result.message);
  }
}


return(

            <div className="container">
                        
                        <div className="Card">
                                   <h2 className='cards'>Admin Login</h2>
<form onSubmit={submithandler} noValidate>  {/* Add noValidate */}
    <div className="input">
        <input
            type="email"
            className="admin-email"
            name="email"
            value={formdata.email} 
            onChange={datahandler}
            required
        />
    </div>
    <div className="input">
        <input
            type="password"
            className="admin-password"
            name="password"
            value={formdata.password} 
            onChange={datahandler}
            required
        />
    </div>
    <button 
        type="submit" 
        className="submitbtn"
        disabled={!formdata.email || !formdata.password} 
    >
        Login
    </button>
</form>


                        </div>




            </div>






)



    
}


export default Adminlogin;