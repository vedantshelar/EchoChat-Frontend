import AcceptRejectCard from "../components/AcceptRejectCard";
import { useState, useEffect } from "react";
import axios from "axios";

function GroupRequestPage() {
    let [pendingRequests, setPendingRequests] = useState([]);
    let [currUser,setCurrUser] = useState(null);

    async function getAllGroups() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/all`, { withCredentials: true });
        const response1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getCurrentUserData`, { withCredentials: true });
        let groups = response.data;
        let user = response1.data;
        setCurrUser(response.data);
        getPendingRequest(groups, user);
    }

    function getPendingRequest(groups, user) {
        const pendingRequestArray = [];
        for (let group of groups) {
            if (group.createdBy === user._id) {
                for (let pendingRequest of group.pendingRequests) {
                    pendingRequestArray.push({ groupId: group._id, userId: pendingRequest });
                }
            }
        }
        setPendingRequests(pendingRequestArray);
    }

    useEffect(() => {
        getAllGroups();
    }, [])

    return (
        <div>
            <h3>Users requests</h3>
            {pendingRequests.length === 0 ? <h4>No Pending Requets</h4> :
                pendingRequests.map((pendingRequest, indx) => {
                    return (<AcceptRejectCard key={indx} userId={pendingRequest.userId} groupId={pendingRequest.groupId} getAllGroups={getAllGroups} />)
                })
            }
        </div>
    );
}

export default GroupRequestPage;