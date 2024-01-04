import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

// const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const HomePage = React.lazy(() => import("pages/HomePage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));

function App() {
  return (
    <div className="monkey-blogging-App">
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
