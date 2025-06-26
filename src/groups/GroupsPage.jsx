import GroupCard from "../components/GroupCard";
import GroupRequestCard from "../components/GroupRequestCard";
import styles from "./GroupsPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";


function GroupsPage() {
    let [currUser, setCurrUser] = useState(null);
    let [groups, setGroups] = useState([]);
    let [refresh, setRefresh] = useState(false);

    async function getCurrUser() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getCurrentUserData`, { withCredentials: true });
        setCurrUser(response.data);
    }
    async function getAllGroups() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/all`, { withCredentials: true });
        setGroups(response.data);
    }

    function getYourAssociatedGroups() {
        let array = [];
        if (currUser !== null) {
            array = groups.filter((group) => {
                if (group.createdBy === currUser._id || group.members.includes(currUser._id)) {
                    return true;
                }else{
                    return false;
                }
                // if (group.members.includes(currUser._id)) {
                //     return true;
                // }
            })
        }
        return array;
    }

    useEffect(() => {
        getCurrUser();
        getAllGroups();
    }, [])

    useEffect(() => {
        getAllGroups();
    }, [refresh]);

    if (currUser !== null) {
        return (
            <div id={styles.groupsPageMainContainer}>
                <h3 id={styles.headingOne}>Your Groups</h3>
                <div>
                    {getYourAssociatedGroups().length === 0 ? (<h4>you are not in any group</h4>) :
                        (
                            getYourAssociatedGroups().map((group, indx) => {
                                return (<GroupCard key={indx} group={group} currUser={currUser} setRefresh={setRefresh} />)
                            })
                        )}
                </div>
                <h3 id={styles.headingTwo}>Others Groups</h3>
                <div>
                    {groups.length === 0 ? (
                        <h4>No Groups Created</h4>
                    ) : (
                        groups.map((group) => {
                            if (
                                group.members.includes(currUser._id) ||
                                group.createdBy === currUser._id
                            ) {
                                return null;
                            } else {
                                return (
                                    <GroupRequestCard
                                        key={group._id}
                                        group={group}
                                        userId={currUser._id}
                                    />
                                );
                            }
                        })
                    )}
                </div>
            </div>
        );
    } else {
        <h1>Loading...</h1>
    }
}

export default GroupsPage;