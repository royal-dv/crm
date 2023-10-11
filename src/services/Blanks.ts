import axios from "axios";
import { baseUrl5052, headers } from "../axiosConfig";

interface IBlank {
  file_id: string;
  start: string;
  end: string;
}

interface IBlanks {
  data: IBlank[];
  status: number;
}

export async function getBlanks(): Promise<IBlanks> {
  return axios
    .get(baseUrl5052 + "url", { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getBlanks:", err.response);
      return err.response;
    });
}

export async function addBlank(blank: IBlank): Promise<IBlanks> {
  return axios
    .post(baseUrl5052 + "url", blank, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> addBlank:", err.response);
      return err.response;
    });
}
