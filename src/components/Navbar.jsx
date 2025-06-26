import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import axios from "axios";
import { getSocket } from "../connectSocket";
import useGeneralContext from "../useGeneralContext";
function Navbar({ currUser }) {
    let [isNavOpen, setIsNavOpen] = useState(true);
    let navigate = useNavigate();
    let { refresh, setRefresh } = useGeneralContext();
    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }
    async function handleLogout() {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/logout`, { withCredentials: true });
        if (response.data.success) {
            let socket = getSocket();
            if (socket !== null) {
                socket.disconnect();
            }
            setRefresh(!refresh);
            navigate("/");
        } else {
            alert("Error Occured While Log out!");
        }
    }
    return (
        <div id={styles.navbarMainContainer}>
            <div id={styles.navbarNameContainer}>
                <p>{currUser.username}</p>
            </div>
            <div id={styles.navbarItemsContainer} style={{ display: isNavOpen ? "flex" : "none" }}>
                <div>
                    <NavLink className={styles.navItems} to={"/"} >Home</NavLink>
                    <NavLink className={styles.navItems} to={"/groups"} >Groups</NavLink>
                    <NavLink className={styles.navItems} to={"/groups/requests"} >Groups Requests</NavLink>
                    <NavLink className={styles.navItems} to={"/group/create"} >Create Group</NavLink>
                </div>
                <div>
                    <button id={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div id={styles.navControls}>
                <i id={styles.bar} className="fa-solid fa-bars-staggered" onClick={toggleNav} style={{ display: isNavOpen ? "none" : "block" }}></i>
                <i id={styles.cross} className="fa-solid fa-xmark" onClick={toggleNav} style={{ display: isNavOpen ? "block" : "none" }}></i>
            </div>
        </div>
    );
}

export default Navbar;