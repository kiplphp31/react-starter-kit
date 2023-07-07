import { questionnaireApi } from "../../config";
import { getClient } from "../../services/http";

const httpClient = getClient(questionnaireApi);


export function fetchQuestionnaires() {
  return httpClient.get('/questionnaires');
}

export function fetchQuestionnaireById(id: number) {
  return httpClient.get(`/questionnaire/${id}`);
}

export function updateQuestionnaire(id: number, data: any) {
  return httpClient.put(`/questionnaire/${id}`, data);
}

export function createQuestionnaire(data: any) {
  return httpClient.post('/questionnaire', data);
}

export function deleteQuestionnaire(id: number) {
  return httpClient.delete(`/questionnaire/${id}`);
}

