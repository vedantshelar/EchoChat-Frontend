import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {connectSocket} from "../connectSocket";

function LoginPage() {
    let [formData,setFormData] = useState({username:"",password:""});
    let navigate = useNavigate();

    function handleInput(event){
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((currFormData)=>{
            return {...currFormData,[fieldName]:fieldValue};
        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        let response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`,formData,{withCredentials:true});
        if(response.data.success){
            connectSocket();
            getTokenData();
        }else{
            alert(response.data.error);
        }
        setFormData({username:"",password:""});
    }

    async function getTokenData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/tokenData`,{withCredentials:true});
        if(response.data.userId){
            navigate(`/home/${response.data.userId}`);
        }
    }

    useEffect(()=>{
        getTokenData();
    })
    return (
        <form onSubmit={handleSubmit} style={{ boxShadow: "0px 10px 5px rgba(235, 235, 235, 0.62)", padding: "20px", borderRadius: "5px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ marginBottom: "15px" }}>Login</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInput}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleInput}/>
            </div>
            <NavLink to={"/register"} className="mb-3" style={{color:"black"}}>Register</NavLink>
            <button type="submit" className="btn btn-dark" style={{ width: "150px", alignSelf: "flex-end" }}>Login</button>
        </form>
    );
}

export default LoginPage;