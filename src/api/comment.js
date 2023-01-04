import Cookies from "js-cookie"
import { client } from "./client"

export const getComments = (diaryId) => {
 return client.get(`diaries/${diaryId}/comments`)
}

export const getCommentList = (id) => {
 return client.get(`comments/${id}`)
}

export const createComment = (diaryId, data) => {
 return client.post(`diaries/${diaryId}/comments`, data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}

export const editComment = (diaryId, commentId, data) => {
 return client.patch(`diaries/${diaryId}/comments/${commentId}`, data, {
  headers: {
   "access-token": Cookies.get("_access_token"),
   client: Cookies.get("_client"),
   uid: Cookies.get("_uid"),
  }
 })
}

export const deleteComment = (diaryId, commentId) => {
 return client.delete(`diaries/${diaryId}/comments/${commentId}`)
}
