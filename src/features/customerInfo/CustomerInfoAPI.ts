import { customerInfoApi } from "../../config";
import { getClient } from "../../services/http";

const httpClient = getClient(customerInfoApi);

// A mock function to mimic making an async request for data
export function fetchEmailDomains() {
  return httpClient.get('/emailDomains');
}

export function fetchCustomerInfo() {
  return httpClient.get('/customerInfo');
}

export function fetchCustomerInfoById(id: string) {
  return httpClient.get(`/customerInfo/${id}`);
}

export function updateCustomerInfo(id: string, data: any) {
  return httpClient.put(`/customerInfo/${id}`, data);
}

export function createCustomerInfo(data: any) {
  return httpClient.post('/customerInfo', data);
}

export function deleteCustomerInfo(id: string) {
  return httpClient.delete(`/customerInfo/${id}`);
}

