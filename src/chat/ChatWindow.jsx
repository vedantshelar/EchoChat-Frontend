import { useEffect, useRef, useState } from "react";
import styles from "./ChatWindow.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, getSocket } from "../connectSocket";
import axios from "axios";

function ChatWindow() {
    let socket = useRef(null);
    let bottomRef = useRef(null);
    let navigate = useNavigate();
    let params = useParams();
    let [receiver, setReceiver] = useState(null);
    let [message, setMessage] = useState("");
    let [messages, setMessages] = useState([]);

    function goToBack() {
        navigate(-1);
    }

    function sendMessage() {
        let senderId = params.senderId;
        let receiverId = params.receiverId;
        if(message.length!==0){
            socket.current.emit("private-message", { from: senderId, to: receiverId, content: message });
            getMessages();
            setMessage("");
        }
    }

    async function getMessages() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/chat/${params.senderId}/${params.receiverId}`, { withCredentials: true });
        if (response.data.error) {
            alert("Error Occured While Fecthing Stored Messages");
        } else {
            setMessages(response.data);
        }
    }

    async function getReceiverData() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getReceiverData/${params.receiverId}`, { withCredentials: true });
        setReceiver(response.data);
    }

    useEffect(() => {
        getReceiverData();
        getMessages();
        connectSocket();
        socket.current = getSocket();
        if (socket.current !== null) {
            socket.current.on("receive-private-message", (content) => {
                getMessages();
            })
        }
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
                    <span className={styles.username}>{receiver !== null && receiver.username}</span>
                    {receiver !== null && receiver.isOnline ? <span className={styles.online}><i className="fa-regular fa-circle-dot"></i> Online</span> : <span className={styles.offline}><i className="fa-regular fa-circle-dot"></i> Offline</span>}
                </div>
            </div>
            <div id={styles.chatsContainer}>
                <div id={styles.chats}>
                    {messages.length !== 0 && messages.map((msg, index) => {
                        return (
                            msg.sender === params.senderId ? (
                                <div key={index} className={styles.senderMessageContainer}>
                                    <span className={styles.senderMessage}>{msg.content}</span>
                                </div>
                            ) : (
                                <div key={index} className={styles.receiverMessageContainer}>
                                    <span className={styles.receiverMessage}>{msg.content}</span>
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

export default ChatWindow;