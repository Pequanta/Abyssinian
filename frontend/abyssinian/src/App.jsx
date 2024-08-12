import React, { useState } from "react";
import Header from "./Components/Header.jsx";
import "./index.css";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import WebDescription from "./Components/WebDiscription/WebDescription.jsx";
import ChatPage from "./Components/ChatPage/ChatPage.jsx";
import SignUpPage from "./Components/SignUp/SignUp.jsx";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginPage />,
//   },
//   {
//     path: "home",
//     element: (
//       <>
//         <Header />
//         <WebDescription />,
//       </>
//     ),
//   },
//   {
//     path: "chat",
//     element: (
//       <>
//         <Header />
//         <ChatPage />,
//       </>
//     ),
//   },
//   {
//     path: "signup",
//     element: <SignUpPage />,
//   },
// ]);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="container">
      <Header />
      <WebDescription />
    </div>
  );
}

export default App;
