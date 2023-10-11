import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";

interface IGetLicense {
  status: string;
}

async function getLicense(): Promise<IGetLicense> {
  return axios
    .get(baseUrl + "url", { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getLicense:", err.response);
      return err.response;
    });
}
