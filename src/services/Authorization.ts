import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";
import Cookies from "js-cookie";

export type AuthRequestType = {
  key?: string;
  login: string;
  password: string;
};

export type AuthResponseType = {
  access_token: string;
  refresh_token: string;
};

export async function login(loginRequest: AuthRequestType): Promise<AuthResponseType> {
  return axios
    .post(`${baseUrl}url/url`, loginRequest)
    .then((response) => {
      localStorage.clear();
      console.log(response, "RESPONSE");
      if (response.data?.access_token && response.data?.refresh_token) {
        return {
          access_token: response.data?.access_token,
          refresh_token: response.data?.refresh_token,
        };
      }
    })
    .catch((error: any) => {
      console.log("Ошибка в методе ==> login:", error.response);
      return error.response;
    });
}

export async function logout() {
  return axios
    .post(`${baseUrl}url/url`, {}, { headers })
    .then(() => {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
    })
    .catch((error: any) => {
      console.log("Ошибка в методе ==> logout:", error.response);
      return error.response;
    });
}
