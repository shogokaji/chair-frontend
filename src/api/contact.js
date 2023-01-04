import Cookies from "js-cookie"
import { client } from "./client"

export const createContact = (data) => {
 return client.post("contacts", data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}
