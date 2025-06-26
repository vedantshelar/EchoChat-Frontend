import styles from "../components/Usercard.module.css";
import axios from "axios";

function ViewMembers({ member, groupOwner, groupId, setRefresh }) {

    async function removeMember() {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/group/${groupId}/${member._id}`, { withCredentials: true });
        console.log(response.data)
        if (response.data.error) {
            alert("could not remove member , please try again!");
        } else {
            setRefresh((refresh) => {
                return !refresh;
            })
            console.log(response.data.success);
        }
    }
    return (
        <div className={styles.userCardMainContainer}>
            <div className={styles.userCardInfoContainer}>
                <span className={styles.username}>{member.username}</span>
            </div>
            <div className={styles.userCardBtnContainer}>
                {member._id === groupOwner ? <button className={styles.chatBtn} style={{ backgroundColor: "green" }}>Owner</button> : <button className={styles.chatBtn} style={{ backgroundColor: "darkred" }} onClick={removeMember}>Remove</button>}
            </div>
        </div>
    );
}

export default ViewMembers; 