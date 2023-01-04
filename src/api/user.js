import Cookies from "js-cookie";
import { client } from "./client";

//プロフィール編集
export const updateUser = (id, data) => {
 return client.patch(`/users/${id}`, data, {
  headers: {
   "Content-Type": "multipart/form-data"
  }
 });
};

//初期セットアップ完了済にする
export const setUpUser = () => {
 return client.patch("/users/set_up", {}, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid")
  }
 });
};

//アカウント削除
export const deleteUser = (id) => {
 return client.delete(`/users/${id}`);
}

//ユーザー一覧取得
export const getUsers = () => {
 return client.get("/users", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid")
  }
 });
}

//ユーザー取得
export const getUser = async (id) => {
 const res = await client.get(`/users/${id}`)
 const userData = res.data.user
 userData.follows = res.data.follows
 userData.followers = res.data.followers
 return (
  { user: userData, status: res.status }
 );
};


//いいねした一覧取得
export const getLikes = (userId) => {
 return client.get(`/users/${userId}/likes`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid")
  }
 });
}


export const searchUsers = (data) => {
 return client.post("/users/search", data);
}
