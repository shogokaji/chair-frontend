import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDiary } from "../api/diary";
import { getCurrentUser } from "../api/auth";
import { AuthContext } from "../providers/AuthProvider";
import { DiaryContext } from "../providers/DiaryProvider";
import { HomeLayout } from "../components/templates/HomeLayout";
import { AlertContext } from "../providers/AlertProvider";

export const PrivateRouter = () => {
 const {
  setCurrentUser,
  loading,
  setLoading,
  isSignedIn,
  setIsSignedIn
 } = useContext(AuthContext);

 const { setMyDiaries } = useContext(DiaryContext);
 const { isOpenSuccess, isOpenError, setIsOpenError, setIsOpenSuccess } = useContext(AlertContext);

 const handleGetCurrentUser = async () => {
  try {
   const res = await getCurrentUser();
   if (res?.status === 200) {
    setIsSignedIn(true);
    setCurrentUser(res.user);
    await handleGetMyDiary(res.user.id);
   } else {
    console.log("ログイン中のユーザーは存在しません");
   }
  } catch (err) {
   console.log(err);
  }
  setLoading(false);
 };

 const handleGetMyDiary = async (id) => {
  try {
   const res = await getDiary(id);
   setMyDiaries(res.data.diaries);
  } catch (err) {
   console.log(err);
  }
 }

 useEffect(() => {
  handleGetCurrentUser();
 }, []);

 useEffect(() => {
  setTimeout(() => {
   setIsOpenError(false);
   setIsOpenSuccess(false);
  }, 3000);
 }, [isOpenSuccess, isOpenError]);

 if (!loading) {
  if (isSignedIn) {
   return (
    <HomeLayout>
     <Outlet />
    </HomeLayout>
   );
  } else {
   return <Navigate to="/signin" />;
  }
 } else {
  return <></>;
 }
};
