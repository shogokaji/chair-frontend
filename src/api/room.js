import Cookies from "js-cookie";
import { client } from "./client";

export const indexMessages = () => {
 return client.get("/rooms", {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}

export const showMessage = (userId) => {
 return client.get(`/rooms/${userId}`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 });
}
