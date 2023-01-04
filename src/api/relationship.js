import Cookies from "js-cookie";
import { client } from "./client";

export const followUser = (user) => {
 return client.post("/relationships", user, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid")
  }
 });
}

export const unFollowUser = (id) => {
 return client.delete(`/relationships/${id}`, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   "client": Cookies.get("_client"),
   "uid": Cookies.get("_uid")
  }
 })
}
