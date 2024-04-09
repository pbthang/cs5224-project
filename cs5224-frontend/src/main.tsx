import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/Layout";
import { LandingPage } from "./pages/LandingPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GenerationPage from "./pages/GenerationPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import PreviewPage from "./pages/PreviewPage.tsx";
import PreviewLayout from "./layouts/PreviewLayout.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {
        element: <ProtectedLayout />,
        path: "/",
        children: [
          { path: "/generate", element: <GenerationPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <PreviewLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [{ path: "/preview", element: <PreviewPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
