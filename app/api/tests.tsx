import { randomUUID } from "crypto";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export function getTests() {
  return  axios
  .get("https://localhost:5433/Tests", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res => res.data)
}

export function getTestById(testId: any) {
  return axios.get(`https://localhost:5433/Tests/${testId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.data)
}

export function createTest({ testName, testDesc }: { testName: string; testDesc: string;}){
  return axios
    .post("https://localhost:5433/Tests", {
      testId: randomUUID,
      testName,
      testAmount: 0,
      testTime: 5, 
      testDesc
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then (res => res.data)
}

export function deleteTest(testId: any) {
  return axios.delete(`https://localhost:5433/Tests/${testId}`).then(res => res.data);
}