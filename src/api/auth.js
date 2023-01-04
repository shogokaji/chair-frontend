import { client } from "./client";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

// サインアップ
export const signUp = (params) => {
 return client.post("/auth", params);
};

// サインイン
export const signIn = (params) => {
 return client.post("/auth/sign_in", params);
};

//ゲストサインイン
export const gestSignIn = () => {
 return client.post("/auth/guest_sign_in");
}

// サインアウト
export const signOut = () => {
 return client.delete("/auth/sign_out", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
};

//パスワードリセット
export const resetPassword = (params) => {
 return client.post("/auth/password", params);
};

export const createNewPassword = (params) => {
 return client.put("/auth/password", params, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}

export const getCurrentUser = async () => {
 if (
  !Cookies.get("_access_token") ||
  !Cookies.get("_client") ||
  !Cookies.get("_uid")
 )
  return console.log("ログインユーザーは存在しません。");

 const res = await client.get("/auth/sessions", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid"),
  },
 })

 const userData = res.data.currentUser
 userData.follows = res.data.follows
 userData.followers = res.data.followers
 userData.notification = res.data.notification
 return (
  { user: userData, status: res.status }
 )
};

