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
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [chatDisplayed, setChatDisplayed] = useState();
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
          <ChatPage chatToDisplay={chatDisplayed} />,
        </>
      ),
      children: [
        {
          index: true,
          element: <DMList chatSetterFunction={setChatDisplayed} />,
        },
        {
          path: "/chat/user-profile",
          element: <UserProfile chatSetterFunction={setChatDisplayed} />,
        },
        {
          path: "/chat/group-page",
          element: <Groups chatSetterFunction={setChatDisplayed} />,
        },
      ],
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
