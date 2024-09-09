import React, { useState } from "react";
import Header from "./Components/Header.jsx";
import "./index.css";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import WebDescription from "./Components/WebDiscription/WebDescription.jsx";
import ChatPage from "./Components/ChatPage/ChatPage.jsx";
import SignUpPage from "./Components/SignUp/SignUp.jsx";
import DMList from "./Components/ChatPage/DMList.jsx";
import UserProfile from "./Components/ChatPage/UserProfile.jsx";
import Groups from "./Components/ChatPage/Groups.jsx";
import TrendsPage from "./Components/TrendPage/TrendsPage.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import NewChat from "./Components/ChatPage/NewChat.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [chatDisplayed, setChatDisplayed] = useState([]);
  const [selectedChat, setSelectedChat] = useState({
    chatType: "",
    Name: "",
    roomId:"",
  });
  const [token, setToken] = useState("");
  const [currentActiveUser, setCurrentActiveUser] = useState("");
  const [socketDm , setSocketDm] = useState();
  const [socketGroup , setSocketGroup] = useState();
  const [roomId , setRoomId] = useState("66d8a16a234e6417886c9eba")
  const [backendHttpUrl, setBackendHttpUrl] = useState(import.meta.env.VITE_BACKEND_URL)
  const [backendWebSocketUrl, setBackendWebSocketUrl] = useState(process.env.REACT_APP_BACKEND_WEBSOCKET_URL || "ws://localhost:8002")
  const router = createBrowserRouter([
    {
      index: true,
      element: (
        <LoginPage
          setToken={setToken}
          setCurrentActiveUser={setCurrentActiveUser}
          backendHttpUrl={backendHttpUrl}
        />
      ),
    },
    {
      index: true,
      path: "/home",
      element: (
        <>
          <Header />
          <HomePage backendHttpUrl={backendHttpUrl}/>,
        </>
      ),
    },
    {
      path: "/chat",
      element: (
        <>
          <Header />
          <ChatPage
            chatDisplayed={chatDisplayed}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setChatDisplayed={setChatDisplayed}
            token={token}
            setCurrentActiveUser={setCurrentActiveUser}
            currentActiveUser={currentActiveUser}
            socketDm={socketDm}
            socketGroup={socketGroup}
            setSocketDm={setSocketDm}
            setSocketGroup={setSocketGroup}
            roomId={roomId}
            backendHttpUrl={backendHttpUrl}
            backendWebSocketUrl={backendWebSocketUrl}
          />
          ,
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <DMList
              chatDisplayed={chatDisplayed}
              setChatDisplayed={setChatDisplayed}
              setSelectedChat={setSelectedChat}
              currentActiveUser={currentActiveUser}
              setSocketDm={setSocketDm}
              socketDm={socketDm}
              setRoomId={setRoomId}
              backendHttpUrl={backendHttpUrl}
              backendWebSocketUrl={backendWebSocketUrl}

            />
          ),
        },
        {
          path: "/chat/user-profile",
          element: (
            <UserProfile
              chatSetterFunction={setChatDisplayed}
              currentActiveUser={currentActiveUser}
              backendHttpUrl={backendHttpUrl}
            />
          ),
        },
        {
          path: "/chat/group-page",
          element: (
            <Groups
              setChatDisplayed={setChatDisplayed}
              setSelectedChat={setSelectedChat}
              currentActiveUser={currentActiveUser}
              socketGroup={socketGroup}
              setSocketGroup={setSocketGroup}
              setRoomId={setRoomId}
              backendHttpUrl={backendHttpUrl}
              backendWebSocketUrl={backendWebSocketUrl}

            />
          ),
        },
        {
          path: "/chat/new-chat",
          element: <NewChat currentActiveUser={currentActiveUser} backendHttpUrl={backendHttpUrl}/>,
        },
      ],
    },
    {
      path: "/trends",
      element: (
        <>
          <Header />
          <TrendsPage currentActiveUser={currentActiveUser} backendHttpUrl={backendHttpUrl}/>,
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Header />
          <WebDescription />,
        </>
      ),
    },
    {
      path: "signup",
      element: <SignUpPage backendHttpUrl={backendHttpUrl}/>,
    },
  ]);
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
