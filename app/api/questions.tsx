import axios from "axios";
import { randomUUID } from "crypto";

const accessToken = localStorage.getItem("accessToken");

export function getQuestions() {
  return  axios
  .get("https://localhost:5433/api/Questions", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res => res.data)
}
export function getQuestionsPaginated(page: number) {
  return axios
    .get("https://localhost:5433/api/Questions", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then(res => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"] as string)
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        questions: res.data,
      }
    })
}
// export const getQuestionsPage = async (pageParam = 1) => {
//   const response = await axios.get(`https://localhost:5433/api/Questions?page=${pageParam}`)
//   return response.data
// } 

export function deleteQuestion(questionId: any) {
  return axios.delete(`https://localhost:5433/api/Questions/${questionId}`).then(res => res.data);
}
export function createQuestion({ testId, content, answer1, answer2, answer3, answer4, correctAnswer }: { testId: number; content: string; answer1: string; answer2: string; answer3: string; answer4 : string; correctAnswer: number}){
  return axios
    .post("https://localhost:5433/api/Questions", {
      questionId: randomUUID,
      testId,
      content,
      answer1, 
      answer2,
      answer3,
      answer4,
      correctAnswer
    })
    .then (res => res.data)
}