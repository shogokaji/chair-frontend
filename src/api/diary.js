import Cookies from "js-cookie";
import { client } from "./client";

//日記作成
export const createDiary = (data) => {
 return client.post("/diaries", data, {
  headers: {
   "Content-Type": "multipart/form-data",
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
};

//userIdの日記一覧取得
export const getDiary = (userId) => {
 return client.get(`diaries/${userId}`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
};

//削除
export const deleteDiary = (diaryId) => {
 return client.delete(`diaries/${diaryId}`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}

//編集
export const updateDiary = (id, data) => {
 return client.patch(`diaries/${id}`, data, {
  headers: {
   "Content-Type": "multipart/form-data",
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}

//自分以外のユーザーの日記一覧を取得
export const indexDiary = () => {
 return client.get("diaries", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}

//フォロー中のユーザーの日記取得
export const getRelationalDiary = () => {
 return client.get("diaries/relational_diaries", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}

export const sortDiaries = (data) => {
 return client.post("diaries/sort", data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}
export const searchDiaries = (data) => {
 return client.post("diaries/search", data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}
