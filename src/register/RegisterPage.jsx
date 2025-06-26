import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { connectSocket } from "../connectSocket";

function RegisterPage() {
    let [formData, setFormData] = useState({ username: "", phone: "", password: "" });
    let navigate = useNavigate();

    function handleInput(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((currFormData) => {
            return { ...currFormData, [fieldName]: fieldValue };
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if(!formData.username.trim().includes(" ") && formData.phone.length===10 && formData.password.length>0){
            let response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, formData, { withCredentials: true });
            if (response.data.success) {
                connectSocket();
                getTokenData();
            } else {
                alert("Error Occured During Registration!");
            }
            setFormData({ username: "", phone: "", password: "" });
        }else{
            alert("Username should not contain space");
            setFormData({ username: "", phone: "", password: "" });
        }
    }

    async function getTokenData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/tokenData`, { withCredentials: true });
        if (response.data.userId) {
            navigate(`/home/${response.data.userId}`);
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{ boxShadow: "0px 10px 5px rgba(235, 235, 235, 0.62)", padding: "20px", borderRadius: "5px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ marginBottom: "15px" }}>Register</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInput} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleInput} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleInput} />
            </div>
            <NavLink to={"/"} className="mb-3" style={{ color: "black" }}>Login</NavLink>
            <button type="submit" className="btn btn-dark" style={{ width: "150px", alignSelf: "flex-end" }}>Register</button>
        </form>
    );
}

export default RegisterPage;