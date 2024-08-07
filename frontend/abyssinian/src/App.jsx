import "./index.css";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import WebDescription from "./Components/WebDiscription/WebDescription.jsx";
import ChatPage from "./Components/ChatPage/ChatPage.jsx";
import React, { useState } from "react";
import Header from "./Components/Header.jsx";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebDescription />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
]);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="container">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
