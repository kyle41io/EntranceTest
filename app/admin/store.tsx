// store.ts
import create from 'zustand'

type State = {
  member: {
    memberId: string,
    memberName: string,
    email: string,
    password: string,
    dateOfBirth: string,
    phone: string,
    avatar: string,
    status: string
  },
  setMember: (member: Partial<State['member']>) => void
}

export const useStore = create<State>(set => ({
  member: {
    memberId: '',
    memberName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    avatar: '',
    status: ''
  },
  setMember: (member: Partial<State['member']>) => set(state => ({ member: { ...state.member, ...member } }))

}))
