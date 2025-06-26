import { useNavigate } from "react-router-dom";
import styles from "./Usercard.module.css";

function Usercard({ username, isOnline, senderId, receiverId }) {
    let navigate = useNavigate();

    function navigateToChat() {
        navigate(`/chat/${senderId}/${receiverId}`);
    }
    return (
        <div className={styles.userCardMainContainer}>
            <div className={styles.userCardInfoContainer}>
                <span className={styles.username}>{username}</span>
                {isOnline ? <span className={styles.online}><i className="fa-regular fa-circle-dot"></i> Online</span> : <span className={styles.offline}><i className="fa-regular fa-circle-dot"></i> Offline</span>}
            </div>
            <div className={styles.userCardBtnContainer}>
                <button className={styles.chatBtn} onClick={navigateToChat}>Chat</button>
            </div>
        </div>
    );
}

export default Usercard;