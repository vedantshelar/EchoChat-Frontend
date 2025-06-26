import { useEffect, useRef, useState } from "react";
import styles from "./ChatWindow.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, getSocket } from "../connectSocket";
import axios from "axios";

function GroupChatWindow() {
    let socket = useRef(null);
    let bottomRef = useRef(null);
    let navigate = useNavigate();
    let params = useParams();
    let [group, setGroup] = useState(null);
    let [message, setMessage] = useState("");
    let [messages, setMessages] = useState([]);

    function goToBack() {
        navigate(-1);
    }

    function sendMessage() {
        let senderId = params.senderId;
        let groupId = params.groupId;
        let count = 0;
        if (message.length !== 0) {
            for (let member of group.members) {
                if (member._id !== senderId) {
                    socket.current.emit("private-message", { from: senderId, to: member._id, content: message, groupId: groupId, count: count });
                    count = count + 1;
                }
            }
        }
        setMessage("");
        getMessages();
    }

    async function getMessages() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/chat/${params.groupId}/${params.senderId}`, { withCredentials: true });
        if (response.data.error) {
            alert("Error Occured While Fecthing Stored Messages");
        } else {
            setMessages(response.data);
        }
    }

    async function getGroupData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/group/${params.groupId}`, { withCredentials: true });
        setGroup(response.data);
    }

    useEffect(() => {
        getGroupData();
        getMessages();
        connectSocket();
        socket.current = getSocket();
        socket.current.on("connect", () => {
            socket.current.on("receive-private-message", (content) => {
                getMessages();
            })
        });
    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return (
        <div id={styles.chatWindowMainContainer}>
            <div id={styles.userInfo}>
                <i onClick={goToBack} className="fa-solid fa-arrow-left-long"></i>
                <div id={styles.userNameContainer}>
                    <span className={styles.username}>{group !== null && group.name}</span>
                </div>
            </div>
            <div id={styles.chatsContainer}>
                <div id={styles.chats}>
                    {messages.length !== 0 && messages.map((msg, index) => {
                        return (
                            msg.sender._id === params.senderId ? (
                                <div key={index} className={styles.senderMessageContainer}>
                                    <span className={styles.senderMessage}>{msg.content}</span>
                                </div>
                            ) : (
                                <div key={index} className={styles.receiverMessageContainer}>
                                    <span className={styles.receiverMessage}>{msg.sender.username} : {msg.content}</span>
                                </div>
                            )
                        );
                    })}
                    <div ref={bottomRef}></div>
                </div>
                <div id={styles.sendMessageContainer}>
                    <input type="text" name="message" placeholder="Type message here.." value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                </div>
            </div>
        </div>
    );
}

export default GroupChatWindow;