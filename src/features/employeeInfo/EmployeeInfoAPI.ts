import { employeeInfoApi } from "../../config";
import { getClient } from "../../services/http";

const httpClient = getClient(employeeInfoApi);

// A mock function to mimic making an async request for data
export function fetchEmailDomains() {
  return httpClient.get('/emailDomains');
}

export function fetchEmployeeInfo() {
  return httpClient.get('/employeeInfo');
}

export function fetchEmployeeInfoById(id: number) {
  return httpClient.get(`/employeeInfo/${id}`);
}

export function updateEmployeeInfo(id: number, data: any) {
  return httpClient.put(`/employeeInfo/${id}`, data);
}

export function createEmployeeInfo(data: any) {
  return httpClient.post('/employeeInfo', data);
}

export function deleteEmployeeInfo(id: string) {
  return httpClient.delete(`/employeeInfo/${id}`);
}

