// useCreateUser.ts
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

type NewUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: Date
  avatar: string
  status: number
}


export function createUser(newUser: NewUser){
  return axios
      .post('https://localhost:5433/api/Accounts/AddUser', {
        ...newUser,
        signUpDate: Date.now(),
        testAmount: 0
      })
      .then (res => res.data)
}


export function getUsers() {
  return axios
  .get("https://localhost:5433/api/Accounts")
  .then(res => res.data)
}

export function signIn(){
  return axios
  .post("https://localhost:5433/api/Accounts/SignIn")
}