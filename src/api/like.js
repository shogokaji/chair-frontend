import Cookies from "js-cookie";
import { client } from "./client";

//日記作成
export const like = (diaryId) => {
 return client.post(`/diaries/${diaryId}/likes`, {}, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
};

//削除
export const unLike = (diaryId) => {
 return client.delete(`diaries/${diaryId}/likes`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}
