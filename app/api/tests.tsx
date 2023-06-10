import { randomUUID } from "crypto";
import axios from "axios";

export function getTests() {
  return  axios
  .get("https://localhost:5433/api/TestLists")
  .then(res => res.data)
}

export function getTestById(testId: any) {
  return axios.get(`https://localhost:5433/api/TestLists/${testId}`).then(res => res.data)
}

export function createTest({ testName, testDesc }: { testName: string; testDesc: string;}){
  return axios
    .post("https://localhost:5433/api/TestLists", {
      testId: randomUUID,
      testName,
      questionAmount: 10,
      testTime: "00:00:10",
      testDesc
    })
    .then (res => res.data)
}
// export function updateTest(testId: any, updatedTest: any) {
//   return axios.put(`https://localhost:5433/api/TestLists/${testId}`).then(res => res.data);
// }

export function deleteTest(testId: any) {
  return axios.delete(`https://localhost:5433/api/TestLists/${testId}`).then(res => res.data);
}