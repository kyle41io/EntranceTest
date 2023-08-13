import axios from "axios";
import { randomUUID } from "crypto";

const accessToken = localStorage.getItem("accessToken");


export function createTestAttempt({ testId, testName, email, testAmount, amountCorrect, accurate }: { testId: string; testName:string ; email: string; testAmount: number; amountCorrect : number; accurate: number}){
  return axios
    .post("https://localhost:5433/api/TestAttempts", {
      attemptId: randomUUID,
      testId,
      testName,
      email, 
      timeStart: new Date(),
      testAmount,
      amountCorrect,
      accurate,
      isFinish: true,
      applicationUser: null
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then (res => res.data)
}

export function getTestAttempts() {
  return  axios
  .get("https://localhost:5433/api/TestAttempts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res => res.data)
}

export function getTestAttemptsByEmail(email: string) {
  return axios.get(`https://localhost:5433/api/TestAttempts/email/${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.data)
}

export function getTestAttemptsByTestId(testId: number) {
  return axios.get(`https://localhost:5433/api/TestAttempts/test/${testId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.data)
}