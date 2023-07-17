import { ICreateOrder } from "../models";
import serviceClient from "./serviceClient";

export const serviceAPI = {
  getRestaurant(): Promise<any> {
    return serviceClient.get(`/v1/restaurant`);
  },
  createOrder(data: ICreateOrder): Promise<any> {
    return serviceClient.post(`/v1/order`, data);
  },
  getOrderBykey(key = ""): Promise<any> {
    return serviceClient.get(`/v1/order/getByKey/${key}`);
  },
  deleteOrder(id: number, key = ""): Promise<any> {
    return serviceClient.delete(`/v1/order/${id}?key=${key}`);
  },
  updateOrder(id: number, key = "", data: ICreateOrder): Promise<any> {
    return serviceClient.put(`/v1/order/${id}?key=${key}`, data);
  },
};
