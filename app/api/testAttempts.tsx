import axios from "axios";
import { randomUUID } from "crypto";

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
    })
    .then (res => res.data)
}

export function getTestAttempts() {
  return  axios
  .get("https://localhost:5433/api/TestAttempts")
  .then(res => res.data)
}