import styles from "./Usercard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function GroupRequestCard({ group, userId }) {
    let [isPendingRequest, setIsPendingRequest] = useState(false);
    function isRequestedToGroup() {
        if (group.pendingRequests.includes(userId)) {
            setIsPendingRequest(true);
        } else {
            setIsPendingRequest(false);
        }
    }

    async function makeRequestToGroup() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/request/${group._id}/${userId}`);
        if (response.data.success) {
            setIsPendingRequest(true);
        } else {
            alert("Error Occured While Making Request!");
        }
    }

    useEffect(() => {
        isRequestedToGroup();
    }, []);
    return (
        <div className={styles.userCardMainContainer}>
            <div className={styles.userCardInfoContainer}>
                <span className={styles.username}>{group.name}</span>
            </div>
            <div className={styles.userCardBtnContainer}>
                {isPendingRequest ? <button style={{ backgroundColor: "green" }} className={styles.chatBtn}>Pending...</button> : <button className={styles.chatBtn} onClick={makeRequestToGroup}>Request</button>}
            </div>
        </div>
    );
}

export default GroupRequestCard;