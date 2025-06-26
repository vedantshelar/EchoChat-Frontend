import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import Navbar from "./components/Navbar";
import GroupsPage from "./groups/GroupsPage";
import ViewMembersPage from "./viewMembers/ViewMembersPage"; 
import GroupRequestPage from "./groupRequest/GroupRequestPage";
import CreateGroup from "./createGroup/CreateGroup";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import ChatWindow from "./chat/ChatWindow";
import GroupChatWindow from "./chat/GroupChatWindow";
import { useState,useEffect } from "react";
import axios from "axios";
import useGeneralContext from "./useGeneralContext";

function App() {
  let [currUser,setCurrUser] = useState(null);
  let {refresh,setRefresh} = useGeneralContext();
  async function getCurrUser() {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getCurrentUserData`,{withCredentials:true});
    if(!response.data.error){
      setCurrUser(response.data);
    }
  }

  useEffect(()=>{
    getCurrUser();
    setRefresh(!refresh);
  },[]);

  useEffect(()=>{
    getCurrUser();
  },[refresh]);
  return (
    <BrowserRouter>
      <div id={styles.appMainContainer}>
        {currUser!==null && <Navbar currUser={currUser}/>}
        <div id={styles.appContainer}> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home/:userId" element={<HomePage />} />
            <Route path="/group/create" element={<CreateGroup />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/requests" element={<GroupRequestPage />} />
            <Route path="/groups/members/:groupId" element={<ViewMembersPage />} />
            <Route path="/chat/:senderId/:receiverId" element={<ChatWindow />} />
            <Route path="/chat/group/:groupId/:senderId" element={<GroupChatWindow />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;