import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignInPage from "pages/SignInPage";

// const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));

function App() {
  return (
    <div className="monkey-blogging-App">
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
