import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
 ignoreHeaders: true,
}

export const client = applyCaseMiddleware(
 axios.create({
  baseURL: process.env.REACT_APP_API_DOMEIN
 }),
 options
);

client.interceptors.response.use(
 (response) => response,
 (error) => {
  alert("通信に問題が発生しました。")
 }
);
