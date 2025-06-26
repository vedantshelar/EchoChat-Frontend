import Searchbar from "../components/Searchbar";
import Usercard from "../components/Usercard";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import useGeneralContext from "../useGeneralContext";

function HomePage() {
    let [searchValue, setSearchValue] = useState("");
    let [users, setUsers] = useState([]);
    let params = useParams();
    let { refresh, setRefresh } = useGeneralContext();
    const userId = useRef(params.userId);
    //userId.current

    async function getAllUsers() {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${userId.current}/all`, { withCredentials: true });
        if (response.data.error) {
            alert('Error Occured During Fecthing User Data!');
        } else {
            setUsers(response.data);
        }
    }

    useEffect(() => {
        getAllUsers();
        setRefresh(!refresh);
    }, []);
    return (
        <div>
            <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
            {users.length !== 0 &&
                users.map((user) =>
                    user.username.includes(searchValue) ? (
                        <Usercard
                            key={user._id}
                            username={user.username}
                            isOnline={user.isOnline}
                            senderId={userId.current}
                            receiverId={user._id}
                        />
                    ) : null
                )}

        </div>
    );
}

export default HomePage;