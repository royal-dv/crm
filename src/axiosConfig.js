import axios from "axios";
import Cookies from "js-cookie";

const isDev = true;

export const baseUrl = isDev ? "http://url" : "http://url2";
export const baseUrl5050 = isDev ? "http://url" : "http://url2";
export const baseUrl5052 = isDev ? "http://url" : "http://url2";
export const headers = {
  Authorization: "Bearer " + Cookies.get("access_token"),
};

const instance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: "Bearer " + Cookies.get("access_token") },
  withCredentials: true,
});

export default instance;
