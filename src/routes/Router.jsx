import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ResetPassword } from "../components/pages/ResetPassword";
import { NotFound } from "../components/pages/NotFound";
import { SignIn } from "../components/pages/SignIn";
import { PrivateRouter } from "./PrivateRouter";
import { Diary } from "../components/pages/Diary";
import { Users } from "../components/pages/Users"
import { Relations } from "../components/organisms/Relations";
import { LikingDiaries } from "../components/organisms/LikingDiaries";
import { Profile } from "../components/pages/Profile";
import { Comments } from "../components/pages/Commnets";
import { MessagesIndex } from "../components/pages/MessagesIndex";
import { Message } from "../components/pages/Message";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { SearchDiaries } from "../components/pages/SearchDiaries";
import { Notifications } from "../components/pages/Notifications";
import { About } from "../components/pages/About";
import { AdminUserPage } from "../components/pages/AdminUserPage";

export const Router = () => {
 const { currentUser } = useContext(AuthContext);
 return (
  <BrowserRouter>
   <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="password" element={<ResetPassword />} />
    <Route path="about" element={<About />} />
    <Route path="notfound" element={<NotFound />} />
    <Route path="/" element={<PrivateRouter />} >
     <Route index path="/" element={<Navigate to={`/${currentUser?.id}`} />} />
     <Route index path="/admin/:id" element={<AdminUserPage />} />
     <Route path="diaries" element={<Diary />} />
     <Route path="diaries/:id" element={<Comments />} />
     <Route path="messages" element={<MessagesIndex />} />
     <Route path="message/:id" element={<Message />} />
     <Route path="search/diaries" element={<SearchDiaries />} />
     <Route path="search/users" element={<Users />} />
     <Route path=":id" element={<Profile />}>
      <Route path="likes" element={<LikingDiaries />} />
     </Route>
     <Route path=":id/followings" element={<Relations />} />
     <Route path=":id/followers" element={<Relations />} />
     <Route path=":id/*" element={<NotFound />} />
     <Route path="notifications" element={<Notifications />} />
    </Route>

   </Routes>
  </BrowserRouter >
 );
}
