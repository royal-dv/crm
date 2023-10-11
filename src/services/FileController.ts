import axios from "axios";
import { baseUrl5052, headers } from "../axiosConfig";

interface IUploadFile {
  id: string;
  status: number;
}

interface IFile {}

export async function uploadFile(file: IFile): Promise<IUploadFile> {
  return axios
    .post(baseUrl5052 + "url", file, { headers })
    .then((response) => {
      return {
        id: response.data.id,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> uploadFile:", err.response);
      return err.response;
    });
}
