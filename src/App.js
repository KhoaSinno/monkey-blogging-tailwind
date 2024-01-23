import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import BlogPage from "pages/BlogPage";
import ProfilePage from "pages/ProfilePage";

const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const HomePage = React.lazy(() => import("pages/HomePage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));
const DashboardLayout = React.lazy(() => import("Module/dashboard/DashboardLayout"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const PostManage = React.lazy(() => import("Module/Post/PostManage"));
const PostAddNew = React.lazy(() => import("Module/Post/PostAddNew"));
const PostUpdate = React.lazy(() => import("Module/Post/PostUpdate"));
const CategoryAddNew = React.lazy(() => import("Module/category/CategoryAddNew"));
const CategoryManage = React.lazy(() => import("Module/category/CategoryManage"));
const CategoryUpdate = React.lazy(() => import("Module/category/CategoryUpdate"));
const UserManage = React.lazy(() => import("Module/user/UserManage"));
const UserAddNew = React.lazy(() => import("Module/user/UserAddNew"));
const UserUpdate = React.lazy(() => import("Module/user/UserUpdate"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const UserPage = React.lazy(() => import("pages/UserPage"));

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

            <Route
              path="/blog"
              element={<BlogPage></BlogPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<UserPage></UserPage>}
            ></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/profile/:id"
                element={<ProfilePage></ProfilePage>}
              ></Route>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              {/* 
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route> */}
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
