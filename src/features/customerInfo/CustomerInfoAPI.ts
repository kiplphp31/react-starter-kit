import { customerInfoApi } from "../../config";
import { getClient } from "../../services/http";

const httpClient = getClient(customerInfoApi);

export function fetchCustomerInfo() {
  return httpClient.get('/customerInfo');
}

export function fetchCustomerInfoById(id: number) {
  return httpClient.get(`/customerInfo/${id}`);
}

export function updateCustomerInfo(id: number, data: any) {
  return httpClient.put(`/customerInfo/${id}`, data);
}

export function createCustomerInfo(data: any) {
  return httpClient.post('/customerInfo', data);
}

export function deleteCustomerInfo(id: number) {
  return httpClient.delete(`/customerInfo/${id}`);
}

