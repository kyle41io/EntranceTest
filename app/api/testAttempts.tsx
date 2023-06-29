import axios from "axios";
import { randomUUID } from "crypto";

export function createTestAttempt({ attemptId, testId, testName, answer2, answer3, answer4, correctAnswer }: { attemptId: number; testId: number; testName: string; answer2: string; answer3: string; answer4 : string; correctAnswer: number}){
  return axios
    .post("https://localhost:5433/api/TestAttempts", {
      attemptId: randomUUID,
      testId,
      testName, 
      answer2,
      answer3,
      answer4,
      correctAnswer
    })
    .then (res => res.data)
}