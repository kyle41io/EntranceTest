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

export const createMember = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (newMember: NewMember) =>
      axios.post('http://localhost:5433/api/Accounts/AddMember', {
        ...newMember,
        signUpDate: new Date(),
        testAmount: 0
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('members')
      }
    }
  )
}

export function getMembers() {
  return  axios
  .get("https://localhost:5433/api/TestLists")
  .then(res => res.data)
}
