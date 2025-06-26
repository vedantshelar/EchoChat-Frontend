import { useState, useEffect } from "react";
import styles from "./Usercard.module.css";
import axios from "axios";

function AcceptRejectCard({ userId, groupId, getAllGroups }) {
    let [user, setUser] = useState(null);
    let [group, setGroup] = useState(null);
    async function getUserData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`, { withCredentials: true });
        if (!response.data.error) {
            setUser(response.data);
        }
    }

    async function getGroupData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/${groupId}`, { withCredentials: true });
        if (!response.data.error) {
            setGroup(response.data);
        }
    }

    async function handleAcceptRequest() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/accept/request/${groupId}/${userId}`, { withCredentials: true });
        if (response.data.error) {
            alert("Cloud not accept request accept, please try it again!");
        } else {
            getAllGroups();
        }
    }

    async function handleRejectRequest() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/reject/request/${groupId}/${userId}`, { withCredentials: true });
        if (response.data.error) {
            alert("Cloud not reject request accept, please try it again!");
        } else {
            getAllGroups();
        }
    }

    useEffect(() => {
        getUserData();
        getGroupData();
    }, []);
    return (
        <div className={styles.userCardMainContainer}>
            <div className={styles.userCardInfoContainer}>
                <span className={styles.username}>{user !== null && user.username}</span>
                <span style={{ paddingLeft: "5px" }}>{group !== null && group.name}</span>
            </div>
            <div className={styles.userCardBtnContainer}>
                <button className={styles.chatBtn} style={{ marginRight: "20px", backgroundColor: "green" }} onClick={handleAcceptRequest}>Accept</button>
                <button className={styles.chatBtn} style={{ backgroundColor: "darkred" }} onClick={handleRejectRequest}>Reject</button>
            </div>
        </div>
    );
}

export default AcceptRejectCard;