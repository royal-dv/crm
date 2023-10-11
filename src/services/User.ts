import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";
import Cookies from "js-cookie";

interface IResponseUserEdit {
  id?: string;
  name: string;
}

export interface IRequestStuff {
  shop_id?: string;
  department_id?: string;
  email?: string;
  phone?: string;
  name?: string;
  role?: string;
  login?: string;
}

export interface IRequestStuffEdit {
  userInfo: IRequestStuff;
  id: string;
}

export interface IUserData {
  department_id: string;
  id: string;
  login: string;
  email: string;
  phone: string;
  name: string;
}

export interface IResponseRecentUsers {
  status: string;
  data: {
    sessions: IRecentUsers[];
  };
}

export interface IRecentUsers {
  ended_at: string;
  user_email: string;
  user_name: string;
  user_phone: string;
}

export type IPasswordRequest = {
  old_password: string;
  new_password: string;
};

export interface IStuffUser {
  id: string;
  role: string;
  shop_id: string;
  department_id: string;
  login: string;
  email: string;
  phone: string;
  name: string;
}

export interface IGetAllStuffResponse {
  data: IStuffUser[];
  status: number;
}

export interface IGetStuffResponse {
  data: IStuffUser;
  status: number;
}

export interface IEditStuffResponse {
  data: IRequestStuff;
  status: number;
}

export interface ICreateStuffRequest {
  role: string;
  shop_id: string;
  department_id: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  name: string;
}

export interface ICreateStuffResponse {
  data: IRequestStuff;
  status: number;
}

export interface IUserRole {
  id: string;
  name: string;
}

export interface IGetUserRolesResponse {
  data: IUserRole[];
  status: number;
}

// Метод для получения всех доступных ролей

export async function getUserRoles(): Promise<IGetUserRolesResponse> {
  return axios.get(baseUrl + `url`, { headers }).catch((err) => {
    console.log("Ошибка при получении пользователя в методе ==> getUserRoles:", err.response);
    return err.response;
  });
}

// Метод для получения всех сотрудников

export async function getAllStuff(): Promise<IGetAllStuffResponse> {
  return axios.get(baseUrl + `url`, { headers }).catch((err) => {
    console.log("Ошибка при получении пользователя в методе ==> getAllStuff:", err.response);
    return err.response;
  });
}

// Метод для получения сотрудника по ID

export async function getStuffById(id: string): Promise<IGetStuffResponse> {
  return axios.get(baseUrl + `url/${id}`, { headers }).catch((err) => {
    console.log("Ошибка при получении пользователя в методе ==> getStuffById:", err.response);
    return err.response;
  });
}

// Метод для редактирования сотрудника

export async function editStuff({ id, userInfo }: IRequestStuffEdit): Promise<IEditStuffResponse> {
  return axios
    .put(`${baseUrl}url/${id}`, { ...userInfo }, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((error) => {
      console.log("Ошибка в методе ==> editStuff:", error.response);
      return error.response;
    });
}

// Метод для создания сотрудника

export async function createStuff(stuffData: ICreateStuffRequest): Promise<IEditStuffResponse> {
  return axios
    .post(`${baseUrl}url`, { ...stuffData }, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((error) => {
      console.log("Ошибка в методе ==> createStuff:", error.response);
      return error.response;
    });
}

// Метод для получения информации о текущем пользователе

export async function getCurrentUserInfo() {
  return axios
    .get(baseUrl + `url`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Ошибка при получении пользователя в методе ==> getCurrentUserInfo:", err.response);
      return err.response;
    });
}

// Метод для получения информация о недавних пользователях

export async function getRecentUsers(): Promise<IResponseRecentUsers> {
  return axios
    .get(baseUrl + "url", { headers })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении пользователя в методе ==> getRecentUsers:", err.response);
      return err.response;
    });
}

export async function getSelectedUserInfo(id: string): Promise<IUserData> {
  return axios
    .get(baseUrl + `url/${id}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Ошибка при получении пользователя в методе ==> getSelectedUserInfo:", err.response);
      return err.response;
    });
}

// Метод для изменения ФИО текущего пользователя

export async function updateCurrentUserInfo(userRequest: IResponseUserEdit) {
  const id = userRequest.id;
  delete userRequest.id;

  return axios
    .put(baseUrl + `url/${id}`, userRequest, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при изменении пользователя в методе ==> updateCurrentUserInfo:", err.response);
      return err.response;
    });
}

// Метод для смены пароля

export async function resetPassword(passwordRequest: IPasswordRequest) {
  return axios
    .put(`${baseUrl}url`, passwordRequest, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((error: any) => {
      console.log("Ошибка в методе ==> resetPassword:", error.response);
      return error.response;
    });
}
