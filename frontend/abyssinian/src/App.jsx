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
import VlogsPage from "./Components/TrendPage/TrendsPage.jsx";
import AboutPage from "./Components/AboutPage/AboutPage.jsx";
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
  const router = createBrowserRouter([
    {
      index: true,
      element: <LoginPage />,
    },
    {
      index: true,
      path: "/home",
      element: (
        <>
          <Header />
          <WebDescription />,
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
            />
          ),
        },
        {
          path: "/chat/user-profile",
          element: <UserProfile chatSetterFunction={setChatDisplayed} />,
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
      ],
    },
    {
      path: "/trends",
      element: (
        <>
          <Header />
          <VlogsPage />,
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Header />
          <AboutPage />,
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
