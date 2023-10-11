import axios from "axios";
import { baseUrl5050, headers } from "../axiosConfig";

interface IDealRequest {
  id?: string;
  title?: string;
  client_phone: string;
  client_email: string;
  client_fullname: string;
  room_type?: string;
  surface_area?: number | string;
  renovation_stage?: string;
  estate_name?: string;
  comment?: string;
}

export interface IGetAllDeals {
  status: number;
  data: {
    groups: IDealResponse[];
  };
}

export interface IDealResponse {
  status: string;
  deals: IDeal[];
}

export interface ISingleDealResponse {
  status: string;
  data: IDeal;
}

export interface IDeal {
  id: string;
  client_email: string;
  client_phone: string;
  comment: string;
  created_by: string;
  created_at: string;
  department_id: string;
  estate_name: string;
  client_fullname: string;
  renovation_stage: string;
  room_type: string;
  status: string;
  surface_area: number;
  title: string;
}

export interface IDealSearch {
  search?: string;
}

export interface IDealAddResponse {
  id: string;
  data: IDealResponse;
  status: number;
}

export interface IDealRequestById {
  id: string;
}

export interface IDealStatusResponse {
  id: string;
  name: string;
}

export interface IEditDealStatusRequest {
  dealId: string;
  status: string;
}

export interface IDealHistoryStatusResponse {
  created_at: string;
  created_by: string;
  status: string;
  timestamp: string;
}

export interface ICreateDraft {
  parent_deal_id: string;
  target_department_id: string;
  comment?: string;
}

export interface IGetAllDraftsDeals {
  data: IDraftsData[];
  status: number;
}

export interface IDraftsData {
  comment?: string;
  created_at: string;
  created_by: string;
  id: string;
  parent_deal_id: string;
  target_department_id: string;
}

export interface IGetDraftDealsCountResponse {
  data: {
    count: number;
  };
  status: number;
}

export async function addDeal(dealRequest: IDealRequest): Promise<IDealAddResponse> {
  return axios
    .post(baseUrl5050 + "url", dealRequest, { headers })
    .then((response) => {
      return {
        id: response.data?.id,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при записи объекта в методе ==> addDeal:", err.response);
      return err.response;
    });
}

// Метод для получения объекта из БД по ID
export async function getDeal({ id }: IDealRequestById): Promise<ISingleDealResponse> {
  return axios
    .get(baseUrl5050 + `url/${id}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getDeal:", err.response);
      return err.response;
    });
}

// Метод для получения всех объектов из БД

export async function getAllDeals(dealSearch: IDealSearch): Promise<IGetAllDeals> {
  return axios
    .get(baseUrl5050 + `url/url${dealSearch.search ? "?query=" + dealSearch.search : ""}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getAllDeals:", err.response);
      return err.response;
    });
}

// Метод для изменения объекта по ID

export async function editDeal(dealRequest: IDealRequest): Promise<IGetAllDeals> {
  if (!dealRequest.id) {
    throw new Error("Не передан ID объекта для изменений");
  }

  const id = dealRequest.id;

  // удалим из объекта поле id. Для корректонго запроса
  delete dealRequest.id;

  return axios
    .put(baseUrl5050 + `url/${id}`, dealRequest, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при изменении объекта в методе ==> editDeal:", err.response);
      return err.response;
    });
}

// Метод для изменения статуса сделки по ID

export async function editDealStatus({ dealId, status }: IEditDealStatusRequest): Promise<any> {
  /// any - потому что ответ пустой
  return axios
    .put(baseUrl5050 + `url/${dealId}/url`, { status }, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при изменении статуса сделки в методе ==> editDealStatus:", err.response);
      return err.response;
    });
}

// Метод для получения всех статусов для сделок из БД

export async function getDealStatuses(): Promise<IDealStatusResponse[]> {
  return axios
    .get(baseUrl5050 + "url/url", { headers })
    .then((response) => {
      return response.data?.items;
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов статусов в методе ==> getDealStatuses:", err.response);
      return err.response;
    });
}

// Метод для получения истории статусов сделок из БД

export async function getHistoryDealStatuses(deal_id: string): Promise<IDealHistoryStatusResponse[]> {
  return axios
    .get(baseUrl5050 + `url/${deal_id}/url/url`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов статусов в методе ==> getHistoryDealStatuses:", err.response);
      return err.response;
    });
}

// Метод для получения всех лидов / drafts из БД

export async function getAllDraftsDeals(): Promise<IGetAllDraftsDeals> {
  return axios
    .get(baseUrl5050 + `url`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getAllDratsDeals:", err.response);
      return err.response;
    });
}

// Метод для создания лида

export async function createDraftDeal(draftRequest: ICreateDraft): Promise<IGetAllDeals> {
  return axios
    .post(baseUrl5050 + `url`, draftRequest, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getAllDratsDeals:", err.response);
      return err.response;
    });
}

// Метод для переноса лида / draft в сделки

export async function acceptDraftDealRequest(draft_deal_id: string): Promise<IGetAllDeals> {
  return axios
    .post(baseUrl5050 + `url/url/${draft_deal_id}`, draft_deal_id, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getAllDratsDeals:", err.response);
      return err.response;
    });
}

// Метод для количества лидов

export async function getDraftDealsCount(): Promise<IGetDraftDealsCountResponse> {
  return axios
    .get(baseUrl5050 + "url/url", { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка при получении объекта/ов в методе ==> getProject:", err.response);
      return err.response;
    });
}