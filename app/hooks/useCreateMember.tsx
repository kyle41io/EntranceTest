// useCreateMember.ts
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

type NewMember = {
  memberName: string
  email: string
  password: string
  dateOfBirth: Date
  phone: string
  avatar: string
  status: string
}

export const useCreateMember = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (newMember: NewMember) =>
      axios.post('http://localhost:5000/api/members', {
        ...newMember,
        memberId: 0, // This will be ignored by the server and a new ID will be generated
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
