import axios from "axios";
import { baseUrl, headers } from "../axiosConfig";

export interface IGetShops {
  data: IShop[];
  status: number;
}

export interface IShop {
  id: string;
  name: string;
  address: string;
}

export interface IAddShop {
  name: string;
  address: string;
  // department?: string;
}

interface IEditShop {
  shop_id?: string;
  name: string;
  address?: string;
}

// Метод для получения всех магазинов

export async function getShops(): Promise<IGetShops> {
  return axios
    .get(baseUrl + "url", { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getShops:", err.response);
      return err.response;
    });
}

// Метод для получения конкретного магазина

export async function getShop(shop_id: string): Promise<IGetShops> {
  return axios
    .get(baseUrl + `url/${shop_id}`, { headers })
    .then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> getShops:", err.response);
      return err.response;
    });
}

// Метод для добавления магазина

export async function addShop(requestShop: IAddShop): Promise<IShop> {
  return axios
    .post(baseUrl + "url", requestShop, { headers })
    .then((response) => {
      return {
        id: response.data.id,
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> addShop:", err.response);
      return err.response;
    });
}

// Метод для изменения магазина

export async function editShop(shopRequest: IEditShop): Promise<IGetShops> {
  const shop_id = shopRequest.shop_id;
  delete shopRequest.shop_id;

  return axios
    .put(baseUrl + `url/${shop_id}`, shopRequest, { headers })
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((err) => {
      console.log("Ошибка в методе ==> editShop:", err.response);
      return err.response;
    });
}
