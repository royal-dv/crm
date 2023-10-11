import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";

export interface IGetOrganization {
  status: number;
  data: {
    id: string;
    name: string;
  };
}

export async function getOrganization(): Promise<IGetOrganization> {
  return axios
    .get(baseUrl + "url", { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getOrganizations:", err.response);
      return err.response;
    });
}
