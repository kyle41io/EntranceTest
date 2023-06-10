export interface TestList {
  "testId": number,
  "testName": string,
  "questionAmount": number,
  "testTime": string,
  "testDesc": string
}
export type TestLists = Pick<TestList, 'testId'| 'testName'| 'testDesc' |'questionAmount' |'testTime'>[]