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

const router = createBrowserRouter([
  {
    index: true,
    element: <LoginPage />,
  },
  {
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
        <ChatPage />,
      </>
    ),
    children: [
      {
        index: true,
        element: <DMList />,
      },
      {
        path: "/chat/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/chat/group-page",
        element: <Groups />,
      },
    ],
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
]);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
