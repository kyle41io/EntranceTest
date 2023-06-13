// useCreateMember.ts
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

type NewMember = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: Date
  avatar: string
  status: number
}


export function createMember(newMember: NewMember){
  return axios
      .post('https://localhost:5433/api/Accounts/AddMember', {
        ...newMember,
        signUpDate: Date.now(),
        testAmount: 0
      })
      .then (res => res.data)
}


export function getMembers() {
  return  axios
  .get("https://localhost:5433/api/Accounta/Addmembers")
  .then(res => res.data)
}
