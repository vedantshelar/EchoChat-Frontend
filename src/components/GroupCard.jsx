import styles from "./Usercard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GroupCard({ group, currUser, setRefresh }) {
    let navigate = useNavigate();

    async function deleteGroup() {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/group/destroy/${group._id}`, { withCredentials: true });
        if (response.data.error) {
            alert("Error Occured While Deleting Group!");
        } else {
            setRefresh((refresh) => {
                return !refresh;
            })
            alert(response.data.success);
        }
    }

    function goToViewMembersPage() {
        navigate(`/groups/members/${group._id}`)
    }

    function goToChatWindow() {
        navigate(`/chat/group/${group._id}/${currUser._id}`);
    }
    return (
        <div className={styles.userCardMainContainer}>
            <div className={styles.userCardInfoContainer}>
                <span className={styles.username}>{group.name}</span>
            </div>
            <div className={styles.userCardBtnContainer}>
                {group.createdBy === currUser._id && <button className={styles.chatBtn} style={{ marginRight: "20px", backgroundColor: "darkred" }} onClick={deleteGroup}>Delete Group</button>}
                {group.createdBy === currUser._id && <button className={styles.chatBtn} style={{ marginRight: "20px" }} onClick={goToViewMembersPage}>View Members</button>}
                <button className={styles.chatBtn} onClick={goToChatWindow}>Chat</button>
            </div>
        </div>
    );
}

export default GroupCard;