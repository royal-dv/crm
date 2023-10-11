import axios from "axios";
import { IDealRequestById } from "./Deals";
import { baseUrl5050, headers } from "../axiosConfig";

interface IProjectRequest {
  id?: string;
  deal_id?: string;
  name: string;
}

interface IGetProjectResponse {
  data: {
    items: IProject[];
    count: number;
  };
  status: number;
}

interface IGetProjectByIdResponse {
  data: IProject;
  status: number;
}

export interface IProjectJson {
  pano: string;
  preview: string;
  meta: string;
}

interface IGetProjectJsonByIdResponse {
  data: {
    items: IProjectJson[];
  };
  status: number;
}

export interface IProject {
  deal_id: string;
  id: string;
  name: string;
}

export interface IAllProjectsByDeal {
  data: IProject[];
  status: string;
}

export interface IProjectPages {
  offset?: number;
  limit?: number;
  room_type_id?: string;
}

export interface ICreateProjectRequest {
  deal_id: string;
  project_name: string;
  room_type_id: string;
}

export interface ICreateProjectResponse {
  data: { deal_id: string; id: string; name: string };
  status: number;
}

// Метод для добавления объекта в БД

export async function addProject(projectRequest: IProjectRequest): Promise<IProject> {
  const id = projectRequest.id;
  // удалим из объекта поле id. Так как если в передаваемом объекте есть id
  // получим ошибку.
  delete projectRequest.id;

  return axios
    .post(baseUrl5050 + `url/${id}/url`, projectRequest, { headers })
    .then((response) => {
      return {
        id: response.data?.id,
        deal_id: response.data?.deal_id,
        name: response.data.name,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при записи объекта в методе ==> addProject:", err.response);
      return err.response;
    });
}

export async function createProject(createProjectRequest: ICreateProjectRequest): Promise<ICreateProjectResponse> {
  return axios
    .post(
      baseUrl5050 + `url/${createProjectRequest.deal_id}/url`,
      { name: createProjectRequest.project_name, room_type_id: createProjectRequest.room_type_id },
      { headers },
    )
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при создании проекта в методе ==> createProject:", err.response);
      return err.response;
    });
}

// Метод для получения объекта из БД по ID

export async function getProjectById(id: string): Promise<IGetProjectByIdResponse> {
  return axios
    .get(baseUrl5050 + `url/${id}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getProjectById:", err.response);
      return err.response;
    });
}

// Метод для получения JSON из YandexCloud по ID

export async function getProjectJsonById(id: string): Promise<IGetProjectJsonByIdResponse> {
  return axios
    .get(`url`)
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getProjectJsonById:", err.response);
      return err.response;
    });
}

// Метод для получения объекта из БД по ID

export async function getProjects(projectPages: IProjectPages): Promise<IGetProjectResponse> {
  const offset = "?offset=" + projectPages.offset;
  const limit = "&limit=" + projectPages.limit;
  const room_type_id = "&room_type_id=" + projectPages.room_type_id;
  return axios
    .get(baseUrl5050 + `url${offset + limit + room_type_id}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getProjects:", err.response);
      return err.response;
    });
}

// Метод для получения всех проектов по ID сделки

export async function getProjectsByDeal({ id }: IDealRequestById): Promise<IAllProjectsByDeal> {
  return axios
    .get(baseUrl5050 + `url/${id}/url`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при записи объекта в методе ==> getProjectsByDeal:", err.response);
      return err.response;
    });
}

// Метод для изменения объекта по ID

export async function editProject(projectRequest: IProjectRequest): Promise<IProject> {
  if (!projectRequest.id) {
    throw new Error("Не передан ID объекта для изменений");
  }

  const id = projectRequest.id;
  const deal_id = projectRequest.deal_id;

  // удалим из объекта поля id, deal_id. Для корректного запроса
  delete projectRequest.id;
  delete projectRequest.deal_id;

  return axios
    .put(baseUrl5050 + `url/${deal_id}/url/${id}`, projectRequest, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при изменении объекта в методе ==> editProject:", err.response);
      return err.response;
    });
}