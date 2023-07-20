// useCreateUser.ts
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const accessToken = localStorage.getItem("accessToken");

type NewUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  dateOfBirth: Date
  avatar: string
  isAdmin: Boolean
  isActive: Boolean
}

export function createUser(newUser: NewUser){
  return axios
      .post('https://localhost:5433/api/Accounts/AddUser', {
        ...newUser,
        signUpDate: Date.now(),
        testAmount: 0
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then (res => res.data)
}

export function getUserByEmail(email: string) {
  return axios.get(`https://localhost:5433/api/Accounts/${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.data)
}

export function getUsers() {
  return axios
  .get("https://localhost:5433/api/Accounts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res => res.data)
}

export function signIn(){
  return axios
  .post("https://localhost:5433/api/Accounts/SignIn")
}