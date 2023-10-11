import axios from "axios";
import { baseUrl5050, headers } from "../axiosConfig";

/**
 * Данные метод отвечает за получение списка справочников из БД
 */

export interface ISource {
  id: string;
  value: string;
}

export interface IGetSource {
  status: number;
  data: ISource[];
}

export async function getSource(source_id: string): Promise<IGetSource> {
  return axios
    .get(baseUrl5050 + `url/${source_id}/value`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getSource:", err.response);
      return err.response;
    });
}
