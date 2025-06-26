import { io } from "socket.io-client";

let socket = null;

function connectSocket(){
    socket = io(`${process.env.REACT_APP_SERVER_URL}`, { withCredentials: true });
}

function getSocket(){
    return socket;
}

export {connectSocket,getSocket};