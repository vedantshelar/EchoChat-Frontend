import ViewMembers from "./ViewMembers";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewMembersPage() {
    let params = useParams();
    let [refresh, setRefresh] = useState(false);
    let [group, setGroup] = useState(null);
    let [members, setMembers] = useState([]);


    async function getGroupDataById() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/${params.groupId}`, { withCredentials: true });
        if (!response.data.error) {
            setGroup(response.data);
            setMembers(response.data.members);
        }
    }

    useEffect(() => {
        getGroupDataById();
    }, []);

    useEffect(() => {
        getGroupDataById();
    }, [refresh]);
    return (
        <div>
            <h3>Members</h3>
            {members.length === 0 ? <h4>No Member Added To This Group</h4> :
                members.map((member, indx) => {
                    return (<ViewMembers key={indx} member={member} groupOwner={group.createdBy} groupId={group._id} setRefresh={setRefresh} />)
                })
            }
        </div>
    );
}

export default ViewMembersPage;