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
  const [socketDm , setSocketDm] = useState("ws://localhost:8002/chats/dm/chat");
  const [socketGroup , setSocketGroup] = useState("ws://localhost:8002/chats/dm/chat");
  const router = createBrowserRouter([
    {
      index: true,
      element: (
        <LoginPage
          setToken={setToken}
          setCurrentActiveUser={setCurrentActiveUser}
        />
      ),
    },
    {
      index: true,
      path: "/home",
      element: (
        <>
          <Header />
          <HomePage />,
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

            />
          ),
        },
        {
          path: "/chat/user-profile",
          element: (
            <UserProfile
              chatSetterFunction={setChatDisplayed}
              currentActiveUser={currentActiveUser}
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
            />
          ),
        },
        {
          path: "/chat/new-chat",
          element: <NewChat currentActiveUser={currentActiveUser} />,
        },
      ],
    },
    {
      path: "/trends",
      element: (
        <>
          <Header />
          <TrendsPage />,
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
      element: <SignUpPage />,
    },
  ]);
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
