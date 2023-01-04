import Cookies from "js-cookie";
import { client } from "./client";

//メッセージ取得
export const getMessage = (userId) => {
 return client.get(`/messages/${userId}`)
}

//メッセージ作成
export const createMessage = (data) => {
 return client.post("/messages", data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
};

// メッセージ削除
export const deleteMessage = (messageId) => {
 return client.delete(`/messages/${messageId}`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}
