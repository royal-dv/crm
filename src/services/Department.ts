import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";

export interface IAddDepartment {
  id?: string;
  shop_id: string;
  name: string;
}

export interface IDepartment {
  id: string;
  shop_id: string;
  name: string;
}

export interface IEditDepartment {
  id?: string;
  name: string;
}

export interface IGetDepartments {
  data: IDepartment[];
  status: number;
}

interface IAddDepartmentResponse {
  status: number;
}

// Метод для получения отдела магазина

export async function getDepartment(shop_id?: string): Promise<IGetDepartments> {
  return axios
    .get(baseUrl + `url${shop_id ? "?url=" + shop_id : ""}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getDepartment:", err.response);
      return err.response;
    });
}

// Метод для добавления отдела магазина

export async function addDepartment(requestDepartment: IAddDepartment): Promise<IAddDepartmentResponse> {
  return axios
    .post(baseUrl + "url", requestDepartment, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> addDepartment:", err.response);
      return err.response;
    });
}

// Метод для изменения отдела магазина

export async function editDepartment(requestDepartment: IEditDepartment): Promise<IAddDepartmentResponse> {
  if (!requestDepartment.id) {
    throw new Error("Не передан ID объекта для изменений");
  }

  const id = requestDepartment.id;

  // удалим из объекта поле id. Для корректного запроса
  delete requestDepartment.id;

  return axios
    .put(baseUrl + `url/${id}`, requestDepartment, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> editDepartment:", err.response);
      return err.response;
    });
}
