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
  const [isLogin, setIsLogin] = useState(false);
  const [chatDisplayed, setChatDisplayed] = useState([]);
  const [selectedChat, setSelectedChat] = useState({
    chatType: "",
    Name: "",
  });
  const [token, setToken] = useState("");
  const [currentActiveUser, setCurrentActiveUser] = useState("");
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
            chatToDisplay={chatDisplayed}
            chatSelected={selectedChat}
            chatSelectionFunction={setSelectedChat}
            chatSetterFunction={setChatDisplayed}
            token={token}
            setCurrentActiveUser={setCurrentActiveUser}
          />
          ,
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <DMList
              chatToDisplay={chatDisplayed}
              chatSetterFunction={setChatDisplayed}
              chatSelectionFunction={setSelectedChat}
              currentActiveUser={currentActiveUser}
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
              chatSetterFunction={setChatDisplayed}
              chatSelectionFunction={setSelectedChat}
            />
          ),
        },
        {
          path: "/chat/new-chat",
          element: <NewChat />,
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
